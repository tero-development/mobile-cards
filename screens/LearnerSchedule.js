import {View, useWindowDimensions, ScrollView} from 'react-native'
import { useState, useContext, useEffect } from 'react'
import Title from '../UI/Title'
import { LinearGradient } from 'expo-linear-gradient'
import { SeasonContext } from '../store/season-context'
import { SignInContext } from '../store/signin-context'
import { CafeContext } from '../store/cafe-context'
import { AssessmentContext } from '../store/assessment-context'
import { getAssessment } from '../httpServices/assessments'
import Colors from '../utils/colors'
import ScheduleNode from '../components/ScheduleComponents/ScheduleNode'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'
import EditSchedule from '../components/ScheduleComponents/EditSchedule'
import Loader from '../UI/Loader'
import { getSelectedCafeIds, getCafeDates } from '../httpServices/cafes'
import BackButton from '../UI/BackButton'



const LearnerSchedule = ({navigation, route}) =>{
    const {
        cafeDetails, 
        updateEditScheduleVariables,
        updateEditScheduleVariablesClear
        } = useContext(CafeContext)
    const [modalIsVisible, setModalIsVisible] = useState(false)

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        rootScreen:{
            flex: 1
        },
        scrollContainer:{
            paddingTop: height / 8
        },
        container:{
            flex: 1,
            paddingTop: height/40,
            alignItems: 'center',
        },
        nodeContainer:{
            marginBottom:  height / 7
        },
        modal:{
            flex:1
        },
        modalInnerContainer:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'turquoise'
        }
    }
 
    const styles = useStyles(localStyles)



    function navigateBack(){
        navigation.navigate('HomeScreen')
    }

    const {selectedCafes, scheduledDates} = cafeDetails


    function openDrawer({}){
        navigation.toggleDrawer()
    }


    function openModalHandler(variableGroup){
        updateEditScheduleVariables(variableGroup)
        setModalIsVisible(true)
    }

    function closeModalHandler(){
        updateEditScheduleVariablesClear()
        setModalIsVisible(false)
    }


    return(
        <LinearGradient style={styles.rootScreen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={false} iconName='menu'  iconColor={Colors.secondaryColor} onPress={openDrawer} viewStyle={{position: 'absolute', left: width/20, top: height/10, zIndex: 1}}/>
            <ScrollView style={styles.scrollContainer}>
            <View style={{alignItems: 'center', marginBottom: height/40}}>
                <Title 
                    color={Colors.secondaryColor} 
                    large={true} 
                    style={{
                        marginTop: height/30,  
                        width: width / 10 * 8, 
                        textAlign:'right'}}
                >
                        My Schedule
                    </Title>
            </View>
            <View style={styles.container}>
                <View style={styles.nodeContainer}>
                    {
                        //'selectedCafes' is assessment.currentSkillsChallenges, 'scheduledDates' is an array of all the offered dates per selectedCafe 
                        (selectedCafes.length < 1 && scheduledDates.length < 1) ? <Loader size="large" color={Colors.accentColor} /> : selectedCafes.map(
                            entry => {
                                const currentIndex = selectedCafes.indexOf(entry)

                                return <ScheduleNode 
                                key={entry._id}
                                groupTargetId={entry._id}
                                currentIndex={currentIndex}
                                targetSkill={entry.title} 
                                companyCafeDesignation={'ExSellerator'} 
                                openModalHandler={openModalHandler}/>
                            }
                        )
                        
                    }
                </View>
            </View>
            {(scheduledDates.length > 0 && modalIsVisible) && <EditSchedule visible={modalIsVisible} closeModalHandler={closeModalHandler}/> }
            </ScrollView>
            <BackButton viewStyle={{left:converter( width/70,  width/100,  width/70)}} textSize={converter(width/30, width/30, width/35)} iconSize={converter(width/20, width/25, width/25)} navigationHandler={navigateBack}/>
        </LinearGradient>
    )
}




export default LearnerSchedule
