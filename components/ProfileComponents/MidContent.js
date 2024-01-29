import {View,  Text, Pressable, useWindowDimensions} from 'react-native'
import Colors from '../../utils/colors'
import {converterSetup, useStyles} from '../../utils/dimensions'
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
            width: width * 2
        },
        screenHalf:{
            flex: 0.5,
        },
        innerContainer:{
            width: width / 10 * 9,
            justifyContent: 'center',
            alignItems: 'center'
        },
        inputPairContainer:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%'
        },
        inputStyle:{
            width: width / 10 * 4,
            height: height / 20,
            marginBottom: height/40
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
          },
          dropDown:{
            marginTop: height/50,
            marginBottom: height / 35
          },
          dropStyle:{
            width: width/2.5,
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
            marginBottom: 0,
            width: width/2.25
        },
        phoneToggle:{
            borderWidth: converter(1.5, 2, 3), 
            borderColor: Colors.secondaryColor, 
            borderRadius: converter(6, 8, 12),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: height /20,
            width: width/2.75,
            paddingHorizontal: width / 1000,
        },
        phoneToggleText:{
            maxWidth: '45%',
            color: Colors.secondaryColor,
            fontWeight: 'bold',
            fontSize: converter(width/40, width/40, width/40)
        }
    }
 
    const styles = useStyles(localStyles)

    const editLink = <ModularLink textColor={Colors.secondaryColor}  textWeight={'600'} onPress={editProfileHandler}>
    Edit 
</ModularLink>

        const buttonGroup = <View>
            {isDifferent && <ModularButton 
                buttonColor={Colors.accentColor} 
                textColor={'white'} 
                rippleColor={Colors.accentColor300}
                style={{width: width / 2, marginBottom: height/50}}
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
            <ModularLink textColor={Colors.secondaryColor} textWeight={'bold'} textStyles={{textAlign: 'center'}} onPress={editCancelHandler}>
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
                prompt={industryYears} 
                iconName='information-circle-outline'
                dropStyle={styles.dropStyle}
                color={colorHandler(errorType, [], industryYears)}
                value={industryYears}
                updater={updateIndustryYears}
                valueSetter={updateHandler}
                disable={true}
            />
            <DropdownComponent
                data={companyTerritories? companyTerritories : [{label: "1", value: "1"}, {label: "2", value: "2"}]} 
                mode='modal'
                prompt={employeeTerritory} 
                iconName='information-circle-outline'
                dropStyle={styles.dropStyle}
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
                dropStyle={styles.dropStyle}
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
                dropStyle={styles.dropStyle}
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
    
    
            <Pressable style={[styles.phoneToggle, disablePhone && {marginTop: height/40}, false && {display: 'none'}]} onPress={togglePhoneHandler}>
                <Text style={styles.phoneToggleText}>{`Opt ${disablePhone? "in" : "out"} for texts`}</Text>
                <IconButton 
                    isHeader={false} 
                    iconName={!disablePhone? 'close-circle-outline' : 'checkmark-circle-outline'} 
                    iconSize={converter(18, 20, 30)} 
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

