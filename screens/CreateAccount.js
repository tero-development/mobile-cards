import {View, Image, KeyboardAvoidingView, useWindowDimensions} from 'react-native'
import { useState, useContext } from 'react'
import { SignInContext } from '../store/signin-context'
import { LinearGradient } from 'expo-linear-gradient'
import Title from '../UI/Title'
import Colors from '../utils/colors'
import LabeledInput from '../components/LabeledInput'
import ModularLink from '../components/ModularLink'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'
import ErrorOverlay from '../UI/ErrorOverlay'
import { verifyPasswordHandler,  verifyEmailHandler } from '../utils/helperFunctions'
import PasswordRules from '../components/CreateAccountComponents/PasswordRules'
import { updateCredentials, colorHandler, clearErrorHandler, errorFormatHandler} from '../utils/inputErrorDetection'
import Logo from '../UI/Logo'


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
    //to help with keyboardavoiding view messing up small screens. Applied to all fields
    //only applies extra margin bottom to the ModularLink titled "next"
    //when the fields aren't focused the style is inactive therefore keeping consistent look
    //with other sizes
    const [extend, setExtend] = useState(false)

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        screen:{
            flex: 1
        },
        container:{ 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
    }

    const styles = useStyles(localStyles)

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
    <KeyboardAvoidingView behavior='height' style={styles.screen}>
    <LinearGradient style={styles.screen}  colors={['white', Colors.primaryColor]}>
        <View style={styles.container}>
        <IconButton isHeader={false} iconName='close' iconColor={Colors.secondaryColor} onPress={navigateSplashScreen} viewStyle={{position: 'absolute', left: width/20, top: height/10, zIndex: 1}}/>
            <Logo />
            <Title color={Colors.secondaryColor} textSize={converter(width/16, width/14, width/16, width/18)} style={{marginBottom: height/40, textAlign: 'center'}}>Create Your Account</Title>
            <PasswordRules />
            <LabeledInput 
                textInputConfig={{
                    value: email,
                    onChangeText: (text)=>{updateHandler(text, updateEmail)},
                    autoCorrect: false, 
                    autoCapitalize:'none',
                    onFocus:()=>{setExtend(true)}
                }} 
                label={'Email'} 
                color={colorHandler(errorType, ['email_invalid', 'email_mismatch'], email)}
                />
            <LabeledInput textInputConfig={{
                    value: confirmEmail,
                    onChangeText:(text) => updateHandler( text, updateConfirmEmail),
                    autoCorrect: false, 
                    autoCapitalize:'none',
                    onFocus:()=>{setExtend(true)}
                }}
                label={'Confirm Email'} 
                color={colorHandler(errorType, [null, 'email_mismatch'], confirmEmail)} 
            />
            <LabeledInput 
                textInputConfig={{
                    value: password,
                    onChangeText:(text) => updateHandler( text, updatePassword),
                    autoCorrect: false, 
                    autoCapitalize:'none',
                    onFocus:()=>{setExtend(true)}
                }} 
                label={'Password'} 
                color={colorHandler(errorType, ['password_invalid', 'password_mismatch'], password)} 
                type="password"
                />
                <LabeledInput 
                textInputConfig={{
                    value: confirmPassword,
                    onChangeText:(text) => updateHandler( text, updateConfirmPassword),
                    autoCorrect: false, 
                    autoCapitalize:'none',
                    onFocus:()=>{setExtend(true)}
                }} 
                label={'Confirm Password'} 
                color={colorHandler(errorType, [null, 'password_mismatch'], confirmPassword)}
                type="password"
                />
            <ModularLink
                viewStyle={extend && {marginBottom: converter(height/8, 0, 0)}}
                textColor={Colors.secondaryColor}
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


export default CreateAccount