import {View, useWindowDimensions, ScrollView} from 'react-native'
import { useState, useContext, useEffect } from 'react'
import Title from '../UI/Title'
import { LinearGradient } from 'expo-linear-gradient'
import { AssessmentContext } from '../store/assessment-context'
import { SeasonContext } from '../store/season-context'
import { SignInContext } from '../store/signin-context'
import { CafeContext } from '../store/cafe-context'
import { getAssessment } from '../httpServices/assessments'
import Colors from '../utils/colors'
import ScheduleNode from '../components/ScheduleComponents/ScheduleNode'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'
import EditSchedule from '../components/ScheduleComponents/EditSchedule'
import Loader from '../UI/Loader'
import { getSelectedCafeIds, getCafeDates } from '../httpServices/cafes'

const LearnerSchedule = ({navigation, route}) =>{
    const { updateAssessment} = useContext(AssessmentContext)
    const {season} = useContext(SeasonContext)
    const {credentials} = useContext(SignInContext)
    const {
        cafeDetails, 
        updateSelectedCafes,
        updateScheduledDates,
        updateEditScheduleVariables,
        updateEditScheduleVariablesClear
        } = useContext(CafeContext)
    const [modalIsVisble, setModalIsVisble] = useState(false)

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


    
    useEffect(()=>{
        async function retrieveAssessment(){
            try{
                const assessment = await getAssessment(credentials.employeeId, season._id)
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
                            // console.log('LearnerSchedule ln 49 selectedIds:')
                            // console.log(selectedIds)
                            try{
                                //these are the offered dates, from the 'cafes' table
                                const cafeDates = await getCafeDates(selectedIds)
                                if(cafeDates){
                                    console.log('LearnerSchedule ln 51 cafeDates:')
                                    console.log(cafeDates)
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

        retrieveAssessment()

        return ()=>{}
    },[])

    const {selectedCafes, scheduledDates} = cafeDetails


    function openDrawer({}){
        navigation.toggleDrawer()
    }


    function openModalHandler(variableGroup){
        updateEditScheduleVariables(variableGroup)
        setModalIsVisble(true)
    }

    function closeModalHandler(){
        updateEditScheduleVariablesClear()
        setModalIsVisble(false)
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
            {(scheduledDates.length > 0 && modalIsVisble) && <EditSchedule visible={modalIsVisble} closeModalHandler={closeModalHandler}/> }
            </ScrollView>
        </LinearGradient>
    )
}




export default LearnerSchedule
