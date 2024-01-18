import {Modal, View, Text, StyleSheet, Pressable} from 'react-native'
import Colors from '../../utils/colors'
import Title from '../../UI/Title'
import DeviceFractions from '../../utils/dimensions'
import { wordSplitter } from '../../utils/helperFunctions'
import ScheduleEntry from './ScheduleEntry'
import Loader from '../../UI/Loader'
import ModularLink from '../ModularLink'
import ModularButton from '../ModularButton'
import { useState, useEffect, useContext } from 'react'
import { CafeContext } from '../../store/cafe-context'
import { SeasonContext } from '../../store/season-context'
import { updateTracker } from '../../httpServices/cafes'
import { getDealByMongoId, insertContactToDeal, deleteContactFromDeal } from '../../httpServices/HBDeals'
import { HubspotContext } from '../../store/hubspot-context'
import ClickBox from '../ClickBox'
import { SignInContext } from '../../store/signin-context'
import _, { filter } from 'lodash'


const EditSchedule = ({visible, closeModalHandler}) =>{
    const separatedSaveTitle = wordSplitter("Save Changes?")
    const [isDifferent, setIsDifferent]=useState(false)
    const {
        cafeDetails, 
        updateCafeTracker, 
        updateCafeTrackerAll, 
        updateShallowTrackerAll,
        updateEditScheduleVariables
    } = useContext(CafeContext)
    const {season} = useContext(SeasonContext)
    const {credentials} = useContext(SignInContext)
    const [solidSnapshot, setSolidSnapshot] = useState({})
    const [shallowSnapshot, setShallowSnapshot] = useState({})
    const [submitOption, setSubmitOption] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [filterDealArray, setFilteredDealArray] = useState([])
    const {hubspotDetails, updateToDealId, updateFromDealId, toDealId, fromDealId,} = useContext(HubspotContext)
    const {cafeTracker, shallowTracker, scheduleCafes, editScheduleVariables} = cafeDetails
    const {employeeId} = credentials
    const seasonId = season._id

    const{targetSkill, monthName, monthNumber, year, currentCafeOfferedSet} = editScheduleVariables

    const separatedTitle = wordSplitter(targetSkill) 

    const{contactId} = hubspotDetails

    function compareDayNumber(a, b){
        return parseInt(new Date(a.date).toString().slice(8,10)) -parseInt(new Date(b.date).toString().slice(8,10)) 
    }
    
    useEffect(()=>{


        async function checkHBDealCapacity(array){

                array.forEach(async(entry) =>{

                    try{
                        const deal = await getDealByMongoId(entry._id)
                        if(deal){
                            
                            const contactCount = deal.results[0].properties.num_associated_contacts
                            if(contactCount < entry.classLimit){
                                setFilteredDealArray(prev => {
                                    const newArray = [...prev, entry]
                                    newArray.sort(compareDayNumber)
                                    return newArray
                                })
                            }
                        }
                    } catch(e){
                        alert(e)
                    }
                })
            
        }

        if(currentCafeOfferedSet !== undefined && currentCafeOfferedSet.length > 0){
            checkHBDealCapacity(currentCafeOfferedSet)
        }

    }, [currentCafeOfferedSet])


    useEffect(()=>{
        setSolidSnapshot(
            cafeTracker.list.find(entry => {
                return entry["monthNumber"] === monthNumber
            })
        )

        setShallowSnapshot(
            shallowTracker.list.find(entry => {
                return entry["monthNumber"] === monthNumber
            })
        )

        return ()=>{}
    },[cafeTracker, shallowTracker])

    useEffect(()=>{
    
        if(!_.isEqual(solidSnapshot, shallowSnapshot)){
                setIsDifferent(true)
            } else{
                setIsDifferent(false)
            }
        
    },[solidSnapshot, shallowSnapshot])

    function toggleYesHandler(){
        setSubmitOption(true)
    }

    function toggleNoHandler(){
        setSubmitOption(false)
    }

    console.log('')
    console.log("EDIT SCHEDULE solid snapshot: ")
    console.log(solidSnapshot)
    console.log('')

    console.log('')
    console.log("EDIT SCHEDULE shallow snapshot: ")
    console.log(shallowSnapshot)
    console.log('')

    // console.log('toDealId: ')
    // console.log(toDealId)
    // console.log('fromDealId: ')
    // console.log(fromDealId)


    async function simplePromise(promise, arg1, arg2){
        try{
            const data = await promise(arg1, arg2)
            return [data, null]
        } catch(e){
            return [null, e]
        }
    }


    async function submitYesHandler(){
        if(shallowSnapshot !== undefined){
            setIsLoading(true)

            //you might want to stagger the ifs (example: if(newDeal){const [oldDeal, error2] = await simplePromise...etc.})
            //it works without, but maybe this format would make the HubspotConext methods and state variales work 
            //such as updateToDealId actually updating toDealId fast enought that it can be used in the 
            //next simplePromise etc.

            const [newDeal, error1] = await simplePromise(getDealByMongoId, solidSnapshot.id)
            if(newDeal){
                console.log('')
                console.log('new deal reply: ')
                console.log(newDeal)
                console.log('')
                const [oldDeal, error2] = await simplePromise(getDealByMongoId, shallowSnapshot.id)
                if(oldDeal){
                    console.log('')
                    console.log('old deal reply (standard): ')
                    console.log(oldDeal)
                    console.log('')
                    const [insertReply, error3] = await simplePromise(insertContactToDeal, newDeal.results[0].id, contactId)
                    // if(insertReply.associations === undefined){
                    //     alert('Unable to complete date exchange, please try again later')
                    //     setIsLoading(false)
                    //     return
                    // } 
                    if(insertReply){
                        console.log('')
                        console.log('insert deal reply (standard): ')
                        console.log(insertReply)
                        console.log('')

                        const [deleteReply, error4] = await simplePromise(deleteContactFromDeal, oldDeal.results[0].id, contactId)
                        // if(deleteReply.status !== 204){
                        //     alert('Unable to complete date exchange, please try again later')
                        //     setIsLoading(false)
                        //     return
                        // }
                        if(deleteReply){
                            console.log('')
        
                            console.log('insert delete reply: ')
                            console.log(deleteReply)
                            console.log('')
                            const [trackerReply, error5] = await simplePromise(updateTracker, {list: cafeTracker.list, employeeId: employeeId, seasonId: seasonId})
                            if(trackerReply){
                                setFilteredDealArray([])
                                updateShallowTrackerAll(cafeTracker)
                                setSolidSnapshot({})    
                                setShallowSnapshot({})
                                setIsLoading(false)
                                closeModalHandler()
                            } 
                            if(error5){
                                alert(error5)
                                return
                            }
                        }  
                        if(error4){
                            alert(error4)
                            setIsLoading(false)
                            return
                        }
                    } 
                    if(error3){
                        alert(error3)
                        setIsLoading(false)
                        return
                    }
                } 
                if(error2){
                    alert(error2)
                    setIsLoading(false)
                    return
                }
            }  
            
            if(error1){
                alert(e)
                setIsLoading(false)
                return
            }


                
            
            
          


                
            

            
        } 
        else{
            setIsLoading(true)

            //you might want to stagger the ifs (example: if(newDeal){const [oldDeal, error2] = await simplePromise...etc.})
            //it works without, but maybe this format would make the HubspotConext methods and state variales work 
            //such as updateToDealId actually updating toDealId fast enought that it can be used in the 
            //next simplePromise etc.

            const [newDeal, error1] = await simplePromise(getDealByMongoId, solidSnapshot.id)
            if(newDeal){
                console.log('')
                console.log('new deal reply: ')
                console.log(newDeal)
                console.log('')
                const [insertReply, error2] = await simplePromise(insertContactToDeal, newDeal.results[0].id, contactId)
                // if(insertReply.associations === undefined){
                //     alert('Unable to complete date exchange, please try again later')
                //     setIsLoading(false)
                //     return
                // } 
                if(insertReply){
                    console.log('')

                    console.log('insert deal reply: ')
                    console.log(insertReply)
                    console.log('')
                    const [trackerReply, error3] = await simplePromise(updateTracker, {list: cafeTracker.list, employeeId: employeeId, seasonId: seasonId})
                    if(trackerReply){
                        setFilteredDealArray([])
                        updateShallowTrackerAll(cafeTracker)
                        setSolidSnapshot({})    
                        setShallowSnapshot({})
                        setIsLoading(false)
                        closeModalHandler()
                    } 
                    if(error3){
                        alert(error3)
                        return
                    }
                } 
                if(error2){
                    alert(error2)
                    setIsLoading(false)
                    return
                }

            }  
            
            if(error1){
                alert(e)
                setIsLoading(false)
                return
            }


            


            
        }
 
       
            
    }

    function submitNoHandler(){
            updateCafeTrackerAll(shallowTracker)
            setSolidSnapshot({})
            setShallowSnapshot({})
            closeModalHandler()
    }

    function standardClose(){
        setFilteredDealArray([])
        setSolidSnapshot({})
        setShallowSnapshot({})
        closeModalHandler()
    }

    function submitHandler(){
        submitOption? submitYesHandler() : submitNoHandler()
    }
    
    let footerContent = 
    <ModularLink 
        textColor={Colors.highlightColor} 
        textSize={DeviceFractions.deviceH50} 
        textStyles={{textAlign: 'center'}}
        onPress={standardClose}
    >
        Close
    </ModularLink>

    if(isDifferent){
        footerContent = <View style={styles.footerSaveOptions}>
        <View>
            {
                separatedSaveTitle.map(word =>{
                    return <Title key={separatedSaveTitle[separatedSaveTitle.indexOf(word)]}  textSize={DeviceFractions.deviceHeight / 35} color={Colors.highlightColor}>{word}</Title>
                })
            }
        </View>
        <View style={styles.submitContainer}>
            <Pressable onPress={toggleYesHandler} style={styles.submitOption}>
                <Text style={styles.submitText}>Yes</Text>
                <ClickBox height={15} width={15} borderRadius={3} toggle={submitOption} toggleColor={Colors.secondaryColor300} />
            </Pressable>
            <Pressable onPress={toggleNoHandler} style={styles.submitOption}>
                <Text style={styles.submitText}>No</Text>
                <ClickBox height={15} width={15} borderRadius={3} toggle={!submitOption} toggleColor={Colors.secondaryColor300} />
            </Pressable>
            <ModularButton 
                style={{
                    width: '75%', 
                    height: DeviceFractions.deviceH40,
                    borderRadius: 4,
                    shadowColor: 'black',
                    shadowOpacity: 0.25,
                    shadowOffset: {width: 0, height: 2},
                    shadowRadius: 8,
                    elevation: 4
                 }} 
                buttonColor={Colors.secondaryColor300} 
                textSize={DeviceFractions.deviceW30} 
                textStyles={{fontWeight: 'bold'}} 
                textColor={Colors.highlightColor}
                onPress={submitHandler}
            >
                Submit
            </ModularButton>
        </View>
    </View>
    }

    
    return(
        <Modal visible={visible} animationType='slide' style={styles.modal}>
        <View style={styles.modalInnerContainer}>
        <View style={styles.selectADate}>
            <Title color={Colors.secondaryColor} textSize={27} style={{marginRight: DeviceFractions.deviceW50}} >Select A Date</Title>
        </View>
                        <View style={styles.scheduleContainer}>
                            <View style={styles.scheduleHeader}>
                                <View>
                                    {
                                        separatedTitle.map(title =>{
                                            return(
                                                <Text style={styles.topTitle} key={separatedTitle[separatedTitle.indexOf(title)]}>{title}</Text>
                                            )
                                        })
                                    }   
                                </View>
                                <View>
                                    {/* {
                                        separatedDate.map(datePair =>{
                                            return(
                                                <Text style={styles.topDate} key={separatedDate[separatedDate.indexOf(datePair)]}>{datePair}</Text>
                                            )
                                        })
                                    }    */}
                                    <Text style={styles.topDate}>{monthName}</Text>
                                    <Text style={styles.topDate}>{year}</Text>
                                </View>    
                            </View>
                            <View style={styles.scheduleBody}>
                                {
                                    filterDealArray.length < 1? <Loader size='large' color={Colors.accentColor} /> : 

                                    filterDealArray.map(entry =>{
                                        const originalDate = new Date(entry.date) 
                                        const fullMonth = originalDate.toLocaleString('default', {month: 'long'})
                                        const numericDay = originalDate.toLocaleString('default', {day: 'numeric'})
                                        const headlineDate = `${fullMonth}, ${numericDay}`
                                        const timeDate = originalDate.toLocaleString()
                                        const time = timeDate.slice(timeDate.length - 11, timeDate.length)



                                        return(
                                            <ScheduleEntry 
                                                key={entry._id} 
                                                id={entry._id} 
                                                monthNumber={currentCafeOfferedSet[0].monthNumber} 
                                                monthName={entry.monthName} 
                                                date={headlineDate} 
                                                time={time}
                                                cafeTracker={cafeTracker}
                                                onPress={updateCafeTracker}
                                                />
                                        )
                                    } 
                                    )
                                }
                                
                            </View>
                            <View style={styles.scheduleFooter}>
                                
                                    {
                                        isLoading? 

                                            <Loader size="large" color={Colors.highlightColor}/>
                                        
                                        :

                                        footerContent
                                        
                                    }
                            </View>
                        </View>
                </View>
            </Modal>
    )
}


