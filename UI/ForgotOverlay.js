import {View, Text, useWindowDimensions} from 'react-native'
import { useState } from 'react'
import Colors from '../utils/colors'
import ModularButton from '../components/ModularButton'
import DeviceFractions, {converterSetup,useStyles} from '../utils/dimensions'
import IconButton from './IconButton'
import LabeledInput from '../components/LabeledInput'
import { verifyReset } from '../httpServices/resets'
import Loader from './Loader'

const ForgotOverlay = ({directSend, closeFunction, passedEmail, navigation}) =>{
    const [code, setCode] = useState('')
    const [codeError, setCodeError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
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
            fontSize: 16,
            width: DeviceFractions.deviceWidth / 10 * 6
        },
        topText:{
            marginBottom: DeviceFractions.deviceHeight / 100,
        },
        errorText:{
            textAlign: 'center',
            color: Colors.errorColor,
            marginVertical: DeviceFractions.deviceHeight / 200,
            fontSize: 14,
            width: DeviceFractions.deviceWidth / 10 * 5
        },
        title:{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: DeviceFractions.deviceHeight / 100,
            color: Colors.secondaryColor
        }
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
            {codeError && <Text style={styles.errorText}>Check blank or code entries less than 6 digits</Text>}
            
            <LabeledInput 
                color={codeError? Colors.errorColor : Colors.secondaryColor}
                textInputConfig={{
                    value: code,
                    onChangeText:(text) => codeInputHandler(text),
                    autoCorrect: false, 
                    autoCapitalize:'words',
                    placeholder: '6-digit code',
                    placeholderTextColor: codeError? Colors.errorColor : Colors.secondaryColor,
                    keyboardType: 'numeric',
                    maxLength: 6
                }}   
             />
            <ModularButton onPress={submitHandler} buttonColor={Colors.accentColor400} textColor={Colors.highlightColor} rippleColor={Colors.secondaryColor400}>Submit code</ModularButton>
            <ModularButton onPress={closeFunction} buttonColor={Colors.accentColor} textColor={Colors.highlightColor} rippleColor={Colors.secondaryColor}>close</ModularButton>
            <Text style={styles.text}>Enter the 6 digit verification code provided in the email</Text>
            
    </>

    async function submitHandler(){
        if(code === "" || code.length < 6 ){
            setCodeErrorHandler()
            return
        }
        else{
            setIsLoading(true)
            try{
                const response = await verifyReset({email: passedEmail, code: parseInt(code)})
                if(response){
                    setCode('')
                    setIsLoading(false)
                    navigation()
                }
            } catch(e){
                setIsLoading(false)
                alert(e)
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Code</Text>
            {directSend && <Text style={[styles.text, styles.topText]}>A confirmation email was sent to {passedEmail}</Text>}
            {isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent}
        </View>
    )
    
}

export default ForgotOverlay

