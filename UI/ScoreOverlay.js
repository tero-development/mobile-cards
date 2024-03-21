import {KeyboardAvoidingView,View, Text, useWindowDimensions} from 'react-native'
import { useState } from 'react'
import Colors from '../utils/colors'
import ModularButton from '../components/ModularButton'
import  {converterSetup,useStyles} from '../utils/dimensions'
import Loader from './Loader'

const ScoreOverlay = ({closeFunction}) =>{
    const [code, setCode] = useState('')
    const [codeError, setCodeError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
        text:{
            textAlign: 'center',
            color: Colors.secondaryColor,
            marginBottom: height/30,
            fontSize: converter(width/30, width/25, width/35, width/35),
            width: converter(width/2, width/1.5, width/1.9, width/2)
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
            marginBottom: height / 100,
            color: Colors.secondaryColor
        },
        input:{
            backgroundColor: Colors.highlightColor,
            height: converter(width/12.5),
            width: converter(width/12.5),
            paddingLeft: converter(width/50),
            fontSize: width/30,
            borderRadius: converter(width/75)
        },
    }

    const styles = useStyles(localStyles)

    function setCodeErrorHandler(){
        setCodeError(true)
    }

    
    function codeInputHandler(enteredText){
        if(codeError){
            setCodeError(false)
        }
        const newText = enteredText.replace(/[^0-9]/g, '')
        setCode(newText)
    }

    const midContent = 
    <>
            
            <TextInput 
                value ={"quizScore"}
                onChangeText = {(text) =>  {
                    // if(!isNaN(text)) { 
                    //     setQuizScore(text)
                    //     const numericValue = parseInt(text)
                    //     setQuizPoints(numericValue)
                    // } 
                }}
                placeholder=''
                autoCorrect = {true}
                autoCapitalize = "none"
                style={styles.input}
                keyboardType= 'number-pad'
                maxLength = {2}
            />
            <TextInput 
                value ={"quizScore"}
                onChangeText = {(text) =>  {
                    // if(!isNaN(text)) { 
                    //     setQuizScore(text)
                    //     const numericValue = parseInt(text)
                    //     setQuizPoints(numericValue)
                    // } 
                }}
                placeholder=''
                autoCorrect = {true}
                autoCapitalize = "none"
                style={styles.input}
                keyboardType= 'number-pad'
                maxLength = {2}
            />
            <TextInput 
                value ={"teamScore"}
                onChangeText = {(text) =>  {
                    // if(!isNaN(text)) { 
                    //     setTeamScore(text); 
                    //     const numericValue = parseInt(text)
                    //     setTeamPoints(numericValue)
                    // } 
                }}  
                autoCorrect = {true}
                autoCapitalize = "none"
                style={styles.input}
                keyboardType= 'number-pad'
                maxLength={2}
            />
            <ModularButton onPress={navigation} buttonColor={Colors.accentColor400} textColor={Colors.highlightColor} rippleColor={Colors.secondaryColor400}>Submit code</ModularButton>
            <ModularButton onPress={closeFunction} buttonColor={Colors.accentColor} textColor={Colors.highlightColor} rippleColor={Colors.secondaryColor}>close</ModularButton>
            
    </>

    // async function submitHandler(){

    // }

    return (
        <KeyboardAvoidingView behavior='height' style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.title}>Enter Scores</Text>
                <Text style={[styles.text, styles.topText]}>for participant _blank_</Text>
                {/* {isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent} */}
                {midContent}
            </View>
        </KeyboardAvoidingView>

    )
    
}

export default ScoreOverlay

