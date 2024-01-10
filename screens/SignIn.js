import {View, StyleSheet, Image, KeyboardAvoidingView} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState, useContext } from 'react'
import { SignInContext } from '../store/signin-context'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import Title from '../UI/Title'
import LabeledInput from '../components/LabeledInput'
import ModularLink from '../components/ModularLink'
import ModularButton from '../components/ModularButton'
import DeviceFractions from '../utils/dimensions'
import { updateCredentials, clearErrorHandler, colorHandler, errorFormatHandler } from '../utils/inputErrorDetection'
import { verifyCredentials } from '../httpServices/credentials'
import ErrorOverlay from '../UI/ErrorOverlay'
import Loader from '../UI/Loader'


const SignIn = ({navigation}) =>{
    const{
        credentials,
        updatePassword,
        updateEmail,
    } = useContext(SignInContext)
    const [isError, setIsError] = useState(false)
    const [errorType, setErrorType] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const signInCredentials = {
        email: credentials.email, 
        password: credentials.password
    }
    

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
        navigation.navigate('ForgotPassword')
    }   

    function updateHandler(enteredText, updater){
        updateCredentials(enteredText, errorType, errorMessage, setErrorType, setErrorMessage, updater)
    }

    const validationGroup = [

    ]
    
    
    async function submitHandler(){
        setIsLoading(true)
        try{
            const response = await verifyCredentials({email: email, password: password})
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
        }
    }

    const midContent = 
    <View style={styles.signInContainer}>
        <LabeledInput 
            label={'Email'} 
            style={{marginBottom: DeviceFractions.deviceH50}}
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
            style={{marginBottom: DeviceFractions.deviceH50}}
            color={colorHandler(errorType, [], password)}
            textInputConfig={{
                value: password,
                onChangeText:(text) => updateHandler( text, updatePassword),
                autoCorrect: false, 
                autoCapitalize:'words'
            }}   
        />
        <ModularLink 
            textColor={Colors.secondaryColor} 
            textSize={18} 
            viewStyle={{marginBottom: DeviceFractions.deviceH30}}
            onPress={navigateForgot}
        >
            Forgot Password
        </ModularLink>
        <ModularButton
                    style={{
                        width: DeviceFractions.deviceWidth/3 * 2,
                        height: 50,
                        backgroundColor: Colors.secondaryColor
                    }}
                    textSize={20}
                    textColor={'white'}
                    buttonColor={Colors.accentColor}
                    rippleColor={Colors.secondaryColor}
                    onPress={()=>errorFormatHandler(signInCredentials, validationGroup, submitHandler, setErrorType, setErrorMessage, setIsError)}
                >   
                    Sign In
        </ModularButton>
    </View>

    if(isError){
        return <ErrorOverlay message={errorMessage} onPress={()=>{clearErrorHandler(setIsError)}}/>
    }

    return(
        <KeyboardAvoidingView behavior='height' style={styles.rootScreen}>
            <LinearGradient style={styles.rootScreen}  colors={[Colors.highlightColor, Colors.primaryColor]}>
                <View style={styles.container}>
                    <IconButton isHeader={true} iconName='close' iconSize={28} iconColor={Colors.accentColor} onPress={navigateSplashScreen} viewStyle={{marginBottom: DeviceFractions.deviceH20}}/>
                    <View style={styles.imageWrapper}>
                        <Image style={{width:'100%', height:'100%'}} source={require('../assets/images/corteva-logo.png')} />
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

const styles = StyleSheet.create({
    rootScreen:{
        flex: 1
    },
    container:{ 
        flex: 1,
        alignItems: 'center',        
        paddingTop: DeviceFractions.deviceH20
    },
    imageWrapper:{
        width: 60,
        height: 75,
        marginBottom: DeviceFractions.deviceH50
    },
    signInContainer:{
        alignItems: 'center'
    }
})

export default SignIn