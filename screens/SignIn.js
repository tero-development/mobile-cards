import {View, StyleSheet, Image, KeyboardAvoidingView, Platform, useWindowDimensions} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState, useContext } from 'react'
import { SignInContext } from '../store/signin-context'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import Title from '../UI/Title'
import LabeledInput from '../components/LabeledInput'
import ModularLink from '../components/ModularLink'
import ModularButton from '../components/ModularButton'
import DeviceFractions, {converterSetup, useStyles} from '../utils/dimensions'
import { updateCredentials, clearErrorHandler, colorHandler, errorFormatHandler } from '../utils/inputErrorDetection'
import { verifyCredentials } from '../httpServices/credentials'
import { searchEmployee } from '../httpServices/employees'
import ErrorOverlay from '../UI/ErrorOverlay'
import Loader from '../UI/Loader'


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
            paddingBottom: DeviceFractions.deviceHeight/10*2    
        },
        imageWrapper:{
            width: 60,
            height: 75,
            marginBottom: DeviceFractions.deviceH50
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
            // style={{marginBottom: DeviceFractions.deviceH50}}
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
            // style={{marginBottom: DeviceFractions.deviceH50}}
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
                        backgroundColor: Colors.secondaryColor,
                        marginTop: converter(height/50, height/50, height/50)
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
            viewStyle={{marginBottom: DeviceFractions.deviceH30}}
            onPress={navigateForgot}
        >
            Forgot Password
        </ModularLink>
    </View>

    if(isError){
        return <ErrorOverlay message={errorMessage} onPress={()=>{clearErrorHandler(setIsError)}}/>
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
            <LinearGradient style={styles.rootScreen}  colors={[Colors.highlightColor, Colors.primaryColor]}>
                <View style={styles.container}>
                    <IconButton isHeader={true} iconName='close' iconSize={28} iconColor={Colors.accentColor} onPress={navigateSplashScreen} viewStyle={{marginBottom: DeviceFractions.deviceH20}}/>
                    <View style={styles.imageWrapper}>
                        <Image style={{width:'100%', height:'100%'}} source={require('../assets/images/ExSell_logo_vertical_color.png')} />
                    </View>
                    <View >
                        <Title color={Colors.secondaryColor} textSize={28} style={{marginBottom: DeviceFractions.deviceH20, textAlign: 'center'}}>Sign In</Title>
                        {isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent}
                    </View>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
        
    )
}

export default SignIn