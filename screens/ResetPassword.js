import {View, KeyboardAvoidingView, useWindowDimensions} from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Title from '../UI/Title'
import Colors from '../utils/colors'
import LabeledInput from '../components/LabeledInput'
import ModularLink from '../components/ModularLink'
import { SignInContext } from '../store/signin-context'
import {converterSetup, useStyles} from '../utils/dimensions'
import { verifyPasswordHandler } from '../utils/helperFunctions'
import { sendCredentials } from '../httpServices/credentials'
import { searchEmployee } from '../httpServices/employees'
import PasswordRules from '../components/CreateAccountComponents/PasswordRules'
import { updateCredentials, clearErrorHandler, colorHandler, errorFormatHandler } from '../utils/inputErrorDetection'
import ErrorOverlay from '../UI/ErrorOverlay'
import Loader from '../UI/Loader'
import Logo from '../UI/Logo'

const ResetPassword = ({navigation}) =>{
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
    const [employeeId, setEmployeeId] = useState("")
    const [companyId, setCompanyId] = useState("")

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
        innerContainer:{
            alignItems: 'center'
        }
    }

    const styles = useStyles(localStyles)

    const passwordCredentials = {
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
        email: credentials.email
    }


    const {password, confirmPassword, email} = passwordCredentials

    function navigateSplashScreen(){
        navigation.navigate('SplashScreen')
    }
    
    useEffect(()=>{
        async function getIds(){
            try{
                const response = await searchEmployee(email)
                if(response){
                    setEmployeeId(response._id)
                    setCompanyId(response.company_id)
                }
            }
            catch(e){
                alert(e)
            }
        }
        if(email){
            getIds()
        }

        ()=>{}
    },[])


    const validationGroup = [
        {check: password === confirmPassword, tag: 'password_mismatch', message: 'Passwords do not match'},
        {check: verifyPasswordHandler(password), tag: 'password_invalid', message: 'Invalid password format'},
    ]


    async function submitHandler(){
        setIsLoading(true)
        try{
            const response = await sendCredentials({password: password, companyId: companyId, employeeId: employeeId})
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
                type="password" 
                label={'Password'} 
                color={colorHandler(errorType, ['password_invalid', 'password_mismatch'], password)} 
                style={{marginBottom: height/50}
                }/>
                <LabeledInput 
                textInputConfig={{
                    value: credentials.confirmPassword,
                    onChangeText: (text)=>{updateHandler(text, updateConfirmPassword)},
                    autoCorrect: false, 
                    autoCapitalize:'none'
                }}
                type="password" 
                label={'Confirm Password'} 
                color={colorHandler(errorType, [null, 'password_mismatch'], confirmPassword)}
                style={{marginBottom: height/50}
                }/>
            <ModularLink
                textColor={Colors.secondaryColor}
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
    <KeyboardAvoidingView behavior='height' style={styles.screen}>
    <LinearGradient style={styles.screen}  colors={['white', Colors.primaryColor]}>
        <View style={styles.container}>
            <Logo />
            <Title color={Colors.secondaryColor} textSize={converter(width/16, width/14, width/16, width/18)} style={{marginBottom: height/40, textAlign: 'center'}}>Reset Password</Title>
            {isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent}
        </View>
    </LinearGradient>
    </KeyboardAvoidingView>
        
    )
}


export default ResetPassword