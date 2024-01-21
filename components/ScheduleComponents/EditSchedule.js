import {Modal, View, Text, StyleSheet, Pressable, ScrollView} from 'react-native'
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
import { updateTracker, updateRoster, getCafeDatesGroupedBySkill} from '../../httpServices/cafes'
import { getDealByMongoId, getDealGroup, insertContactToDeal, deleteContactFromDeal } from '../../httpServices/HBDeals'
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
    const [filteredDealArray, setFilteredDealArray] = useState([])
    const {hubspotDetails, updateToDealId, updateFromDealId, toDealId, fromDealId,} = useContext(HubspotContext)
    const {cafeTracker, shallowTracker, scheduleCafes, editScheduleVariables} = cafeDetails
    const {employeeId} = credentials
    const seasonId = season._id

    const{
        targetSkill, 
        monthName, 
        monthNumber, 
        year, 
        currentCafeOfferedSet,
        groupTargetId
    } = editScheduleVariables


    // const{contactId} = hubspotDetails

    function compareDayNumber(a, b){
        return parseInt(new Date(a.date).toString().slice(8,10)) -parseInt(new Date(b.date).toString().slice(8,10)) 
    }

    useEffect(()=>{
        async function checkCafeCapacity(groupTargetId){
                let groupedList
                try{
                    const response = await getCafeDatesGroupedBySkill(groupTargetId)
                    if(response){
                        groupedList = response

                        for(let i = 0; i < groupedList.length; i++){
                            const cafeDate = groupedList[i]
                            // console.log('current cafe date')
                            // console.log(cafeDate)
                            // console.log('')
                            const classLimit = cafeDate.classLimit
                            // console.log('class limit: ')
                            // console.log(classLimit)
                            // console.log('')
                            let roster
                            let rosterCount
                            // console.log('cafe date roster:')
                            // console.log(cafeDate.roster)
                            // console.log('')
                            if(cafeDate.roster !== undefined){
                                // console.log('the roster is NOT undefined')
                                roster = cafeDate.roster
                                rosterCount = roster.length
        
                                if(rosterCount < classLimit){
        
                                    setFilteredDealArray(prev => {
                                        const newArray = [...prev, groupedList[i]]
                                        newArray.sort(compareDayNumber)
            
                                        return newArray
                                    })
                                }
                            } else {
                                // console.log('the roster is undefined')
                                setFilteredDealArray(prev => {
                                    const newArray = [...prev, groupedList[i]]
                                    newArray.sort(compareDayNumber)
        
                                    return newArray
                                })
                            }
                        }
        
                    }
                }catch(e){
                    alert(e)
                } 
            
        }

        checkCafeCapacity(groupTargetId)
        
        return ()=>{}
        
        
    },[currentCafeOfferedSet])

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

    // console.log('')
    // console.log("EDIT SCHEDULE solid snapshot: ")
    // console.log(solidSnapshot)
    // console.log('')

    // console.log('')
    // console.log("EDIT SCHEDULE shallow snapshot: ")
    // console.log(shallowSnapshot)
    // console.log('')

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

            const [rosterAddReply, error1] = await simplePromise(updateRoster, {employeeId: employeeId, cafeDateId: solidSnapshot.id, type:'add'})
            if(rosterAddReply){
                console.log('subsequent roster add reply: ')
                console.log(rosterAddReply)
                const [rosterRemoveReply, error2] = await simplePromise(updateRoster, {employeeId: employeeId, cafeDateId: shallowSnapshot.id, type:'remove'})
                if(rosterRemoveReply){
                    console.log('subsequent roster remove reply: ')
                    console.log(rosterRemoveReply)
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
                    } if(error2){
                        alert(error2)
                        return
                    }
                } if(error1){
                    alert(error1)
                    return
                }
            
                       
            
        } 
        else{
            setIsLoading(true)

            const [rosterAddReply, error1] = await simplePromise(updateRoster, {employeeId: employeeId, cafeDateId: solidSnapshot.id, type:'add'})
            if(rosterAddReply){
                console.log('first time roster add reply: ')
                console.log(rosterAddReply)
                const [trackerReply, error2] = await simplePromise(updateTracker, {list: cafeTracker.list, employeeId: employeeId, seasonId: seasonId})
                    if(trackerReply){
                        setFilteredDealArray([])
                        updateShallowTrackerAll(cafeTracker)
                        setSolidSnapshot({})    
                        setShallowSnapshot({})
                        setIsLoading(false)
                        closeModalHandler()
                    } 
                    if(error2){
                        alert(error2)
                        return
                    }
                } if(error1){
                    alert(error1)
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
                                <View style={styles.topTitleContainer}>
                                    <Text style={styles.topTitle}>{targetSkill}</Text>
                                    {/* {
                                        separatedTitle.map(title =>{
                                            return(
                                                <Text style={styles.topTitle} key={separatedTitle[separatedTitle.indexOf(title)]}>{title}</Text>
                                            )
                                        })
                                    }    */}
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
                            <ScrollView style={styles.scheduleBody}>
                                <View style={styles.scheduleBodyInnerContainer}>
                                {
                                    filteredDealArray.length < 1? <Loader size='large' color={Colors.accentColor} /> : 

                                    filteredDealArray.map(entry =>{
                                        const originalDate = new Date(entry.date) 
                                        const fullMonth = originalDate.toLocaleString('default', {month: 'long'})
                                        const numericDay = originalDate.toLocaleString('default', {day: 'numeric'})
                                        const headlineDate = `${fullMonth}, ${numericDay}`
                                        const time = entry.time



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
                                
                                
                            </ScrollView>
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
    topTitleContainer:{
        flexShrink: 1,
        flex: 0.9,
    },
    topTitle:{
        color: 'white',
        fontSize: DeviceFractions.deviceHeight / 45,
        fontWeight: 'bold',
        flexWrap: 'wrap'
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
        padding: DeviceFractions.deviceW20,
    },
    scheduleBodyInnerContainer:{
        flex: 1,
        justifyContent: 'center',
        marginBottom: DeviceFractions.deviceH30
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