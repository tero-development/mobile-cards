import {View, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useContext, useState, useEffect } from 'react'
import { SignInContext } from '../store/signin-context'
import {SeasonContext} from '../store/season-context'
import SeasonContextProvider from '../store/season-context'
import {searchEmployee} from '../httpServices/employees'
import { getActiveSeason } from '../httpServices/seasons'
import { getCafeTracker } from '../httpServices/cafes'
import { getContact } from '../httpServices/HBcontacts'
import IconButton from '../UI/IconButton'
import Colors from '../utils/colors'
import ModularLink from '../components/ModularLink'
import ScoreGreeting from '../components/HomeComponents/ScoreGreeting'
import HomeSelection from '../components/HomeComponents/HomeSelection'
import Loader from '../UI/Loader'
import { CafeContext } from '../store/cafe-context'
import { HubspotContext } from '../store/hubspot-context'


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
    const {updateSeason} = useContext(SeasonContext)
    const {
        cafeDetails,
         updateCafeTrackerAll,
        updateShallowTrackerAll, 
        updateCafeClear} = useContext(CafeContext)
    const [isScheduleIncomplete, setIsScheduleIncomplete] = useState(false)
    const {hubspotDetails, updateContactId} = useContext(HubspotContext)
    
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
                    updateCompany(employee.company_id)
                    try{
                        const season = await getActiveSeason(employee.company_id)
                        if(season){
                            try{
                                updateSeason(season)
                                const tracker = await getCafeTracker(employee._id, season._id)
                                if(tracker){
                                    updateCafeTrackerAll(tracker)
                                    updateShallowTrackerAll(tracker)
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

    useEffect(()=>{
        async function retrieveHBId(){
            try{
                const response = await getContact(credentials.email)
                if(response.total > 0){
                    updateContactId(response.results[0].id)
                }
            }catch(e){
                alert(e)
            }
        }

        if(credentials.employeeId !== undefined){
            retrieveHBId()
        }

        return ()=>{}
    }, [])


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

    // console.log("HOME SCREEN, hToDeal:")
    // console.log(hubspotDetails.toDealId)

    // console.log('from HOMESCREEN, cafe tracker: ')
    // console.log(cafeTracker)

    // console.log('from HOMESCREEN, shallow tracker: ')
    // console.log(shallowTracker.list)

    // console.log('from HOMESCREEN, scheduled Dates: ')
    // console.log(cafeDetails.scheduledDates)
    // console.log('')
    // console.log('')
    // console.log('')
    // console.log('')
    // console.log('from HOMESCREEN, selected Cafes: ')
    // console.log(cafeDetails.selectedCafes)

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


    //ionicons: 'calendar', 'game-controller',  'chevron-forward', 'star', 'play-circle'

    return(
        <SeasonContextProvider>
            <LinearGradient style={styles.rootScreen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={true} hasEditProfile={true} iconName='menu' iconSize={28} iconColor={Colors.secondaryColor} onPress={openDrawer}/>
            <View style={styles.container}>
                <ScoreGreeting points={35} rank={23} name={firstName? firstName : <Loader size='small' color={Colors.accentColor} />}/>
                {credentials.employeeId? <View style={styles.profileContainer}>
                <HomeSelection onPress={navigateLearnerSchedule} title='Schedule' notification={isScheduleIncomplete} iconName='calendar' iconSize={24}/>
                <HomeSelection onPress={navigateCompetency} title='Competency Cards' iconName='copy' iconSize={24}/>
                <HomeSelection title='Achievements' iconName='game-controller' iconSize={24}/>
                <HomeSelection title='Knowledge Check' iconName='clipboard' iconSize={24}/>
                <ModularLink 
                    onPress={signOutHandler}     
                    textColor={Colors.secondaryColor}
                    textSize={18}
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

const styles = StyleSheet.create({
    rootScreen:{
        flex: 1
    }, 
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HomeScreen