import {View, KeyboardAvoidingView, Text, Pressable, useWindowDimensions} from 'react-native'
import { useState, useEffect, useContext } from 'react'
import {SignInContext} from '../store/signin-context'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../utils/colors'
import Title from '../UI/Title'
import {converterSetup, useStyles} from '../utils/dimensions'
import LabeledInput from '../components/LabeledInput'
import DropdownComponent from '../components/DropdownComponent'
import IconButton from '../UI/IconButton'
import LabeledPhoneInput from '../components/LabeledPhoneInput'
import ModularButton from '../components/ModularButton'
import ErrorOverlay from '../UI/ErrorOverlay'
// import { CompanyContext } from '../store/company-context'
import {verifyPhoneHandler, verifyEmailHandler} from '../utils/helperFunctions'
import { updateCredentials, clearErrorHandler, colorHandler, errorFormatHandler } from '../utils/inputErrorDetection'
import { sendCredentials } from '../httpServices/credentials'
import { postNewEmployee } from '../httpServices/employees'
import { getCompany } from '../httpServices/companies'
import { getContact, postContact, updateContact } from '../httpServices/HBcontacts'
import Loader from '../UI/Loader'



const ContactInfoScreen = ({navigation}) =>{
    // const {updateCompany, updateCompanyClear} = useContext(CompanyContext) 
    const {
            credentials,
            updateFirstname,
            updateLastName,
            updateEmail,
            updateManagerEmail,
            updateIndustryYears,
            updateEmployeeTerritory,
            updatePhoneNumber,
            updateSignInClear
        } = useContext(SignInContext)
    const [isError, setIsError] = useState(false)
    const [errorType, setErrorType] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [disablePhone, setDisablePhone] = useState(false)
    const [companyTerritories, setCompanyTerritories] = useState([])
    const [companyIndustryYears, setCompanyIndustryYears] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const {
        password,
        confirmPassword,
        confirmEmail,
        company_id,
        employeeId,
        ...filteredCredentials
    } = {...credentials}

    const {
        firstName,
        lastName,
        email,
        managerEmail,
        industryYears,
        employeeTerritory,
        phoneNumber} = filteredCredentials

        const {width, height} = useWindowDimensions()

        const converter = converterSetup(width, height)
    
        const localStyles = {
            screen:{
                flex: 1
            },
            container:{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            innerContainer:{
                width: width,
                justifyContent: 'center',
                alignItems: 'center'
            },
            inputPairContainer:{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '95%'
            },
            inputStyle:{
                width: width/2.25,
            },
              dropStyle:{
                width: width/2.25,
                marginTop:converter(height/50, height/40, height/50)
              },
              phonePairContainer:{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: height/20,
                width: "95%"
            },
            phoneInput:{
                marginBottom:0
            },
            phoneToggle:{
                borderWidth: converter(1.5, 2, 3), 
                borderColor: Colors.secondaryColor, 
                borderRadius: converter(6, 8, 12),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                height: height /20,
                width: converter(width/2.5, width/3.75, width/2.5),
                paddingVertical: height / 150,
                paddingHorizontal: width / 1000,
            },
            phoneToggleText:{
                maxWidth: '45%',
                color: Colors.secondaryColor,
                fontWeight: 'bold',
                fontSize: converter(width/45, width/40, width/40)
            }
        }
    
        const styles = useStyles(localStyles)
    


    useEffect(()=>{
        async function retrieveCompany(id){
            try{
                const response = await getCompany(id)
                if(response){
                    setCompanyTerritories(response.territories.locations)
                    setCompanyIndustryYears(response.industryYears)
                }
            } catch(e){
                alert(e)
            }
        }

        retrieveCompany('62d47c7a36aeee14652966cd')
        return () =>{}
    },[])


    function togglePhoneHandler(){
        if(!disablePhone){
            updatePhoneNumber("opt-out")
            setDisablePhone(prev => !prev)
        } else{
            updatePhoneNumber("")
            setDisablePhone(prev => !prev)
        }
    }

    function navigateSplashScreen(){
        navigation.navigate('SplashScreen')
    }
    

    function updateHandler(enteredText, updater){
        updateCredentials(enteredText, errorType, errorMessage, setErrorType, setErrorMessage, updater)
    }

    
    
    const validationGroup = [
        {check: verifyEmailHandler(email), tag: 'email_invalid', message: 'Invalid email format'},
        {check: verifyEmailHandler(managerEmail), tag: 'managerEmail_invalid', message: 'Invalid manager email format'},
        {check: verifyPhoneHandler(phoneNumber), tag: 'phone_invalid', message: 'Invalid phone number length'},
    ]

    const validationGroupNoPhone = [
        {check: verifyEmailHandler(email), tag: 'email_invalid', message: 'Invalid email format'},
        {check: verifyEmailHandler(managerEmail), tag: 'managerEmail_invalid', message: 'Invalid manager email format'}
    ]


    // the company needs to be handled dynamically somehow

    async function submitHandler(){
        setIsLoading(true)
        
        try{
            const employeeResponse = await postNewEmployee({...credentials, company_id: '62d47c7a36aeee14652966cd', verified: true})
            const hbResponse = await getContact(email)
            if(hbResponse.total <  1){
                try{
                    const response = await postContact(credentials)
                    if(response){
                        updateSignInClear()
                        setIsLoading(false)
                        navigateSplashScreen()
                    }
                }catch(e){
                    alert(e)
                }
            } else{
                try{
                    const response = await updateContact({...credentials, contactId: hbResponse.results[0].id})
                    if(response){
                        updateSignInClear()
                        setIsLoading(false)
                        navigateSplashScreen()
                    }
                }catch(e){
                    alert(e)
                }
            }
            const response = await sendCredentials({password: password, companyId: '62d47c7a36aeee14652966cd', employeeId: employeeResponse.insertedId})
            if(response){
                updateSignInClear()
                setIsLoading(false)
                navigateSplashScreen()
            } else{
                alert('something went wrong! Try again')
            }
        } catch(e){
            setIsLoading(false)
            alert(e)
        }
    }

    const midContent = <View style={styles.innerContainer}>
    <View style={styles.inputPairContainer}>
        <LabeledInput 
            label={'First Name'}  
            style={styles.inputStyle}
            color={colorHandler(errorType, [], firstName)}
            textInputConfig={{
                value: firstName,
                onChangeText:(text) => updateHandler( text, updateFirstname),
                autoCorrect: false, 
                autoCapitalize:'words'
            }}   
        />
        <LabeledInput 
            label={'Last Name'}  
            style={styles.inputStyle}
            color={colorHandler(errorType, [], lastName)}
            textInputConfig={{
                value: lastName,
                onChangeText:(text) => updateHandler( text, updateLastName),
                autoCorrect: false, 
                autoCapitalize:'words'
            }}   
        />
    </View>
    <View style={styles.inputPairContainer}>
        <LabeledInput 
            label={'Email'} 
            color={colorHandler(errorType, ['email_invalid'], email)}
            style={styles.inputStyle} 
            textInputConfig={{
                value: email,
                onChangeText:(text) => updateHandler( text, updateEmail),
                autoCorrect: false, 
                autoCapitalize:'none'
            }}                             
        />
        <LabeledInput 
            label={"Manager's email"} 
            color={colorHandler(errorType, ['managerEmail_invalid'], managerEmail)}
            style={styles.inputStyle} 
            textInputConfig={{
                value: managerEmail,
                onChangeText:(text) => updateHandler( text, updateManagerEmail),
                autoCorrect: false, 
                autoCapitalize:'none'
            }}                             
        />
    </View>
    <View style={[styles.inputPairContainer]}>
        <DropdownComponent 
            data={companyIndustryYears} 
            mode='modal'
            dropStyle={styles.dropStyle}
            prompt='Years in Industry' 
            iconName='information-circle-outline'
            color={colorHandler(errorType, [], industryYears)}
            value={industryYears}
            updater={updateIndustryYears}
            valueSetter={updateHandler}
        />
        <DropdownComponent
            data={companyTerritories} 
            mode='modal'
            dropStyle={styles.dropStyle} 
            prompt='Commercial Unit' 
            iconName='information-circle-outline'
            color={colorHandler(errorType, [], employeeTerritory)}
            value={employeeTerritory}
            updater={updateEmployeeTerritory}
            valueSetter={updateHandler}
        />
    </View>
    <View style={[styles.phonePairContainer,  disablePhone && {justifyContent: 'center'}]}>
        <LabeledPhoneInput 
            label={"Phone Number"} 
            color={colorHandler(errorType, ['phone_invalid'], phoneNumber)}
            style={styles.phoneInput}
            visible={disablePhone}
            textInputConfig={{
                onChangeText:(text) => updateHandler( text, updatePhoneNumber),
                value: phoneNumber,
                textContentType:'telephoneNumber',
                dataDetectorTypes:'phoneNumber', 
                keyboardType:'phone-pad', 
                maxLength:14
            }}
        />


        <Pressable style={styles.phoneToggle} onPress={togglePhoneHandler}>
            <Text style={styles.phoneToggleText}>Opt in for texts</Text>
            <IconButton 
                isHeader={false} 
                iconName={!disablePhone? 'checkmark-circle-outline' : 'close-circle-outline'} 
                iconSize={converter(16, 20, 30)} 
                iconColor={Colors.secondaryColor}
                onPress={togglePhoneHandler} 
            />
        </Pressable>
    </View>
    <ModularButton 
         buttonColor={Colors.accentColor400} textColor={Colors.highlightColor} rippleColor={Colors.secondaryColor400}
        onPress={()=>{
            const {phoneNumber, ...credsWithOutPhone} = {...filteredCredentials}

            if(!disablePhone){
                errorFormatHandler(filteredCredentials, validationGroup, submitHandler, setErrorType, setErrorMessage, setIsError)
            } else{
                errorFormatHandler(credsWithOutPhone, validationGroupNoPhone, submitHandler, setErrorType, setErrorMessage, setIsError)
            }
        }}
    >
        Submit & Log In
    </ModularButton>
    <ModularButton onPress={navigateSplashScreen} buttonColor={Colors.accentColor} textColor={Colors.highlightColor} rippleColor={Colors.secondaryColor}>cancel</ModularButton>
    </View>

    if(isError){
        return <ErrorOverlay  message={errorMessage} onPress={()=>{clearErrorHandler(setIsError)}}/>
    }

    return(
        <KeyboardAvoidingView behavior='height' style={styles.screen}>
            <LinearGradient style={styles.screen} colors={['white', Colors.primaryColor]}>
            <View style={styles.container}>
                <View>
                <Title color={Colors.secondaryColor} textSize={converter(width/28, width/24, width/26)} style={{marginBottom: height/20, textAlign: 'center'}}>
                        Fill out all fields to create your ExSell profile
                    </Title>
                    {isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent}
                </View>
            </View>
        </LinearGradient >
        </KeyboardAvoidingView>
        
    )
}


export default ContactInfoScreen