const styles = StyleSheet.create({
    scheduleContainer:{
        height: DeviceFractions.deviceHeight / 1.8,
        width: DeviceFractions.deviceWidth / 10 * 8.5,
    },
    scheduleHeader:{
        // height: '20%',
        height: '18%',
        backgroundColor: Colors.secondaryColor,
        paddingHorizontal: DeviceFractions.deviceW20,
        paddingVertical: DeviceFractions.deviceHeight / 85,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topTitle:{
        color: 'white',
        fontSize: DeviceFractions.deviceHeight / 54,
        fontWeight: 'bold'
    },
    
    topDate:{
        fontSize: DeviceFractions.deviceHeight / 50,
        color: 'white',
        textAlign: 'right'
    },
    selectADate:{
        marginBottom: DeviceFractions.deviceH50,
        width: DeviceFractions.deviceWidth,
        padding: DeviceFractions.deviceWidth / 15,
        alignItems: 'flex-end'

    },
    scheduleBody:{
        // height: '60%',
        height: '65%',
        backgroundColor: Colors.highlightColor,
        padding: DeviceFractions.deviceW30,
        justifyContent: 'center'
    },
    scheduleFooter:{
        height: '28%',
        backgroundColor: Colors.accentColor400,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerSaveOptions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        width: '75%'
    },
    submitContainer:{
        backgroundColor: Colors.highlightColor,
        borderRadius: 10,
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: DeviceFractions.deviceHeight / 100
    },
    submitOption:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '50%',
        marginBottom: DeviceFractions.deviceHeight / 200
    },
    submitText:{
        color: Colors.secondaryColor
    },
    clickBox:{
        backgroundColor: Colors.unselectedColor,
        height: 15,
        width: 15,
        borderRadius: 3
    },
    modal:{
        flex:1
    },
    modalInnerContainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.primaryColor100,
        paddingTop: DeviceFractions.deviceH20,
    }
    
})

export default EditSchedule