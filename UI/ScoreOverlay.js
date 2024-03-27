import {KeyboardAvoidingView,View, Text, TextInput, useWindowDimensions} from 'react-native'
import { useState, useContext, useEffect} from 'react'
import Colors from '../utils/colors'
import ModularButton from '../components/ModularButton'
import  {converterSetup,useStyles} from '../utils/dimensions'
// import Loader from './Loader'
import { ProducerContext } from '../store/producer-context'
import { CompanyContext } from '../store/company-context'
import { sendSingleScoreTracker } from '../httpServices/scoreTrackers'
import { Dropdown } from 'react-native-element-dropdown';


const ScoreOverlay = ({closeFunction, rosterChecker, overlayObject}) =>{
    // const [isLoading, setIsLoading] = useState(false)
    const [quizScore, setQuizScore] = useState("")
    const [quizPoints, setQuizPoints] = useState("")
    const [quizPercentage, setQuizPercentage] = useState("")
    const [teamRank, setTeamRank] = useState("")
    const [teamPoints, setTeamPoints] = useState("")
    const [attendanceMinutes, setAttendanceMinutes] = useState("")
    const [attendancePoints, setAttendancePoints] = useState("")
    const {schedule, updateShallowScoreTracker} = useContext(ProducerContext)
    const {company} = useContext(CompanyContext)    
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
        dropDown:{
            backgroundColor: Colors.highlightColor,
            width: converter(width / 10 * 1.8),
            borderRadius: converter(width/75)
        },
        dropPlaceholder:{
            fontSize: converter(width/30),
            textAlign: "center"
        },
        dropTextStyle:{
            fontSize: converter(width/30),
            textAlign: "center"
        },
        dropInputSearchStyle:{
        
        },
        dropListContainer:{
            backgroundColor: Colors.secondaryColor,
            width: converter(width/10*5),
            borderRadius: converter(width/50, width/35, width/55, width/70),
            justifyContent: 'center',
            paddingVertical: '3%',
            paddingHorizontal: '3%'
        },
        dropItemText:{
            textAlign: 'center'
        },
        dropItemContainer:{
            borderRadius: converter(width/50, width/35, width/55, width/70),
            backgroundColor: Colors.highlightColor,
            marginBottom: '2%',
            elevation: 2,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowOffset: {width: 0, height: 1},
            shadowRadius: 8,
        }
    }

    const styles = useStyles(localStyles)

    const pointSystem = company.point_system

    const {currentMonth, currentClass, shallowScoreTracker} = schedule

    const {index, firstName} = overlayObject

    
    // if(currentMonth in shallowScoreTracker){
    //     console.log("ScoreOverlay key check: ")
    //     console.log(shallowScoreTracker[currentMonth])
    // }

    useEffect(()=>{
        const quiz = shallowScoreTracker[currentMonth].quizScore.toString()
        const attendance = shallowScoreTracker[currentMonth].attendanceMinutes.toString()
        const team = shallowScoreTracker[currentMonth].teamRank.toString()
        setAttendanceMinutes(attendance)
        setTeamRank(team)
        setQuizScore(quiz)
        return ()=>{}
    }, [])
    
    async function submitHandler(currentMonth, shallowScoreTracker){
        if(!quizScore || !teamRank || !attendanceMinutes){
            alert("Check for empty fields!")
        }else{
            let placeholder = shallowScoreTracker
            placeholder[currentMonth] = {
                quizScore: parseInt(quizScore),
                quizPoints: quizPoints,
                quizPercentage: quizPercentage,
                teamRank: teamRank,
                teamPoints: teamPoints,
                attendanceMinutes: parseInt(attendanceMinutes),
                attendancePoints: attendancePoints, 
                maxScore: 60,
                cafe: currentClass
            }

            try{
                const response = await sendSingleScoreTracker(currentMonth, placeholder)
                if(response){
    
                    updateShallowScoreTracker(placeholder)
                    closeFunction()
                }
            }catch(e){
                alert(e)
                closeFunction()
            }
        }
    }

    console.log(attendancePoints)
    // function applyQuizPoints(text){
    //     updateQuizScore({index: index, value: text})
    //     rosterChecker(prev => !prev)
    // }

    // function applyTeamPoints(text){
    //     updateTeamRank({index: index, value: text})
    //     rosterChecker(prev => !prev)
    // }

    // function applyAttendancePoints(text){
    //     updateAttenanceMinutes({index: index, value: text})
    //     rosterChecker(prev => !prev)
    // }

    function convertAttendancePoints(text){
        const numericValue = parseInt(text)
        if(numericValue >= pointSystem.cafe_attendance.minimum){
            return pointSystem.cafe_attendance.present
        }
        return pointSystem.cafe_attendance.absent
    }

    const midContent = 
    <>
            <View style={styles.inputContainer}>
                <Text style={styles.standardText}>Attendance Minutes</Text>
                <TextInput 
                    value ={attendanceMinutes}
                    onChangeText = {(text) =>  {
                        if(!isNaN(text)) { 
                            setAttendanceMinutes(text)
                            setAttendancePoints(convertAttendancePoints(text))
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
                {/* <TextInput 
                    value ={quizScore}
                    onChangeText = {(text) =>  {
                        if(!isNaN(text)) { 
                            setQuizScore(text)
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
                /> */}
                <Dropdown
                mode="modal"
                style={styles.dropDown}
                placeholderStyle={styles.dropPlaceholder}
                selectedTextStyle={styles.dropTextStyle}
                inputSearchStyle={[styles.dropInputSearchStyle, {borderColor: "magenta"}]}
                iconStyle={styles.dropIconStyle}
                data={pointSystem.quiz}
                containerStyle={styles.dropListContainer}
                labelField="label"
                valueField="value"
                placeholder={shallowScoreTracker.quizScore === 0? "Select" : quizScore}
                searchPlaceholder="Search..."
                itemTextStyle={styles.dropItemText}
                itemContainerStyle={[styles.dropItemContainer]}
                value={quizScore}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setQuizScore(item.label)
                    setQuizPercentage(item.percentage)
                    setQuizPoints(item.value)
                }}
                
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.standardText}>Team Rank</Text>
                
                <Dropdown
                mode="modal"
                style={styles.dropDown}
                placeholderStyle={styles.dropPlaceholder}
                selectedTextStyle={styles.dropTextStyle}
                inputSearchStyle={[styles.dropInputSearchStyle, {borderColor: "magenta"}]}
                iconStyle={styles.dropIconStyle}
                data={pointSystem.teams}
                containerStyle={styles.dropListContainer}
                labelField="label"
                valueField="value"
                placeholder={shallowScoreTracker.teamRank === 0? "Select" : teamRank}
                searchPlaceholder="Search..."
                itemTextStyle={styles.dropItemText}
                itemContainerStyle={[styles.dropItemContainer]}
                value={teamRank}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setTeamRank(item.label)
                    setTeamPoints(item.value)
                    // setIsFocus(false)
                }}
                
                />
            </View>
            <ModularButton 
                textSize={converter(width/20)} 
                onPress={()=>{submitHandler(currentMonth, shallowScoreTracker)}} 
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


