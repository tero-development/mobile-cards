import {View,  Text, Pressable, StyleSheet} from 'react-native'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'
import LabeledInput from '../LabeledInput'
import LabeledPhoneInput from '../LabeledPhoneInput'
import DropdownComponent from '../DropdownComponent'
import IconButton from '../../UI/IconButton'
import ModularLink from '../ModularLink'
import ModularButton from '../ModularButton'
import _ from 'lodash'


const MidContent=({variables, type})=>{
    const {
        isEditing,
        isDifferent,
        errorType,
        setErrorType,
        setErrorMessage,
        setIsError,
        disablePhone,
        updateHandler,
        firstName,
        updateFirstname,
        lastName,
        updateLastName,
        email,
        updateEmail,
        managerEmail,
        updateManagerEmail,
        companyIndustryYears,
        industryYears,
        updateIndustryYears,
        companyTerritories,
        employeeTerritory,
        updateEmployeeTerritory,
        phoneNumber,
        updatePhoneNumber,
        togglePhoneHandler,
        filteredCredentials,
        validationGroup,
        validationGroupNoPhone,
        submitHandler,
        editCancelHandler,
        editProfileHandler,
        colorHandler,
        errorFormatHandler
    } = variables

    const editLink = <ModularLink textColor={Colors.secondaryColor} textSize={20} textWeight={'600'} onPress={editProfileHandler}>
    Edit 
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
    

    if(type==="display"){

        return(
        <View style={styles.innerContainer}>
        <View style={styles.inputPairContainer}>
            <LabeledInput 
                label={'First Name'}  
                style={styles.inputStyle}
                color={colorHandler(errorType, [], firstName)}
                disable={true}
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
                disable={true}
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
                disable={true}
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
                disable={true} 
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
                data={companyIndustryYears? companyIndustryYears : [{label: "1", value: "1"}, {label: "2", value: "2"}]} 
                mode='modal'
                flexWidth={0.465} 
                prompt={industryYears} 
                iconName='information-circle-outline'
                viewStyle={styles.dropDown}
                color={colorHandler(errorType, [], industryYears)}
                value={industryYears}
                updater={updateIndustryYears}
                valueSetter={updateHandler}
                disable={true}
            />
            <DropdownComponent
                data={companyTerritories? companyTerritories : [{label: "1", value: "1"}, {label: "2", value: "2"}]} 
                mode='modal'
                flexWidth={0.465} 
                prompt={employeeTerritory} 
                iconName='information-circle-outline'
                viewStyle={styles.dropDown}
                color={colorHandler(errorType, [], employeeTerritory)}
                value={employeeTerritory}
                updater={updateEmployeeTerritory}
                valueSetter={updateHandler}
                disable={true}
            />
        </View>
        <View style={[styles.phonePairContainer, disablePhone && {justifyContent: 'center'}]}>
            <LabeledPhoneInput 
                label={"Phone Number"} 
                color={colorHandler(errorType, ['phone_invalid'], phoneNumber)}
                style={[styles.phoneInput, {width: '50%'}]}
                viewStyle={{flex: 0.90}}
                visible={false}
                disable={true} 
                textInputConfig={{
                    onChangeText:(text) => updateHandler( text, updatePhoneNumber),
                    value: phoneNumber,
                    textContentType:'telephoneNumber',
                    dataDetectorTypes:'phoneNumber', 
                    keyboardType:'phone-pad', 
                    maxLength:14,
                    editable: false
                }}
            />
    
    
        
        </View>
            {editLink}
        </View>
        )
    } else{
        return(
            <View style={styles.innerContainer}>
        <View style={styles.inputPairContainer}>
            <LabeledInput 
                label={'First Name'}  
                style={styles.inputStyle}
                color={colorHandler(errorType, [], firstName)}
                disable={false}
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
                disable={false}
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
                disable={false}
                textInputConfig={{
                    value: email,
                    onChangeText:(text) => updateHandler( text, updateEmail),
                    autoCorrect: false, 
                    autoCapitalize:'none',
                    editable: true
                }}                             
            />
            <LabeledInput 
                label={"Manager's email"} 
                color={colorHandler(errorType, ['managerEmail_invalid'], managerEmail)}
                style={styles.inputStyle}
                disable={false} 
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
                data={companyIndustryYears? companyIndustryYears : [{label: "1", value: "1"}, {label: "2", value: "2"}]} 
                mode='modal'
                flexWidth={0.465} 
                prompt={industryYears} 
                iconName='information-circle-outline'
                viewStyle={styles.dropDown}
                color={colorHandler(errorType, [], industryYears)}
                value={industryYears}
                updater={updateIndustryYears}
                valueSetter={updateHandler}
                disable={false}
            />
            <DropdownComponent
                data={companyTerritories? companyTerritories : [{label: "1", value: "1"}, {label: "2", value: "2"}]} 
                mode='modal'
                flexWidth={0.465} 
                prompt={employeeTerritory} 
                iconName='information-circle-outline'
                viewStyle={styles.dropDown}
                color={colorHandler(errorType, [], employeeTerritory)}
                value={employeeTerritory}
                updater={updateEmployeeTerritory}
                valueSetter={updateHandler}
                disable={false}
            />
        </View>
        <View style={[styles.phonePairContainer, disablePhone && {justifyContent: 'center'}]}>
            <LabeledPhoneInput 
                label={"Phone Number"} 
                color={colorHandler(errorType, ['phone_invalid'], phoneNumber)}
                style={[styles.phoneInput, false && {width: '50%'}]}
                viewStyle={{flex: 0.90}}
                visible={disablePhone}
                disable={false} 
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
    
    
            <Pressable style={[styles.phoneToggle, false && {display: 'none'}]} onPress={togglePhoneHandler}>
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
                 {buttonGroup}
        </View>
        )
    }
}

export default MidContent

const styles = StyleSheet.create({
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
    }
})
