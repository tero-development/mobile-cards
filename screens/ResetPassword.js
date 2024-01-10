import {View, StyleSheet,Image, KeyboardAvoidingView, Text, Alert} from 'react-native'
import { useState, useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Title from '../UI/Title'
import Colors from '../utils/colors'
import LabeledInput from '../components/LabeledInput'
import ModularLink from '../components/ModularLink'
import { SignInContext } from '../store/signin-context'
import DeviceFractions from '../utils/dimensions'
import { verifyPasswordHandler } from '../utils/helperFunctions'
import { replacePasswordCredentials } from '../httpServices/credentials'
import PasswordRules from '../components/CreateAccountComponents/PasswordRules'
import { updateCredentials, clearErrorHandler, colorHandler, errorFormatHandler } from '../utils/inputErrorDetection'
import ErrorOverlay from '../UI/ErrorOverlay'
import Loader from '../UI/Loader'

const ResetPassword = ({navigation, route}) =>{
    const {
        credentials,
        updatePassword,
        updateConfirmPassword,
        updateSignInClear
    } = useContext(SignInContext)
    const [isError, setIsError] = useState(false)
    const [errorType, setErrorType] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const passwordCredentials = {
        password: credentials.password,
        confirmPassword: credentials.confirmPassword
    }

    const {password, confirmPassword} = passwordCredentials

    function navigateSplashScreen(){
        navigation.navigate('SplashScreen')
    }
    

    const validationGroup = [
        {check: password === confirmPassword, tag: 'password_mismatch', message: 'Passwords do not match'},
        {check: verifyPasswordHandler(password), tag: 'password_invalid', message: 'Invalid password format'},
    ]


    async function submitHandler(){
        setIsLoading(true)
        try{
            const response = await replacePasswordCredentials({email: credentials.email, password: password})
            if(response){
                    updateSignInClear()
                    setIsLoading(false)
                    navigateSplashScreen()
            }
        } catch(e){
            setIsLoading(false)
            alert(e)
        }
    }

    function updateHandler(enteredText, updater){
        updateCredentials(enteredText, errorType, errorMessage, setErrorType, setErrorMessage, updater)
    }

    const midContent = 
    <View style={styles.innerContainer}>
            <PasswordRules />
            <LabeledInput 
                textInputConfig={{
                    value: credentials.password,
                    onChangeText: (text)=>{updateHandler(text, updatePassword)},
                    autoCorrect: false, 
                    autoCapitalize:'none'
                }} 
                label={'Password'} 
                color={colorHandler(errorType, ['password_invalid', 'password_mismatch'], password)} 
                style={{marginBottom: DeviceFractions.deviceH50}
                }/>
                <LabeledInput 
                textInputConfig={{
                    value: credentials.confirmPassword,
                    onChangeText: (text)=>{updateHandler(text, updateConfirmPassword)},
                    autoCorrect: false, 
                    autoCapitalize:'none'
                }} 
                label={'Confirm Password'} 
                color={colorHandler(errorType, [null, 'password_mismatch'], confirmPassword)}
                style={{marginBottom: DeviceFractions.deviceH50}
                }/>
                {/* <Text style={styles.returnText}>Email recognized! Create a password to finalize your account and retrieve your previous data</Text> */}

            <ModularLink
                textColor={Colors.secondaryColor}
                textSize={20}
                textWeight={'bold'}
                onPress={()=>{errorFormatHandler(passwordCredentials, validationGroup, submitHandler, setErrorType, setErrorMessage, setIsError)}}
                >
                Submit Password
            </ModularLink>     
    </View>

    if(isError){
        return <ErrorOverlay  message={errorMessage} onPress={()=>{clearErrorHandler(setIsError)}}/>
    }


    return(
    //If you experience issues with the KeyboardAvoidingView, a flex:1 ScrollView might work with
    //different behaviors
    <KeyboardAvoidingView behavior='height' style={styles.keyboardView}>
    <LinearGradient style={styles.gradient}  colors={['white', Colors.primaryColor]}>
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image style={{width:'100%', height:'100%'}} source={require('../assets/images/corteva-logo.png')} />
            </View>
            <Title color={'#016B72'} textSize={28} style={{marginBottom: DeviceFractions.deviceH50}}>Reset Your Password</Title>
            {isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent}
        </View>
    </LinearGradient>
    </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    keyboardView:{
        flex:1
    },
    gradient:{
        flex: 1,
        paddingBottom: DeviceFractions.deviceH10
    },
    container:{ 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer:{
        alignItems: 'flex-start',
        width: DeviceFractions.deviceWidth,
        paddingLeft: DeviceFractions.deviceW20,
        marginBottom: DeviceFractions.deviceH20
    },
    innerContainer:{
        alignItems: 'center'
    },
    imageWrapper:{
        width: 60,
        height: 75,
        marginBottom: DeviceFractions.deviceH50
    },

    returnText:{
        width: DeviceFractions.deviceWidth / 10 * 7,
        marginBottom: DeviceFractions.deviceH50,
        color: Colors.accentColor,
        fontSize: 16,
        textAlign: 'center'
    }
})

export default ResetPassword