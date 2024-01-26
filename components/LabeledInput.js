import React, { useState } from 'react'; 
import {TextInput, View, Text, StyleSheet, useWindowDimensions} from 'react-native'
import DeviceFractions, {converterSetup, useStyles} from '../utils/dimensions'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const LabeledInput = ({style, viewStyle, label, textSize, color, textInputConfig, disable, type}) =>{

       // State variable to track password visibility 
       const [showPassword, setShowPassword] = useState(false); 
     
       // Function to toggle the password visibility state 
       const toggleShowPassword = () => { 
           setShowPassword(!showPassword); 
       }

       const {width, height} = useWindowDimensions()

       const converter = converterSetup(width, height)

       const localStyles = {
        passwordViewStyle:{
            height: height /20,
            width: converter(width/2.5, width/2, width/2.5),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: converter(1.5, 2, 3),
            borderRadius: converter(6, 8, 12),
            marginBottom:converter(height/50, height/40, height/50)
        },
        icon: { 
            width: '15%',
            borderWidth: 1,
            borderColor: 'red'
        }, 
        labelStyle:{
            fontWeight: 'bold'
        },
        inputStyle:{
            width: converter(width/2.5, width/2, width/2.5),
            height: height /20,
            borderWidth: converter(1.5, 2, 3),
            borderRadius: converter(6, 8, 12),
            paddingHorizontal: converter(width/40, width/30, width/40),
            fontSize: converter(width/30, width/25, width/30),
            marginBottom:converter(height/50, height/40, height/50)
        },
        passwordInputStyle:{
            paddingVertical: 2,
            paddingHorizontal: 10,
            flex: 1,
            borderWidth: 1
        },
        deactivated:{
            borderRadius: 0,
            borderWidth: 0,
            borderBottomWidth: 2
        }
    }
    
       const styles = useStyles(localStyles)

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




export default LabeledInput