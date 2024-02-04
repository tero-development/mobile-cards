import {View,  KeyboardAvoidingView, Platform, useWindowDimensions} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState, useContext } from 'react'
import { SignInContext } from '../store/signin-context'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import Title from '../UI/Title'
import LabeledInput from '../components/LabeledInput'
import ModularLink from '../components/ModularLink'
import ModularButton from '../components/ModularButton'
import {converterSetup, useStyles} from '../utils/dimensions'
import { updateCredentials, clearErrorHandler, colorHandler, errorFormatHandler } from '../utils/inputErrorDetection'
import { verifyCredentials } from '../httpServices/credentials'
import { searchEmployee } from '../httpServices/employees'
import ErrorOverlay from '../UI/ErrorOverlay'
import Loader from '../UI/Loader'
import Logo from '../UI/Logo'


const SignIn = ({navigation, route}) =>{
    const{
        credentials,
        updatePassword,
        updateEmail,
    } = useContext(SignInContext)
    const [isError, setIsError] = useState(false)
    const [errorType, setErrorType] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        rootScreen:{
            flex: 1,
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

    const signInCredentials = {
        email: credentials.email, 
        password: credentials.password
    }
    
    const employee = route.params

    const {email, password} = {...signInCredentials}

    const navigateSplashScreen = () =>{
        updatePassword('')
        navigation.navigate('SplashScreen')
    }

    const navigateHome = () =>{
        updatePassword('')
        navigation.navigate('DrawerGroup')
    }   

    const navigateForgot = () =>{
        updatePassword('')
        navigation.navigate('ForgotPassword', employee)
    }   

    function updateHandler(enteredText, updater){
        updateCredentials(enteredText, errorType, errorMessage, setErrorType, setErrorMessage, updater)
    }

    const validationGroup = [

    ]
    
   
    
    async function submitHandler(){
        setIsLoading(true)
        try{
            const employeeResponse = await searchEmployee(email)
            if(employeeResponse){
                if(employeeResponse._id === employee._id){
                    try{
                        const response = await verifyCredentials({employeeId: employee._id, password: password})
                        if(response._id){
                            setIsLoading(false)
                            navigateHome()
                        } else{
                            setIsLoading(false)
                            setErrorMessage('incorrect user or password')
                            setIsError(true)
                        }
                    } catch(e){
                        setIsLoading(false)
                        alert(e)
                        return
                    }
                } else{
                    setIsLoading(false)
                    setErrorMessage('incorrect user or password')
                    setIsError(true)
                }
            }

            
        } catch(e){
            setIsLoading(false)
            alert(e)
            return
        }
    }

    const midContent = 
    <View style={styles.signInContainer}>
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
        <LabeledInput 
            label={'Password'} 
            color={colorHandler(errorType, [], password)}
            type='password'
            textInputConfig={{
                value: password,
                onChangeText:(text) => updateHandler( text, updatePassword),
                autoCorrect: false
            }}   
        />
        
        <ModularButton
                    style={{
                        marginTop: converter(height/60, height/60, height/60)
                    }}
                    textColor={'white'}
                    buttonColor={Colors.accentColor}
                    rippleColor={Colors.secondaryColor}
                    onPress={()=>errorFormatHandler(signInCredentials, validationGroup, submitHandler, setErrorType, setErrorMessage, setIsError)}
                >   
                    Sign In
        </ModularButton>
        <ModularLink 
            textColor={Colors.secondaryColor} 
            viewStyle={{marginBottom: width/30}}
            onPress={navigateForgot}
        >
            Forgot Password
        </ModularLink>
        <Title color={Colors.accentColor} textSize={converter(width/35, width/30, width/35)}>Need help? Email swells@tero.com</Title>

    </View>

    if(isError){
        return <ErrorOverlay message={errorMessage} onPress={()=>{clearErrorHandler(setIsError)}}/>
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
            <LinearGradient style={styles.rootScreen}  colors={[Colors.highlightColor, Colors.primaryColor]}>
                <View style={styles.container}>
                <IconButton isHeader={false} iconName='close' iconColor={Colors.secondaryColor} onPress={navigateSplashScreen} viewStyle={{position: 'absolute', left: width/20, top: height/10, zIndex: 1}}/>
                 <Logo />
           
                    <View >
                        <Title color={Colors.secondaryColor} textSize={converter(width/16, width/14, width/16)} style={{marginBottom: height/20, textAlign: 'center'}}>Sign In</Title>
                        {isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent}
                    </View>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
        
    )
}

export default SignIn