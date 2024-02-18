import {View,useWindowDimensions} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { converterSetup, useStyles } from '../utils/dimensions'
import { useContext, useState, useEffect } from 'react'
import { SignInContext } from '../store/signin-context'
import {SeasonContext} from '../store/season-context'
import SeasonContextProvider from '../store/season-context'
import {searchEmployee} from '../httpServices/employees'
import { getActiveSeason } from '../httpServices/seasons'
import { getCafeTracker, getCafeDates, getSelectedCafeIds } from '../httpServices/cafes'
import { getContact } from '../httpServices/HBcontacts'
import { getCompany } from '../httpServices/companies'
import { AssessmentContext } from '../store/assessment-context'
import { getAssessment } from '../httpServices/assessments'
import IconButton from '../UI/IconButton'
import Colors from '../utils/colors'
import ModularLink from '../components/ModularLink'
import ScoreGreeting from '../components/HomeComponents/ScoreGreeting'
import HomeSelection from '../components/HomeComponents/HomeSelection'
import Loader from '../UI/Loader'
import { CafeContext } from '../store/cafe-context'
import { HubspotContext } from '../store/hubspot-context'
import { slice } from 'lodash'


const HomeScreen = ({navigation}) =>{
    const {
        credentials,
        updateFirstname,
        updateLastName,
        updateEmail,
        updateManagerEmail,
        updateIndustryYears,
        updateEmployeeTerritory,
        updatePhoneNumber,
        updateCompany,
        updateEmployeeId,
        updateSignInClear,
    } = useContext(SignInContext)
    const {season} = useContext(SeasonContext)
    const {updateSeason} = useContext(SeasonContext)
    const { updateAssessment} = useContext(AssessmentContext)
    const {
        cafeDetails,
        updateCafeTrackerAll,
        updateShallowTrackerAll,
        updateSelectedCafes,
        updateScheduledDates,
        updateCafeClear
    } = useContext(CafeContext)
    const [isScheduleIncomplete, setIsScheduleIncomplete] = useState(false)
    const {hubspotDetails, updateContactId} = useContext(HubspotContext)

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        screen:{
            flex: 1,
        },
        container:{ 
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }

    const styles = useStyles(localStyles)

    const signInCredentials = {
        email: credentials.email, 
        password: credentials.password
    }

    
    useEffect(()=>{
        let tempEmail = credentials.email

        async function retrieveEmployee(){
            try{
                const employee = await searchEmployee(tempEmail)
                if(employee){
                    updateEmployeeId(employee._id)
                    updateFirstname(employee.firstName)
                    updateLastName(employee.lastName)
                    updateEmail(employee.email)
                    updateManagerEmail(employee.managerEmail)
                    updateIndustryYears(employee.industryYears)
                    updateEmployeeTerritory(employee.employeeTerritory)
                    updatePhoneNumber(employee.phoneNumber)
                    try{
                        const season = await getActiveSeason(employee.company_id)
                        if(season){
                            try{
                                updateSeason(season)
                                const tracker = await getCafeTracker(employee._id, season._id)
                                if(tracker){
                                    updateCafeTrackerAll(tracker)
                                    updateShallowTrackerAll(tracker)
                                    try{
                                        const assessment = await getAssessment(employee._id, season._id)
                                        if(assessment){
                                            // console.log('LearnerSchedule ln 38 assessment:')
                                            // console.log(assessment)
                                            updateAssessment(assessment)
                                            try{
                                                updateSelectedCafes(assessment.currentSkillsChallenges)
                                                // console.log('LearnerSchedule ln 43 currentSkillChallenges:')
                                                // console.log(assessment.currentSkillsChallenges)
                                                const selectedIds = await getSelectedCafeIds(assessment.currentSkillsChallenges.map(entry => entry._id))
                                               
                                                if(selectedIds){
                                                    // console.log('')
                                                    // console.log('LearnerSchedule ln 49 selectedIds:')
                                                    // console.log(selectedIds)
                                                    updateScheduledDates(selectedIds)
                                                    try{
                                                        //these are the offered dates, from the 'cafes' table
                                                        const cafeDates = await getCafeDates(selectedIds)
                                                        if(cafeDates){
                                                            // console.log('')
                                                            // console.log('LearnerSchedule ln 51 cafeDates:')
                                                            // console.log(cafeDates)
                                                            updateScheduledDates(cafeDates)
                                                        }
                                                    }catch(e){
                                                        alert(e)
                                                    }
                                                    
                                                }
                                            }catch(e){
                                                alert(e)
                                            }
                                            
                                        }
                                    } catch(e){
                                        alert(e)
                                    }
                                }
                            }catch(e){
                                alert(e)
                            }
                        }
                    }catch(e){
                        alert(e)
                    }
                }
            }catch(e){
                alert(e)
            }
        }

        updateSignInClear()
        retrieveEmployee()
        return () =>{}

    },[])
    
    // useEffect(()=>{
    //     async function retrieveHBId(){
    //         try{
    //             const response = await getContact(credentials.email)
    //             if(response.total > 0){
    //                 updateContactId(response.results[0].id)
    //             }
    //         }catch(e){
    //             alert(e)
    //         }
    //     }

    //     retrieveHBId()
    //     return ()=>{}
    // }, [])


    //if cafeTracker is of type Object:
    // useEffect(()=>{
    //     let value = false
    //     for (let instance in cafeDetails.cafeTracker){
    //         if(Object.keys(cafeDetails.cafeTracker[instance]).length === 0){
    //             value = true
    //         }
    //     }
    //     setIsScheduleIncomplete(value)
    // },[cafeDetails.cafeTracker])

    const {cafeTracker, shallowTracker} = cafeDetails

    useEffect(()=>{
        let value = false
        if(cafeTracker.list.length < 5){
            value = true
        } else(
            cafeTracker.list.forEach(entry=>{
                if(entry.id === undefined){
                    value = true
                }
            })
        )
        setIsScheduleIncomplete(value)
    },[cafeTracker.list])


    const {firstName} = credentials

    function openDrawer(){
        navigation.toggleDrawer()
    }


    function signOutHandler(){
        updateSignInClear()
        updateCafeClear()
        navigation.navigate('SplashScreen')
    }

    function navigateLearnerSchedule(){
        navigation.navigate('LearnerSchedule')
    }

    function navigateCompetency(){
        navigation.navigate('CompetencyScreen')
    }

    function navigateCafeList(){
        navigation.navigate('CafeListScreen')
    }


    //ionicons: 'calendar', 'game-controller',  'chevron-forward', 'star', 'play-circle'

    return(
        <SeasonContextProvider>
            <LinearGradient style={styles.screen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={true} hasEditProfile={true} iconName='menu' iconColor={Colors.secondaryColor} onPress={openDrawer}/>
            <View style={styles.container}>
                {
                    (credentials.employeeId && firstName)?  <ScoreGreeting points={10} rank={1} name={firstName}/>
                    : <Loader size='large' color={Colors.accentColor}/> 
                }
                {credentials.employeeId? <View style={styles.profileContainer}>
                <HomeSelection 
                onPress={navigateLearnerSchedule} 
                    title='Schedule' 
                    iconName='calendar' 
                    
                    prompt={isScheduleIncomplete}
                    prompText={'Incomplete'}
                    promptColor={Colors.errorColor}  
                />
                <HomeSelection onPress={navigateCafeList} title='ExSellerator' iconName='speedometer-outline' />
                <HomeSelection
                onPress={()=>{}} 
                    title='Achievements' 
                    iconName='game-controller' 
                     
                    prompt={true}
                    prompText={'upcoming'}
                    promptColor={Colors.activeColor}  
                />
                {/* <HomeSelection onPress={navigateCompetency} title='Competency Cards' iconName='copy' /> */}
                <ModularLink 
                    onPress={signOutHandler}     
                    textColor={Colors.secondaryColor}
                    textWeight={'bold'}
                    textStyles={{
                        textAlign: 'center'
                    }}
                >Sign Out</ModularLink>
                </View> : <Loader size="large" color={Colors.accentColor}/>}
            </View>
        </LinearGradient>
        </SeasonContextProvider>
        
    )
}

export default HomeScreen

