import {View, KeyboardAvoidingView, Text, Pressable, StyleSheet} from 'react-native'
import { useState, useEffect, useContext } from 'react'
import {SignInContext} from '../../store/signin-context'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../utils/colors'
import Title from '../../UI/Title'
import DeviceFractions from '../../utils/dimensions'
import LabeledInput from '../../components/LabeledInput'
import DropdownComponent from '../../components/DropdownComponent'
import IconButton from '../../UI/IconButton'
import LabeledPhoneInput from '../../components/LabeledPhoneInput'
import ModularButton from '../../components/ModularButton'
import ErrorOverlay from '../../UI/ErrorOverlay'
import ModularLink from '../../components/ModularLink'
// import { CompanyContext } from '../store/company-context'
import {verifyPhoneHandler, verifyEmailHandler} from '../../utils/helperFunctions'
import { updateCredentials, clearErrorHandler, colorHandler, errorFormatHandler } from '../../utils/inputErrorDetection'
import { sendCredentials } from '../../httpServices/credentials'
import { getCompany } from '../../httpServices/companies'
import { updateEmployee } from '../../httpServices/employees'
import { getContact, postContact, updateContact } from '../../httpServices/HBcontacts'
import Loader from '../../UI/Loader'
import _ from 'lodash'



const ProfileScreenOriginal = ({navigation}) =>{
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
        setCopyCredentials({...credentials})
        setIsEditing(true)
    }

    function editCancelHandler(){
        updateAllCredentials(copyCredentials)
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
                                setIsEditing(false)
                                setCopyCredentials({...credentials})
                                setIsLoading(false)
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

    
    const editLink = <ModularLink textColor={Colors.secondaryColor} textSize={20} textWeight={'600'} onPress={editProfileHandler}>
        Edit Profile
    </ModularLink>

    const buttonGroup = <View>
                {isDifferent && <ModularButton 
                    buttonColor={Colors.accentColor} 
                    textColor={'white'} 
                    rippleColor={Colors.accentColor300}
                    style={{width: DeviceFractions.deviceWidth / 2, marginBottom: DeviceFractions.deviceH50}}
                    onPress={()=>{
                        const {phoneNumber, ...credsWithOutPhone} = {...filteredCredentials}

                        if(!disablePhone){
                            errorFormatHandler(filteredCredentials, validationGroup, submitHandler, setErrorType, setErrorMessage, setIsError)
                        } else{
                            errorFormatHandler(credsWithOutPhone, validationGroupNoPhone, submitHandler, setErrorType, setErrorMessage, setIsError)
                        }
                    }}
                >
                    Submit Changes
                </ModularButton>}
                <ModularLink textColor={Colors.secondaryColor} textSize={16} textWeight={'bold'} textStyles={{textAlign: 'center'}} onPress={editCancelHandler}>
                    Cancel
                </ModularLink>
            </View>
        
    

    const midContent = <View style={styles.innerContainer}>
    <View style={styles.inputPairContainer}>
        <LabeledInput 
            label={'First Name'}  
            style={styles.inputStyle}
            color={colorHandler(errorType, [], firstName)}
            disable={!isEditing}
            textInputConfig={{
                value: firstName,
                onChangeText:(text) => updateHandler( text, updateFirstname),
                autoCorrect: false, 
                autoCapitalize:'words',
                editable: isEditing
            }}   
        />
        <LabeledInput 
            label={'Last Name'}  
            style={styles.inputStyle}
            color={colorHandler(errorType, [], lastName)}
            disable={!isEditing}
            textInputConfig={{
                value: lastName,
                onChangeText:(text) => updateHandler( text, updateLastName),
                autoCorrect: false, 
                autoCapitalize:'words',
                editable: isEditing
            }}   
        />
    </View>
    <View style={styles.inputPairContainer}>
        <LabeledInput 
            label={'Email'} 
            color={colorHandler(errorType, ['email_invalid'], email)}
            style={styles.inputStyle} 
            disable={!isEditing}
            textInputConfig={{
                value: email,
                onChangeText:(text) => updateHandler( text, updateEmail),
                autoCorrect: false, 
                autoCapitalize:'none',
                editable: isEditing
            }}                             
        />
        <LabeledInput 
            label={"Manager's email"} 
            color={colorHandler(errorType, ['managerEmail_invalid'], managerEmail)}
            style={styles.inputStyle}
            disable={!isEditing} 
            textInputConfig={{
                value: managerEmail,
                onChangeText:(text) => updateHandler( text, updateManagerEmail),
                autoCorrect: false, 
                autoCapitalize:'none',
                editable: isEditing
            }}                             
        />
    </View>
    <View style={styles.inputPairContainer}>
        <DropdownComponent 
            data={companyIndustryYears} 
            mode='modal'
            flexWidth={0.465} 
            prompt={industryYears} 
            iconName='information-circle-outline'
            viewStyle={styles.dropDown}
            color={colorHandler(errorType, [], industryYears)}
            value={industryYears}
            updater={updateIndustryYears}
            valueSetter={updateHandler}
            disable={!isEditing}
        />
        <DropdownComponent
            data={companyTerritories} 
            mode='modal'
            flexWidth={0.465} 
            prompt={employeeTerritory} 
            iconName='information-circle-outline'
            viewStyle={styles.dropDown}
            color={colorHandler(errorType, [], employeeTerritory)}
            value={employeeTerritory}
            updater={updateEmployeeTerritory}
            valueSetter={updateHandler}
            disable={!isEditing}
        />
    </View>
    <View style={[styles.phonePairContainer, disablePhone && {justifyContent: 'center'}]}>
        <LabeledPhoneInput 
            label={"Phone Number"} 
            color={colorHandler(errorType, ['phone_invalid'], phoneNumber)}
            style={[styles.phoneInput, !isEditing && {width: '50%'}]}
            viewStyle={{flex: 0.90}}
            visible={disablePhone}
            disable={!isEditing} 
            textInputConfig={{
                onChangeText:(text) => updateHandler( text, updatePhoneNumber),
                value: phoneNumber,
                textContentType:'telephoneNumber',
                dataDetectorTypes:'phoneNumber', 
                keyboardType:'phone-pad', 
                maxLength:14,
                editable: isEditing
            }}
        />


        <Pressable style={[styles.phoneToggle, !isEditing && {display: 'none'}]} onPress={togglePhoneHandler}>
            <Text style={styles.phoneToggleText}>Opt in for texts</Text>
            <IconButton 
                isHeader={false} 
                iconName={!disablePhone? 'checkmark-circle-outline' : 'close-circle-outline'} 
                iconSize={28} 
                iconColor={Colors.secondaryColor}
                onPress={togglePhoneHandler} 
            />
        </Pressable>
    </View>
            {!isEditing? editLink : buttonGroup}
    </View>

    if(isError){
        return <ErrorOverlay  message={errorMessage} onPress={()=>{clearErrorHandler(setIsError)}}/>
    }

    return(
        <KeyboardAvoidingView behavior='height' style={styles.screen}>
            <LinearGradient style={styles.screen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={true} iconName='menu' iconSize={28} iconColor={Colors.secondaryColor} onPress={openDrawer}/>
            <View style={styles.container}>
                <View>
                    <Title textSize={36} color={Colors.secondaryColor} style={{marginBottom: DeviceFractions.deviceH20, textAlign:'right', marginRight: DeviceFractions.deviceW30}}>
                        Profile Details
                    </Title>
                    {isLoading? <Loader size='large' color={Colors.accentColor}/> : midContent}
                </View>
            </View>
        </LinearGradient >
        </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: DeviceFractions.deviceWidth,        
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
    }
})

export default ProfileScreenOriginal