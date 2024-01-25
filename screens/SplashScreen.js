import {
    StyleSheet, 
    View, 
    ImageBackground, 
    Image, 
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
import DeviceFractions from '../utils/dimensions'
import {searchEmployee} from '../httpServices/employees'
import { searchCompanyEmail } from '../httpServices/companies'
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

    const styles = useStyles()

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
            textSize={DeviceFractions.deviceWidth/ 25}
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
                    source={require('../assets/images/2024-corteva-splash-image.jpg')}
                    resizeMode='cover'
                    style={styles.image}
                    imageStyle={styles.imageBackground}
                />
            </View>
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
                        <Text style={{color: Colors.accentColor, fontSize: DeviceFractions.deviceW40}}>Powered by</Text>
                        <Title textSize={DeviceFractions.deviceWidth / 25} color={Colors.secondaryColor}>Tero International Inc.</Title>  
                    {/* <View style={styles.iconContainer}>
                        <Image style={{width: '100%', height: '100%', borderRadius: 100}} source={require('../assets/images/tero-logo.png')} />
                    </View> */}
                </View>
            </View>
            </LinearGradient>
            
        </KeyboardAvoidingView>
    )
}


function useStyles(){
    const {width, height} = useWindowDimensions()
    console.log("height: "+height)
    console.log("width "+width)

        function converter(style1, style2, style3){
            let style
            if(width < 400){
                style = style1
                return style
            }
            if(width < 600){
                style = style2
                return style
            }
            // if(width < 750){
            //     style = style3
            //     return style
            // }
            if(width < 900){
                style = style3
                return style
            }
            else{
                style = style1
                return style
            }
        
    }

    return StyleSheet.create({
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
            flex: 1
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
            fontSize: converter(width/30, width/25, width/30),
            paddingVertical: converter(height/125, height/100, height/100),
            paddingHorizontal: converter(width/30, width/30, width/30),
            width: converter(width/10*4.5, width/10*5.5, width/10* 4),
            marginBottom:converter(width/50, width/20)
        }
    })
}

export default SplashScreen
    
