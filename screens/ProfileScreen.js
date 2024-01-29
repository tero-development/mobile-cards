import {View, KeyboardAvoidingView, useWindowDimensions, Animated} from 'react-native'
import { useState, useEffect, useContext, useRef } from 'react'
import {SignInContext} from '../store/signin-context'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../utils/colors'
import Title from '../UI/Title'
import DeviceFractions, {converterSetup, useStyles} from '../utils/dimensions'
import IconButton from '../UI/IconButton'
import ErrorOverlay from '../UI/ErrorOverlay'
// import { CompanyContext } from '../store/company-context'
import {verifyPhoneHandler, verifyEmailHandler} from '../utils/helperFunctions'
import { updateCredentials, clearErrorHandler, colorHandler, errorFormatHandler } from '../utils/inputErrorDetection'
import { getCompany } from '../httpServices/companies'
import { updateEmployee } from '../httpServices/employees'
import { getContact, updateContact } from '../httpServices/HBcontacts'
import Loader from '../UI/Loader'
import _ from 'lodash'
import MidContent from '../components/ProfileComponents/MidContent'
import { Easing } from 'react-native-reanimated'



const ProfileScreen = ({navigation}) =>{
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
            updateAllCredentials
        } = useContext(SignInContext)
    const [isError, setIsError] = useState(false)
    const [errorType, setErrorType] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [disablePhone, setDisablePhone] = useState(false)
    const [companyTerritories, setCompanyTerritories] = useState([])
    const [companyIndustryYears, setCompanyIndustryYears] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [copyCredentials, setCopyCredentials] = useState({})
    const [isDifferent, setIsDifferent] = useState(false)

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        screen:{
            flex: 1
        },
        centeringContainer:{
            alignItems: 'center'
        },
        container:{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            width: DeviceFractions.deviceWidth * 2
        },
        screenHalf:{
            flex: 0.5,
        },
        innerContainer:{
            width: DeviceFractions.deviceWidth / 10 * 9,
            justifyContent: 'center',
            alignItems: 'center'
        },
        inputPairContainer:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%'
        },
        inputStyle:{
            width: DeviceFractions.deviceWidth / 10 * 4,
            height: DeviceFractions.deviceWidth / 10,
            marginBottom: DeviceFractions.deviceH40
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
          },
          dropDown:{
            marginTop: DeviceFractions.deviceH50,
            marginBottom: DeviceFractions.deviceHeight / 35
          },
          phonePairContainer:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '95%',
            marginBottom: DeviceFractions.deviceH20
        },
        phoneInput:{
            borderColor: Colors.secondaryColor,
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: DeviceFractions.deviceH50,
            width: "100%"
        },
        phoneToggle:{
            borderWidth: 2, 
            borderColor: Colors.secondaryColor, 
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: DeviceFractions.deviceHeight / 150,
            paddingHorizontal: DeviceFractions.deviceWidth / 1000
        },
        phoneToggleText:{
            maxWidth: '45%',
            color: Colors.secondaryColor,
            fontWeight: 'bold',
            fontSize: 12
        },
        loadingHeightContainer:{
            height: DeviceFractions.deviceHeight / 2,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
 
    const styles = useStyles(localStyles)

    const translation = useRef(new Animated.Value(0)).current

    function move(amount){
        Animated.timing(translation, {
            toValue: amount,
            easing: Easing.ease,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    const {
        password,
        confirmPassword,
        confirmEmail,
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


    useEffect(()=>{
        if(isEditing){
            if(!_.isEqual(credentials, copyCredentials)){
                setIsDifferent(true)
            } else{
                setIsDifferent(false)
            }
        }
    },[isEditing, credentials, copyCredentials])


    
    function togglePhoneHandler(){
        if(!disablePhone){
            updatePhoneNumber("opt-out")
            setDisablePhone(prev => !prev)
        } else{
            updatePhoneNumber("")
            setDisablePhone(prev => !prev)
        }
    }

    
    function editProfileHandler(){
        move(-DeviceFractions.deviceWidth)
        setCopyCredentials({...credentials})
        setIsEditing(true)
    }


    function editCancelHandler(){
        move(0)
        if(Object.keys(copyCredentials).length !== 0){
            updateAllCredentials(copyCredentials)
        }
        setIsEditing(false)
    }

    function updateHandler(enteredText, updater){
        updateCredentials(enteredText, errorType, errorMessage, setErrorType, setErrorMessage, updater)
    }

    function openDrawer(){
        editCancelHandler()
        navigation.toggleDrawer()
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
            const response = await updateEmployee({...credentials, company_id: '62d47c7a36aeee14652966cd', verified: true})

            if(response){
                try{
                    const hbReponse = await getContact(email)
                    if(hbReponse){
                        const contactId = hbReponse.results[0].id
                        try{
                            const reply = await updateContact({...credentials, contactId: contactId})
                            if(reply){
                                setCopyCredentials({...credentials})
                                setIsDifferent(false)
                                setIsLoading(false)
                                setIsEditing(false)
                                move(0)
                            }
                        } catch(e){
                            alert(e)
                        }
                    }
                } catch(e){
                    setIsLoading(false)
                    alert(e)
                }
            }
        } catch(e){
            setIsLoading(false)
            alert(e)
        }
    }

    
        const midContentVariables = {
            isEditing: isEditing,
            isDifferent: isDifferent,
            errorType: errorType,
            setErrorType: setErrorType,
            setErrorMessage: setErrorMessage,
            setIsError: setIsError,
            updateHandler: updateHandler,
            disablePhone: disablePhone,
            firstName: firstName,
            updateFirstname: updateFirstname,
            lastName: lastName,
            updateLastName: updateLastName,
            email: email,
            updateEmail: updateEmail,
            managerEmail: managerEmail,
            updateManagerEmail: updateManagerEmail,
            companyIndustryYears: companyIndustryYears,
            industryYears: industryYears,
            updateIndustryYears: updateIndustryYears,
            companyTerritories: companyTerritories,
            employeeTerritory: employeeTerritory,
            updateEmployeeTerritory: updateEmployeeTerritory,
            phoneNumber: phoneNumber,
            updatePhoneNumber: updatePhoneNumber,
            togglePhoneHandler: togglePhoneHandler,
            validationGroup: validationGroup,
            validationGroupNoPhone: validationGroupNoPhone,
            submitHandler: submitHandler,
            editCancelHandler: editCancelHandler,
            editProfileHandler: editProfileHandler,
            colorHandler: colorHandler,
            errorFormatHandler: errorFormatHandler
        }



    if(isError){
        return <ErrorOverlay  message={errorMessage} onPress={()=>{clearErrorHandler(setIsError)}}/>
    }

    return(
            <KeyboardAvoidingView behavior='height' style={styles.screen}>
            <LinearGradient style={styles.screen} colors={[Colors.highlightColor, Colors.primaryColor]}>
                <IconButton isHeader={true} iconName='menu'  iconColor={Colors.secondaryColor} onPress={openDrawer}/>
                <Animated.View style={[styles.screen, {transform: [{translateX: translation}]}]}>
                <View style={styles.container}>
                    <View style={styles.screenHalf}>
                        <Title large={true} color={Colors.secondaryColor} style={{marginBottom: DeviceFractions.deviceH20, textAlign:'right', marginRight: DeviceFractions.deviceW20}}>
                            Profile Details
                        </Title>
                        <View style={styles.centeringContainer}>
                            {isLoading? <Loader size='large' color={Colors.accentColor}/> : <MidContent variables={midContentVariables} type="display"/>}
                        </View>
                    </View>
                    <View style={styles.screenHalf}>
                        <Title large={true} color={Colors.secondaryColor} style={{marginBottom: DeviceFractions.deviceH20, textAlign:'right', marginRight: DeviceFractions.deviceW20}}>
                            Edit Profile
                        </Title>
                        <View style={styles.centeringContainer}>
                            {isLoading? <View style={styles.loadingHeightContainer}><Loader size='large' color={Colors.accentColor}/></View> : <MidContent variables={midContentVariables}/>}
                        </View>
                    </View>
                </View>
                </Animated.View>
            </LinearGradient >
        </KeyboardAvoidingView>
         
    )
}


export default ProfileScreen