import {View, StyleSheet, ScrollView} from 'react-native'
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
import DeviceFractions from '../utils/dimensions'
import ScheduleNodeMain from '../components/ScheduleComponents/ScheduleNodeMain'
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


    
    useEffect(()=>{
        async function retrieveAssessment(){
            try{
                const assessment = await getAssessment(credentials.employeeId, season._id)
                if(assessment){
                    updateAssessment(assessment)
                    try{
                        updateSelectedCafes(assessment.currentSkillsChallenges)
                        const selectedIds = await getSelectedCafeIds(assessment.currentSkillsChallenges.map(entry => entry._id))
                        if(selectedIds){
                            try{
                                //these are the offered dates, from the 'cafes' table
                                const cafeDates = await getCafeDates(selectedIds)
                                if(cafeDates){
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
            <IconButton isHeader={true} iconName='menu' iconSize={28} iconColor={Colors.secondaryColor} onPress={openDrawer}/>
            <View style={{alignItems: 'center', marginBottom: DeviceFractions.deviceH40}}>
                <Title 
                    color={Colors.secondaryColor} 
                    textSize={36} 
                    style={{
                        marginTop: DeviceFractions.deviceH30,  
                        width:DeviceFractions.deviceWidth / 10 * 8, 
                        textAlign:'right'}}
                    >
                        My Schedule
                    </Title>
            </View>
            <View style={styles.container}>
                <ScrollView style={styles.nodeContainer}>
                    {
                        //'selectedCafes' is assessment.currentSkillsChallenges, 'scheduledDates' is an array of all the offered dates per selectedCafe 
                        (selectedCafes.length < 1 && scheduledDates.length < 1) ? <Loader size="large" color={Colors.accentColor} /> : selectedCafes.map(
                            entry => {
                                const currentIndex = selectedCafes.indexOf(entry)

                                return <ScheduleNode 
                                key={entry._id}
                                currentIndex={currentIndex}
                                targetSkill={entry.title} 
                                companyCafeDesignation={'ExSellerator'} 
                                openModalHandler={openModalHandler}/>
                            }
                        )
                        
                    }
                    {/* <ScheduleNodeMain 
                        targetSkill={pseudoInfo.title}
                        designation={'Schedule'}
                        dateRange={pseudoInfo.dateRange}
                        time={'08:30am - 10:00am'}
                        modalTrigger={openModalHandler}
                    />
                    <ScheduleNode targetSkill={'Be Upstanding'} dateRange={'April - May'} time={'10:00am - 11:30am'} modalTrigger={openModalHandler} />
                    <ScheduleNode targetSkill={'Meeting Effectiveness'} dateRange={'June - July'} time={'9:00am - 11:00am'} modalTrigger={openModalHandler}/>                 */}
    
                </ScrollView>
            </View>
            {(scheduledDates.length > 0 && modalIsVisble) && <EditSchedule visible={modalIsVisble} closeModalHandler={closeModalHandler}/> }
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    rootScreen:{
        flex: 1
    },
    container:{
        flex: 1,
        paddingTop: DeviceFractions.deviceH40,
        alignItems: 'center',
    },
    nodeContainer:{
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
})

export default LearnerSchedule