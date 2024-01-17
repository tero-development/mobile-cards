import {StyleSheet, View, ImageBackground, Image, Text, KeyboardAvoidingView} from 'react-native'
import { useState, useContext, useEffect } from 'react'
import { SignInContext } from '../store/signin-context'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../utils/colors'
import Title from '../UI/Title'
import LabeledInput from '../components/LabeledInput'
import DeviceFractions from '../utils/dimensions'
import {searchEmployee} from '../httpServices/employees'
import {verifyEmailHandler} from '../utils/helperFunctions'
import { updateCredentials, clearErrorHandler, colorHandler, errorFormatHandler } from '../utils/inputErrorDetection'
import ModularLink from '../components/ModularLink'
import ErrorOverlay from '../UI/ErrorOverlay'
import Loader from '../UI/Loader'

//** IMPORTANT!
//The submitNavigationHandler function should make a call also
//that not only checks if the email exists or not, but if it's 
//on future Admin or Producer check list (an entity table of a
//single array document for each. (updated by an excel sheet)
//the call checks against that, not the employee object for the person
//that way if at anypoint the excel sheet is updated omitting the person
//the system will immediately change their status, which is what the
//kind of view of the app they have is dependant on)

const SplashScreen = ({navigation}) =>{
    const {
        credentials,
        updateEmail
    } = useContext(SignInContext)
    const [isError, setIsError] = useState(false)
    const [errorType, setErrorType] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const singleCredential = {
        email: credentials.email
    }

    const {email} = singleCredential


    const validationGroup = [
        {check: verifyEmailHandler(email), tag: 'email_invalid', message: 'Invalid email format'}
    ]

    function updateHandler(enteredText, updater){
        updateCredentials(enteredText, errorType, errorMessage, setErrorType, setErrorMessage, updater)
    }

    async function submitNavigationHandler(){
        setIsLoading(true)
        const employee = await searchEmployee(email)
        if(employee === 'not found'){
            setIsLoading(false)
            navigation.navigate("CreateAccount")
        } 
        else if(!employee.verified){
            setIsLoading(false)
            navigation.navigate('ConfirmAccount', employee)
        } 
        else{
            setIsLoading(false)
            navigation.navigate('SignIn', employee)
        }
    }

    const midContent = 
    <View style={styles.buttonTray}>
        <LabeledInput 
                label={''} 
                color={colorHandler(errorType, ['email_invalid'], email)}
                style={styles.input} 
                textInputConfig={{
                    value: email,
                    onChangeText:(text) => updateHandler( text, updateEmail),
                    placeholder: 'Enter email to begin',
                    autoCorrect: false, 
                    autoCapitalize:'none'
                }}                             
        />
        <ModularLink 
            textColor={Colors.secondaryColor}
            textSize={20}
            onPress={()=>{errorFormatHandler(singleCredential, validationGroup, submitNavigationHandler, setErrorType, setErrorMessage, setIsError)
            }}
        >
            start
        </ModularLink>
    </View>


    if(isError){
        return <ErrorOverlay  message={errorMessage} onPress={()=>{clearErrorHandler(setIsError)}}/>
    }


    return(
        <KeyboardAvoidingView behavior='height' style={styles.screen}>
            <LinearGradient 
                style={styles.imageTop} 
                colors={['white', Colors.primaryColor]}
                locations={[0.2, 0.6]}
            >
                <ImageBackground 
                    // source={require('../assets/images/competency-cover.jpg')}
                    source={require('../assets/images/2024-corteva-splash-image.jpg')}
                    resizeMode='cover'
                    style={styles.image}
                    imageStyle={styles.imageBackground}
                />
            </LinearGradient>
            <LinearGradient style={styles.tempGradient} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <View style={styles.pageBottom}>
                <View style={styles.titleLine}>
                    {/* <Title textSize={28} color={Colors.secondaryColor}>ExSell</Title> */}
                    <View style={styles.iconContainer}>
                        {/* <Image style={{width: '100%', height: '100%'}} source={require('../assets/images/corteva-logo.png')} /> */}
                        <Image style={{width: DeviceFractions.deviceH10, height: DeviceFractions.deviceH10}} source={require('../assets/images/ExSell_logo_vertical_color.png')} />

                    </View>
                </View>
                    {
                        isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent
                    }
                <View style={
                    [
                        styles.titleLine, 
                        {
                            flexDirection: 'column', 
                            width:'60%'
                        }
                    ]}
                >
                        <Text style={{color: Colors.accentColor}}>Powered by</Text>
                        <Title textSize={20} color={Colors.secondaryColor}>Tero International Inc.</Title>  
                    {/* <View style={styles.iconContainer}>
                        <Image style={{width: '100%', height: '100%', borderRadius: 100}} source={require('../assets/images/tero-logo.png')} />
                    </View> */}
                </View>
            </View>
            </LinearGradient>
            
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    imageTop:{
        flex: 1
    },
    tempGradient:{
        flex: 2
    },
    pageBottom:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    image:{
        flex: 1,
    },
    imageBackground:{
        opacity: 1
    },
    titleLine:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer:{
  
    },
    buttonTray:{
        width: DeviceFractions.deviceWidth,
        alignItems: 'center',
        marginTop: '0%',
    },
    input:{
        fontSize: 18,
        color: Colors.secondaryColor,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colors.secondaryColor,
        paddingVertical: DeviceFractions.deviceHeight / 150,
        paddingHorizontal: DeviceFractions.deviceW30,
        width: DeviceFractions.deviceWidth / 10 * 6,
        marginBottom: DeviceFractions.deviceH50
    }
})

export default SplashScreen