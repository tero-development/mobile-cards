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
import { ProducerContext } from '../store/producer-context'
import { getMonths } from '../httpServices/producers'

const ProducerScreen = ({navigation}) =>{
    const {
        credentials,
        updateSignInClear,
    } = useContext(SignInContext)
    const {updateCafeClear} = useContext(CafeContext)
    const {schedule, updateScheduleMonths} = useContext(ProducerContext)

    useEffect(()=>{

        async function populateMonths(){
            try{
                const response = await getMonths('62d47c7a36aeee14652966cd', '650b8c8746533a5af871ba0a')
                if(response){
                    updateScheduleMonths(response)
                }
            }catch(e){
                alert(e)
            }
        }

        populateMonths()

        return ()=>{

        }
    },[])
    
    const firstName = "Producer"

    function openDrawer(){
        navigation.toggleDrawer()
    }
    

    function signOutHandler(){
        updateSignInClear()
        updateCafeClear()
        navigation.navigate('SplashScreen')
    }


    function navigateQuiz(){
        navigation.navigate('QuizMonths', {designation: "quizzes"})
    }

    function navigateAttendance(){
        navigation.navigate('AttendanceMonths', {designation: "attendance"})
    }

    function navigateScoring(){
        navigation.navigate('ScoreMonths', {designation: "scores"})
    }


    return(
        <SeasonContextProvider>
            <LinearGradient style={styles.rootScreen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={true} hasEditProfile={true} iconName='menu' iconSize={28} iconColor={Colors.secondaryColor} onPress={openDrawer}/>
            <View style={styles.container}>
                <AdminGreeting points={'P'} rank={23} name={firstName? firstName : <Loader size='small' color={Colors.accentColor} />}/>
                {/* {credentials.employeeId?  */}
                <View style={styles.profileContainer}>

                <HomeSelection onPress={navigateQuiz} title='Quizzes' iconName='clipboard' iconSize={24}/>
                <HomeSelection onPress={navigateAttendance} title='Attendance' iconName='checkmark' iconSize={24}/>
                <HomeSelection onPress={navigateScoring} title='Scores' iconName='game-controller-outline' iconSize={24}/>

                <ModularLink 
                    onPress={signOutHandler}     
                    textColor={Colors.secondaryColor}
                    textSize={18}
                    textWeight={'bold'}
                    textStyles={{
                        textAlign: 'center'
                    }}
                >Sign Out</ModularLink>
                </View> 
                {/* : 
                <Loader size="large" color={Colors.accentColor}/>} */}
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