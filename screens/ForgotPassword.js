import {View, StyleSheet, Image, KeyboardAvoidingView, useWindowDimensions} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState, useContext } from 'react'
import { SignInContext } from '../store/signin-context'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import Title from '../UI/Title'
import LabeledInput from '../components/LabeledInput'
import ModularButton from '../components/ModularButton'
import ModularLink from '../components/ModularLink'
import  {converterSetup, useStyles} from '../utils/dimensions'
import { updateCredentials, clearErrorHandler, colorHandler, errorFormatHandler } from '../utils/inputErrorDetection'
import ErrorOverlay from '../UI/ErrorOverlay'
import ForgotOverlay from '../UI/ForgotOverlay'
import { sendResetEmail } from '../httpServices/email'
import Loader from '../UI/Loader'
import Logo from '../UI/Logo'

const ForgotPassword = ({navigation, route}) =>{
    const{
        credentials,
        updateEmail
    } = useContext(SignInContext)
    const [isError, setIsError] = useState(false)
    const [errorType, setErrorType] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isCodeField, setIsCodeField] = useState(false)
    const [directSend, setDirectSend] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        rootScreen:{
            flex: 1
        },
        container:{ 
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',    
            paddingVertical: height/10*2    
        },
        signInContainer:{
            alignItems: 'center'
        }
    }

    const styles = useStyles(localStyles)

    function generateCode(){
        return Math.floor(100000 + Math.random() * 900000)
    }

    const employee = route.params

    
    const emailCredential = {
        email: credentials.email
    }

    const {email} = {...emailCredential}


    function navigateSignIn(){
        navigation.navigate('SignIn', employee)
    }

    function navigateResetPassword(){
        navigation.navigate('ResetPassword')
    } 
    
    function codeOverlayHandler(){
        setIsCodeField(prev => !prev)
    }

    function sendDirectHandler(){
        setDirectSend(false)
        codeOverlayHandler()
    }

    function updateHandler(enteredText, updater){
        updateCredentials(enteredText, errorType, errorMessage, setErrorType, setErrorMessage, updater)
    }

    const validationGroup = [
        
    ]
    
    async function submitHandler(){
        setIsLoading(true)
        try{
            const code = generateCode()
            const response = await sendResetEmail(email, code)
            if(response){
                setIsLoading(false)
                setDirectSend(true)
                setIsCodeField(true)
            }
        }catch(e){
            setIsLoading(false)
            alert(e.message)
        }
    }

    const midContent = <View style={styles.signInContainer}>
    <LabeledInput 
        label={'Email'} 
        color={colorHandler(errorType, [], email)}
        textInputConfig={{
            value: email,
            onChangeText:(text) => updateHandler( text, updateEmail),
            autoCorrect: false, 
            autoCapitalize:'words'
        }}   
    />
    
    <ModularButton
           
                textColor={'white'}
                buttonColor={Colors.accentColor}
                rippleColor={Colors.secondaryColor}
                onPress={()=>errorFormatHandler(emailCredential, validationGroup, submitHandler, setErrorType, setErrorMessage, setIsError)}
            >   
                Submit Email 
    </ModularButton>
    <ModularLink textColor={Colors.secondaryColor} onPress={codeOverlayHandler}>
        Already have a code?
    </ModularLink>
</View>

    if(isError){
        return <ErrorOverlay message={errorMessage} onPress={()=>{clearErrorHandler(setIsError)}}/>
    }

    if(isCodeField){
        return <ForgotOverlay directSend={directSend} closeFunction={sendDirectHandler} passedEmail={email} navigation={navigateResetPassword}/>
    }

    return(
        <KeyboardAvoidingView behavior='height' style={styles.rootScreen}>
            <LinearGradient style={styles.rootScreen}  colors={[Colors.highlightColor, Colors.primaryColor]}>
                <View style={styles.container}>
                <IconButton isHeader={false} iconName='close' iconColor={Colors.secondaryColor} onPress={navigateSignIn} viewStyle={{position: 'absolute', left: width/20, top: height/10, zIndex: 1}}/>
                    <Logo />
                    <Title color={Colors.secondaryColor} textSize={converter(width/16, width/14, width/16, width/16)} style={{marginBottom: height/20, textAlign: 'center'}}>Forgot Password?</Title>
                    {isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent}
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
        
    )
}


export default ForgotPassword