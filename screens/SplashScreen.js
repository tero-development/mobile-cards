import {
    View, 
    ImageBackground, 
    Text, 
    KeyboardAvoidingView, 
    Platform,
    useWindowDimensions
} from 'react-native'
import { useState, useContext} from 'react'
import { SignInContext } from '../store/signin-context'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../utils/colors'
import Title from '../UI/Title'
import LabeledInput from '../components/LabeledInput'
import  {converterSetup, useStyles} from '../utils/dimensions'
import {searchEmployee} from '../httpServices/employees'
import { searchCompanyEmail } from '../httpServices/companies'
import {verifyEmailHandler} from '../utils/helperFunctions'
import { updateCredentials, clearErrorHandler, colorHandler, errorFormatHandler } from '../utils/inputErrorDetection'
import ModularLink from '../components/ModularLink'
import ErrorOverlay from '../UI/ErrorOverlay'
import Loader from '../UI/Loader'
import Logo from '../UI/Logo'

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

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        screen:{
            flex: 1
        },
        imageTop:{
            flex: 1
        },
        tempGradient:{
            flex: 3
        },
        pageBottom:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        image:{
            flex: 1,
        },
        imageBackground:{
            opacity: 1
        },
        titleLine:{
            alignItems: 'center'
        },
        logoContainer:{
            alignItems: 'center'
        },
        buttonTray:{
            width: width,
            alignItems: 'center',
            marginTop: '0%',
        },
        // input:{
            
        // }
    }
 
    const styles = useStyles(localStyles)



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
        try{
           const company = await searchCompanyEmail(email)
           if(company._id){
                try{
                    const employee = await searchEmployee(email)
    
                    // if(employee === 'not found'){
                    //     setIsLoading(false)
                    //     navigation.navigate("CreateAccount")
                    // } 
                    // else if(!employee.verified){
                    //     setIsLoading(false)
                    //     navigation.navigate('ConfirmAccount', employee)
                    // } 
                    // else{
                    //     setIsLoading(false)
                    //     navigation.navigate('SignIn', employee)
                    // }
                    navigation.navigate("CreateAccount")

                } catch(e){
                    alert(e)
                    setIsLoading(false)
                }
           } else{
                setErrorMessage("Invalid company domain")
                setIsError(true)
                setIsLoading(false)
           }
        }catch(e){
            alert(e)
            setIsLoading(false)
        }
    }

    const midContent = 
    <View style={styles.buttonTray}>
        <LabeledInput 
                label={''} 
                color={colorHandler(errorType, ['email_invalid'], email)}
                // style={styles.input} 
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
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
            <View 
                style={styles.imageTop} 
            >
                <ImageBackground 
                    // source={require('../assets/images/competency-cover.jpg')}
                    source={require('../assets/images/corteva-blue.jpg')}
                    resizeMode='cover'
                    style={styles.image}
                    imageStyle={styles.imageBackground}
                />
            </View>
            <LinearGradient style={styles.tempGradient} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <View style={styles.pageBottom}>
                <View style={styles.titleLine}>
                    <View style={styles.logoContainer}>
                        <Logo />
                        {
                            isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent
                        }
                    </View>
                </View>
                    
                <View style={
                    [
                        styles.titleLine, 
                        {
                            flexDirection: 'column', 
                            width:'60%'
                        }
                    ]}
                >
                        <Text style={{color: Colors.accentColor, fontSize: converter(width/45, width/40, width/45)}}>Powered by</Text>
                        <Title color={Colors.secondaryColor} textSize={converter(width/35, width/30, width/35)}>Tero International Inc.</Title>  
                    {/* <View style={styles.logoContainer}>
                        <Image style={{width: '100%', height: '100%', borderRadius: 100}} source={require('../assets/images/tero-logo.png')} />
                    </View> */}
                </View>
            </View>
            </LinearGradient>
            
        </KeyboardAvoidingView>
    )
}




export default SplashScreen
    
