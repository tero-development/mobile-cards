import {KeyboardAvoidingView,View, Text, TextInput, useWindowDimensions} from 'react-native'
import { useState, useContext, useEffect} from 'react'
import Colors from '../utils/colors'
import ModularButton from '../components/ModularButton'
import  {converterSetup,useStyles} from '../utils/dimensions'
// import Loader from './Loader'
import { ProducerContext } from '../store/producer-context'
import { sendScore } from '../httpServices/producers'

const ScoreOverlay = ({closeFunction, rosterChecker, overlayObject}) =>{
    // const [isLoading, setIsLoading] = useState(false)
    const [quizPoints, setQuizPoints] = useState("")
    const [teamPoints, setTeamPoints] = useState("")
    const [attendancePoints, setAttendancePoints] = useState("")
    const {schedule, updateQuizScore, updateTeamRank, updateAttenanceMinutes, updateShallowScoreTracker} = useContext(ProducerContext)

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        screen:{
            flex:1
        },
        container:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.primaryColor100
        },
        // text:{
        //     textAlign: 'center',
        //     color: Colors.secondaryColor,
        //     marginBottom: height/30,
        //     fontSize: converter(width/30, width/25, width/35, width/35),
        //     width: converter(width/2, width/1.5, width/1.9, width/2)
        // },
        standardText:{
            color: Colors.secondaryColor,
            fontSize: converter(width/20, width/25, width/35, width/35)
        },
        topText:{
            marginBottom: height / 100,
        },
        errorText:{
            textAlign: 'center',
            color: Colors.errorColor,
            marginVertical: height / 200,
            fontSize: 14,
            width: width / 10 * 5
        },
        title:{
            fontSize: converter(width/16, width/14, width/16, width/16),
            fontWeight: 'bold',
            marginBottom: height / 20,
            color: Colors.secondaryColor
        },
        inputContainer:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: converter(width/10 * 8),
            marginBottom: converter(height/20),
            backgroundColor: Colors.primaryColor400,
            borderRadius: converter(width/25, width/35, width/55, width/60),
            padding: converter(width/25)
        },
        input:{
            backgroundColor: Colors.highlightColor,
            height: converter(width/10),
            width: converter(width/10),
            paddingLeft: converter(width/40),
            fontSize: width/30,
            borderRadius: converter(width/75)
        },
    }

    const {shallowScoreTracker} = schedule

    const {index, firstName, dbTracker} = overlayObject

    console.log("Shallow Tracker from ScoreOverlay:")
    console.log(shallowScoreTracker)

    useEffect(()=>{
        const quiz = shallowScoreTracker.quizScore.toString()
        const attendance = shallowScoreTracker.attendanceMinutes.toString()
        const team = shallowScoreTracker.teamRank.toString()
        setAttendancePoints(attendance)
        setTeamPoints(team)
        setQuizPoints(quiz)
        return ()=>{}
    }, [])
    
    async function submitHandler(currentMonth, participant, companyId, seasonId){
        if(!quizPoints || !teamPoints || !attendancePoints){
            alert("Check for empty fields!")
        }else{
            sendScore(currentMonth, participant, companyId, seasonId)
        }
    }

    const styles = useStyles(localStyles)


    function applyQuizPoints(text){
        updateQuizScore({index: index, value: text})
        rosterChecker(prev => !prev)
    }

    function applyTeamPoints(text){
        updateTeamRank({index: index, value: text})
        rosterChecker(prev => !prev)
    }

    function applyAttendancePoints(text){
        updateAttenanceMinutes({index: index, value: text})
        rosterChecker(prev => !prev)
    }

    const midContent = 
    <>
            <View style={styles.inputContainer}>
                <Text style={styles.standardText}>Attendance Minutes</Text>
                <TextInput 
                    value ={attendancePoints}
                    onChangeText = {(text) =>  {
                        if(!isNaN(text)) { 
                            setAttendancePoints(text)
                            const numericValue = parseInt(text)
                            // applyAttendancePoints(numericValue)
                        } 
                    }}
                    placeholder=''
                    autoCorrect = {true}
                    autoCapitalize = "none"
                    style={styles.input}
                    keyboardType= 'number-pad'
                    maxLength = {2}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.standardText}>Quiz Score</Text>
                <TextInput 
                    value ={quizPoints}
                    onChangeText = {(text) =>  {
                        if(!isNaN(text)) { 
                            setQuizPoints(text)
                            const numericValue = parseInt(text)
                            // applyQuizPoints(numericValue)
                        } 
                    }}
                    placeholder=''
                    autoCorrect = {true}
                    autoCapitalize = "none"
                    style={styles.input}
                    keyboardType= 'number-pad'
                    maxLength = {2}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.standardText}>Team Rank</Text>
                <TextInput 
                    value ={teamPoints}
                    onChangeText = {(text) =>  {
                        if(!isNaN(text)) { 
                            setTeamPoints(text)
                            const numericValue = parseInt(text)
                            // applyTeamPoints(numericValue)
                        } 
                    }}  
                    autoCorrect = {true}
                    autoCapitalize = "none"
                    style={styles.input}
                    keyboardType= 'number-pad'
                    maxLength={2}
                />
            </View>
            <ModularButton 
                textSize={converter(width/20)} 
                onPress={submitHandler} 
                buttonColor={Colors.secondaryColor400} 
                textColor={Colors.highlightColor} 
                rippleColor={Colors.secondaryColor}
            >
                submit
            </ModularButton>
            <ModularButton 
                textSize={converter(width/20)} 
                onPress={closeFunction} 
                buttonColor={Colors.accentColor} 
                textColor={Colors.highlightColor} 
                rippleColor={Colors.secondaryColor}
            >
                close
            </ModularButton>
            
    </>

    // async function submitHandler(){

    // }

    return (
        <KeyboardAvoidingView behavior='height' style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.title}>{`Enter Scores For ${firstName}` }</Text>
                {/* <Text style={[styles.text, styles.topText]}></Text> */}
                {/* {isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent} */}
                {midContent}
            </View>
        </KeyboardAvoidingView>

    )
    
}

export default ScoreOverlay

