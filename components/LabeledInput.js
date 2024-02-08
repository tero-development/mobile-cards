import React, { useState } from 'react'; 
import {TextInput, View, Text, useWindowDimensions} from 'react-native'
import {converterSetup, useStyles} from '../utils/dimensions'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const LabeledInput = ({style, viewStyle, label, color, textInputConfig, disable, type}) =>{

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
            width: converter(width/2, width/1.6, width/2, width/2.25),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: converter(1.5, 2, 3, 3.5),
            borderRadius: converter(width/50, width/35, width/55, width/60),
            marginBottom: height/50
        },
        passwordInputStyle:{
            paddingVertical: 2,
            paddingHorizontal: 10,
            flex: converter(0.80, 0.85, 0.85, 0.85),
            fontSize: converter(width/30, width/25, width/35, width/35)
        },
        icon: { 
            flex: converter(0.20, 0.15, 0.15, 0.15),
        }, 
        labelStyle:{
            fontWeight: 'bold',
            fontSize: converter(width/30, width/30, width/35, width/35)
        },
        inputStyle:{
            width: converter(width/2, width/1.6, width/2, width/2.25),
            height: height /20,
            borderWidth: converter(1.5, 2, 3, 3.5),
            borderRadius: converter(width/50, width/35, width/55, width/60),
            paddingHorizontal: converter(width/40, width/30, width/40, width/40),
            fontSize: converter(width/30, width/25, width/35, width/35),
            marginBottom:height/50
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
            <Text style={[styles.labelStyle, {color:color}]}>{label}</Text>
            <View style={[styles.passwordViewStyle,style, {borderColor: color}]}>
                <Text></Text>
                <TextInput 
                    style={[styles.passwordInputStyle, disable && styles.deactivated,  {color: color}]} 
                    {...textInputConfig}
                    secureTextEntry={!showPassword}
                />
                <MaterialCommunityIcons 
                        name={showPassword ? 'eye-off' : 'eye'} 
                        size={converter(width/22, width/20, width/25, width/25)} 
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
                <Text style={[styles.labelStyle, {color:color}]}>{label}</Text>
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