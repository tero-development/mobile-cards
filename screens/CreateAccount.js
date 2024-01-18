import {View, StyleSheet,Image, KeyboardAvoidingView, Platform} from 'react-native'
import { useState, useContext } from 'react'
import { SignInContext } from '../store/signin-context'
import { LinearGradient } from 'expo-linear-gradient'
import Title from '../UI/Title'
import Colors from '../utils/colors'
import LabeledInput from '../components/LabeledInput'
import ModularLink from '../components/ModularLink'
import IconButton from '../UI/IconButton'
import DeviceFractions from '../utils/dimensions'
import ErrorOverlay from '../UI/ErrorOverlay'
import { verifyPasswordHandler,  verifyEmailHandler } from '../utils/helperFunctions'
import PasswordRules from '../components/CreateAccountComponents/PasswordRules'
import { updateCredentials, colorHandler, clearErrorHandler, errorFormatHandler} from '../utils/inputErrorDetection'


const CreateAccount = ({navigation, route}) =>{
    const {
        credentials,
        updateEmail,
        updateConfirmEmail,
        updatePassword,
        updateConfirmPassword,
    } = useContext(SignInContext)
    const [isError, setIsError] = useState(false)
    const [errorType, setErrorType] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    let {
        firstName,
        lastName,
        managerEmail,
        industryYears,
        employeeTerritory,
        phoneNumber,
        company_id,
        employeeId,
        ...fitleredCredentials

    } = {...credentials}

    let {email, confirmEmail, password, confirmPassword} = fitleredCredentials
    

    function navigateSplashScreen(){
        navigation.navigate('SplashScreen')
    }
    
    function navigateContactInfo(){
        navigation.navigate('ContactInfo')
    }

    function updateHandler(enteredText, updater){
        updateCredentials(enteredText, errorType, errorMessage, setErrorType, setErrorMessage, updater)
    }


    const validationGroup = [
        {check: password === confirmPassword, tag: 'password_mismatch', message: 'Passwords do not match'},
        {check: email === confirmEmail, tag: 'email_mismatch', message: 'Emails do not match'},
        {check: verifyPasswordHandler(password), tag: 'password_invalid', message: 'Invalid password format'},
        {check: verifyEmailHandler(email), tag: 'email_invalid', message: 'Invalid email format'},
    ]

   
  
    if(isError){
        return <ErrorOverlay  message={errorMessage} onPress={()=>{clearErrorHandler(setIsError)}}/>
    }


    return(
    //If you experience issues with the KeyboardAvoidingView, a flex:1 ScrollView might work with
    //different behaviors
    <KeyboardAvoidingView behavior='height' style={styles.keyboardView}>
    <LinearGradient style={styles.gradient}  colors={['white', Colors.primaryColor]}>
        <View style={styles.container}>
        <IconButton isHeader={true} iconName='close' iconSize={28} iconColor={Colors.accentColor} onPress={navigateSplashScreen} viewStyle={{marginBottom: DeviceFractions.deviceH20}}/>
            <View style={styles.imageWrapper}>
                <Image style={{width:'100%', height:'100%'}} source={require('../assets/images/ExSell_logo_vertical_color.png')} />
            </View>
            <Title color={'#016B72'} textSize={28} style={{marginBottom: DeviceFractions.deviceH40}}>Create Your Account</Title>
            <PasswordRules />
            <LabeledInput 
                textInputConfig={{
                    value: email,
                    onChangeText: (text)=>{updateHandler(text, updateEmail)},
                    autoCorrect: false, 
                    autoCapitalize:'none'
                }} 
                label={'Email'} 
                color={colorHandler(errorType, ['email_invalid', 'email_mismatch'], email)}
                style={{marginBottom: DeviceFractions.deviceH50}
                }/>
            <LabeledInput textInputConfig={{
                    value: confirmEmail,
                    onChangeText:(text) => updateHandler( text, updateConfirmEmail),
                    autoCorrect: false, 
                    autoCapitalize:'none'
                }}
                label={'Confirm Email'} 
                color={colorHandler(errorType, [null, 'email_mismatch'], confirmEmail)} 
                style={{marginBottom: DeviceFractions.deviceH50}}
            />
            <LabeledInput 
                textInputConfig={{
                    value: password,
                    onChangeText:(text) => updateHandler( text, updatePassword),
                    autoCorrect: false, 
                    autoCapitalize:'none'
                }} 
                label={'Password'} 
                color={colorHandler(errorType, ['password_invalid', 'password_mismatch'], password)} 
                style={{marginBottom: DeviceFractions.deviceH50}}
                type="password"
                />
                <LabeledInput 
                textInputConfig={{
                    value: confirmPassword,
                    onChangeText:(text) => updateHandler( text, updateConfirmPassword),
                    autoCorrect: false, 
                    autoCapitalize:'none'
                }} 
                label={'Confirm Password'} 
                color={colorHandler(errorType, [null, 'password_mismatch'], confirmPassword)}
                style={{marginBottom: DeviceFractions.deviceH50}}
                type="password"
                />
            <ModularLink
                textColor={Colors.secondaryColor}
                textSize={20}
                textWeight={'bold'}
                onPress={()=>{errorFormatHandler(fitleredCredentials, validationGroup, navigateContactInfo, setErrorType, setErrorMessage, setIsError)}}
                >
                Next
            </ModularLink>
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
    
    imageWrapper:{
        width: 60,
        height: 75,
        marginBottom: DeviceFractions.deviceH50
    }
})

export default CreateAccount