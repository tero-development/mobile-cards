import {View, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useContext, useState, useEffect } from 'react'
import { SignInContext } from '../store/signin-context'
import {SeasonContext} from '../store/season-context'
import SeasonContextProvider from '../store/season-context'
import {searchEmployee} from '../httpServices/employees'
import { getActiveSeason } from '../httpServices/seasons'
import { getCafeTracker, getAllCafes } from '../httpServices/cafes'
import { getContact } from '../httpServices/HBcontacts'
import IconButton from '../UI/IconButton'
import Colors from '../utils/colors'
import ModularLink from '../components/ModularLink'
import AdminGreeting from '../components/HomeComponents/AdminGreeting'
import HomeSelection from '../components/HomeComponents/HomeSelection'
import Loader from '../UI/Loader'
import { CafeContext } from '../store/cafe-context'
import { HubspotContext } from '../store/hubspot-context'


const ProducerScreen = ({navigation}) =>{
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
    const [allCafes, setAllCafes] = useState([])
    
    useEffect(()=>{
        let tempEmail = credentials.email

        async function getCafes(companyId){
            try{
                const response = await getAllCafes(companyId)
                if(response){
                   setAllCafes(response)
                }
            }catch(e){
                alert(e.message)
            }
        }

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
        getCafes(`62d47c7a36aeee14652966cd`)

   
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


    function navigateQuizProducer(){
        navigation.navigate('QuizManagement')
    }


    //ionicons: 'calendar', 'game-controller',  'chevron-forward', 'star', 'play-circle'

    return(
        <SeasonContextProvider>
            <LinearGradient style={styles.rootScreen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={true} hasEditProfile={true} iconName='menu' iconSize={28} iconColor={Colors.secondaryColor} onPress={openDrawer}/>
            <View style={styles.container}>
                <AdminGreeting points={'P'} rank={23} name={firstName? firstName : <Loader size='small' color={Colors.accentColor} />}/>
                {credentials.employeeId? <View style={styles.profileContainer}>

                <HomeSelection onPress={navigateQuizProducer} title='Quiz Management' iconName='clipboard' iconSize={24}/>
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

export default ProducerScreen