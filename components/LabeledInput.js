import React, { useState } from 'react'; 
import {TextInput, View, Text, StyleSheet} from 'react-native'
import DeviceFractions from '../utils/dimensions'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const LabeledInput = ({style, viewStyle, label, textSize, color, textInputConfig, disable, type}) =>{

       // State variable to track password visibility 
       const [showPassword, setShowPassword] = useState(false); 
     
       // Function to toggle the password visibility state 
       const toggleShowPassword = () => { 
           setShowPassword(!showPassword); 
       }; 
console.log(showPassword)
    if(type==='password'){
        return(
            <View style={viewStyle}>
            <Text style={[styles.labelStyle, {color:color, fontSize: textSize}]}>{label}</Text>
            <View style={[styles.passwordViewStyle,style, {borderColor: color}]}>
                <Text></Text>
                <TextInput 
                    style={[styles.passwordInputStyle, disable && styles.deactivated,  {color: color}]} 
                    {...textInputConfig}
                    secureTextEntry={!showPassword}
                />
                <MaterialCommunityIcons 
                        name={showPassword ? 'eye-off' : 'eye'} 
                        size={24} 
                        color={color}
                        style={styles.icon} 
                        onPress={toggleShowPassword} 
                    /> 
            </View>
            
            </View>
        )
    } else{
        return(
            <View style={viewStyle}>
                <Text style={[styles.labelStyle, {color:color, fontSize: textSize}]}>{label}</Text>
                <TextInput 
                    style={[styles.inputStyle, disable && styles.deactivated, style, {borderColor: color, color: color}]} 
                    {...textInputConfig}
                    sec
                    />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    passwordViewStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        width: DeviceFractions.deviceWidth / 3 * 2,
        height: DeviceFractions.deviceHeight / 20
    },
    icon: { 
        width: '15%'
    }, 
    labelStyle:{
        fontWeight: 'bold'
    },
    inputStyle:{
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 10,
        width: DeviceFractions.deviceWidth / 3 * 2,
        height: DeviceFractions.deviceHeight / 20,
    },
    passwordInputStyle:{
        paddingVertical: 2,
        paddingHorizontal: 10,
        flex: 1
    },
    deactivated:{
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 2
    }
})

export default LabeledInput