import {Modal, View, Text, useWindowDimensions, Pressable, ScrollView} from 'react-native'
import Colors from '../../utils/colors'
import Title from '../../UI/Title'
import {converterSetup, useStyles} from '../../utils/dimensions'
import { wordSplitter } from '../../utils/helperFunctions'
import ScheduleEntry from './ScheduleEntry'
import Loader from '../../UI/Loader'
import ModularLink from '../ModularLink'
import ModularButton from '../ModularButton'
import { useState, useEffect, useContext } from 'react'
import { CafeContext } from '../../store/cafe-context'
import { SeasonContext } from '../../store/season-context'
import { updateTracker, updateRoster, getCafeDatesGroupedBySkill} from '../../httpServices/cafes'
import {sendZoomEmail} from '../../httpServices/email'
// import { getDealByMongoId, getDealGroup, insertContactToDeal, deleteContactFromDeal } from '../../httpServices/HBDeals'
import { HubspotContext } from '../../store/hubspot-context'
import ClickBox from '../ClickBox'
import { SignInContext } from '../../store/signin-context'
import _, { filter, first } from 'lodash'
import {Ionicons} from '@expo/vector-icons'


const EditSchedule = ({visible, closeModalHandler}) =>{
    const separatedSaveTitle = wordSplitter("Save Changes?")
    const [isDifferent, setIsDifferent]=useState(false)
    const {
        cafeDetails, 
        updateCafeTracker, 
        updateCafeTrackerAll, 
        updateShallowTrackerAll,
        // updateEditScheduleVariables
    } = useContext(CafeContext)
    const {season} = useContext(SeasonContext)
    const {credentials} = useContext(SignInContext)
    const [solidSnapshot, setSolidSnapshot] = useState({})
    const [shallowSnapshot, setShallowSnapshot] = useState({})
    const [submitOption, setSubmitOption] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredDateArray, setFilteredDateArray] = useState([])
    // const {hubspotDetails, updateToDealId, updateFromDealId, toDealId, fromDealId,} = useContext(HubspotContext)
    const {cafeTracker, shallowTracker, scheduleCafes, editScheduleVariables} = cafeDetails
    const {employeeId, email, firstName} = credentials
    const seasonId = season._id

    const{
        targetSkill, 
        monthName, 
        monthNumber, 
        year, 
        currentCafeOfferedSet,
        groupTargetId,
        clinicMonthName
    } = editScheduleVariables

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        modalInnerContainer:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.primaryColor100
        },
        scheduleContainer:{
            width: width / 10 * 8.5
        },
        scheduleHeader:{
            height: converter(height/8, height/8, height/8),
            backgroundColor: Colors.secondaryColor,
            paddingHorizontal: width/20,
            paddingVertical: height / 85,
            borderTopLeftRadius: converter(14, 18, 25),
            borderTopRightRadius: converter(14, 18, 25),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        topTitleContainer:{
            flexShrink: 1,
            flex: 0.9,
        },
        topTitle:{
            color: Colors.highlightColor,
            fontSize: converter(height / 45, height / 45, height / 35),
            fontWeight: 'bold',
            flexWrap: 'wrap'
        },
        topDate:{
            fontSize: height / 50,
            color: Colors.highlightColor,
            textAlign: 'right'
        },
        selectADate:{
            width: width,
            padding: width / 15,
            alignItems: 'flex-end'
    
        },
        scheduleBody:{
            height: converter(height /2.5, height /3,height /3),
            backgroundColor: Colors.highlightColor,
            padding: width/20
        },
        scheduleBodyInnerContainer:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: height/30
        },
        scheduleFooter:{
            height: converter(height/6, height/6, height/6),
            backgroundColor: Colors.accentColor400,
            borderBottomLeftRadius: converter(14, 18, 25),
            borderBottomRightRadius: converter(14, 18, 25),
            justifyContent: 'center',
            alignItems: 'center'
        },
        footerSaveOptions:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '75%',
        },
        submitContainer:{
            backgroundColor: Colors.highlightColor,
            borderRadius: converter(10, 15, 20),
            flex: 0.6,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: height/75
        },
        submitButton:{
            width: '75%',
            height: converter(height/35, height/40, height/35), 
            borderRadius: converter(5, 5, 10),
            shadowColor: 'black',
            shadowOpacity: 0.25,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 8,
            elevation: 4
        },
        // submitOption:{
        //     flexDirection: 'row',
        //     justifyContent: 'space-between',
        //     alignItems: 'center',
        //     width: converter('40%', '40%', '40%'),
        //     marginBottom: height / 100
        // },
        submitText:{
            color: Colors.secondaryColor,
            fontSize: converter(width/40, width/ 40, width/35)
        },
        modal:{
            flex:1
        }
        
    }
 
    const styles = useStyles(localStyles)


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
      
                            const classLimit = cafeDate.classLimit

                            let roster
                            let rosterCount

                            if(cafeDate.roster !== undefined){
                                roster = cafeDate.roster
                                rosterCount = roster.length
        
                                if(rosterCount < classLimit){
        
                                    setFilteredDateArray(prev => {
                                        const newArray = [...prev, groupedList[i]]
                                        newArray.sort(compareDayNumber)
            
                                        return newArray
                                    })
                                }
                            } else {
                                setFilteredDateArray(prev => {
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
     
                const [rosterRemoveReply, error2] = await simplePromise(updateRoster, {employeeId: employeeId, cafeDateId: shallowSnapshot.id, type:'remove'})
                if(rosterRemoveReply){

                    const [trackerReply, error3] = await simplePromise(updateTracker, {list: cafeTracker.list, employeeId: employeeId, seasonId: seasonId})
                        if(trackerReply){

                            const [emailReply, error4] = await simplePromise(sendZoomEmail, {
                                email: email, 
                                firstName: firstName, 
                                cafeTitle: targetSkill,
                                date: solidSnapshot.date,
                                time: solidSnapshot.time,
                                zoomLink: solidSnapshot.zoomLink,
                                clinicLink: solidSnapshot.clinicLink,
                                clinicMonthName: clinicMonthName
                            })
                            if(emailReply){
                                setFilteredDateArray([])
                                updateShallowTrackerAll(cafeTracker)
                                setSolidSnapshot({})    
                                setShallowSnapshot({})
                                setIsLoading(false)
                                closeModalHandler()
                            }
                            if(error4){
                                alert(error4)
                                return
                            }
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

                const [trackerReply, error2] = await simplePromise(updateTracker, {list: cafeTracker.list, employeeId: employeeId, seasonId: seasonId})
                    if(trackerReply){

                        const [zoomEmailReply, error4] = await simplePromise(sendZoomEmail, { 
                            email: email, 
                            firstName: firstName, 
                            cafeTitle: targetSkill,
                            date: solidSnapshot.date,
                            time: solidSnapshot.time,
                            zoomLink: solidSnapshot.zoomLink,
                            clinicLink: solidSnapshot.clinicLink,
                            clinicMonthName: clinicMonthName
                        })
                        if(zoomEmailReply){
                            setFilteredDateArray([])
                            updateShallowTrackerAll(cafeTracker)
                            setSolidSnapshot({})    
                            setShallowSnapshot({})
                            setIsLoading(false)
                            closeModalHandler()
                        }
                        if(error4){
                            alert(error4)
                            return
                        }
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
        setFilteredDateArray([])
        setSolidSnapshot({})
        setShallowSnapshot({})
        closeModalHandler()
    }

    // function submitHandler(){
    //     submitOption? submitYesHandler() : submitNoHandler()
    // }
    
    let footerContent = 
    <ModularLink 
        textColor={Colors.highlightColor} 
        textSize={height/50} 
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
                    return <Title key={separatedSaveTitle[separatedSaveTitle.indexOf(word)]}  textSize={height / 35} color={Colors.highlightColor}>{word}</Title>
                })
            }
        </View>
        <View style={styles.submitContainer}>
            {/* <Pressable onPress={toggleYesHandler} style={styles.submitOption}>
                <Text style={styles.submitText}>Yes</Text>
                <ClickBox height={converter(width/30, width/30, width/30)} width={converter(width/30, width/30, width/30)} borderRadius={converter(3, 4, 6)} toggle={submitOption} toggleColor={Colors.secondaryColor300} />
            </Pressable>
            <Pressable onPress={toggleNoHandler} style={styles.submitOption}>
                <Text style={styles.submitText}>No</Text>
                <ClickBox height={converter(width/30, width/30, width/30)} width={converter(width/30, width/30, width/30)} borderRadius={converter(3, 4, 6)} toggle={!submitOption} toggleColor={Colors.secondaryColor300} />
            </Pressable> */}
            <ModularButton 
                style={styles.submitButton} 
                buttonColor={Colors.secondaryColor300} 
                textSize={converter(width/35, width/35, width/30)} 
                textStyles={{fontWeight: 'bold'}} 
                textColor={Colors.highlightColor}
                onPress={submitYesHandler}
            >
                Submit
            </ModularButton>
            <ModularButton 
                style={styles.submitButton} 
                buttonColor={Colors.errorColor} 
                textSize={converter(width/35, width/35, width/30)} 
                textStyles={{fontWeight: 'bold'}} 
                textColor={Colors.highlightColor}
                onPress={submitNoHandler}
            >
                Cancel
            </ModularButton>
        </View>
    </View>
    }

    
    return(
        <Modal visible={visible} animationType='slide' style={styles.modal}>
        <View style={styles.modalInnerContainer}>
        <View style={styles.selectADate}>
            <Title color={Colors.secondaryColor} large={true} style={{marginRight: width/50}} >Select Date</Title>
        </View>
                        <View style={styles.scheduleContainer}>
                            <View style={styles.scheduleHeader}>
                                <View style={styles.topTitleContainer}>
                                    <Text style={styles.topTitle}>{targetSkill}</Text>    
                                </View>
                                <View>
                                    <Text style={styles.topDate}>{monthName}</Text>
                                    <Text style={styles.topDate}>{year}</Text>
                                </View>    
                            </View>
                            <ScrollView style={styles.scheduleBody}>
                                <View style={styles.scheduleBodyInnerContainer}>
                                {
                                    filteredDateArray.length < 1? <Loader size='large' color={Colors.accentColor} /> : 

                                    filteredDateArray.map(entry =>{
                                        const originalDate = new Date(entry.date)
                                        const fullMonth = originalDate.toLocaleString('default', {month: 'long'})
                                        const numericDay = (parseInt(originalDate.toLocaleString('default', {day: 'numeric'}))).toString()
                                        const year = originalDate.toLocaleString('default', {year: 'numeric'})
                                        const headlineDate = `${fullMonth} ${numericDay}`
                                        const date = `${fullMonth} ${numericDay} ${year}`
                                        const time = entry.time
                                        const zoomLink = entry.zoom_link
                                        const clinicMonthName = entry.clinicMonthName
                                        const clinicLink = entry.clinic_link
                                        const title = entry.title
                                        return(
                                            <ScheduleEntry 
                                                key={entry._id} 
                                                id={entry._id} 
                                                monthNumber={entry.monthNumber} 
                                                monthName={entry.monthName} 
                                                headlineDate={headlineDate}
                                                date = {date} 
                                                time={time}
                                                zoomLink={zoomLink}
                                                clinicMonthName ={clinicMonthName}
                                                clinicLink={clinicLink}
                                                cafeTracker={cafeTracker}
                                                onPress={updateCafeTracker}
                                                title={title}
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


export default EditSchedule