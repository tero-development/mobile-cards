import {View, Text, Pressable, StyleSheet, Platform} from 'react-native'
import DeviceFractions from '../utils/dimensions'

const ModularButton = ({children, onPress, style, textSize, textColor, textStyles,  buttonColor, rippleColor}) =>{


    buttonBackground = {
        backgroundColor: buttonColor,
    }

    const pressedStyles = {
        backgroundColor: Platform.OS === 'ios'? 'black' : buttonColor,
        opacity: Platform.OS === 'ios'? 0.1 : 1
    }

    return(
        <View style={[styles.buttonOuterContainer, style]}>
            <Pressable style={({pressed})=>[styles.buttonInnerContainer, buttonBackground, pressed? pressedStyles : null]} onPress={onPress} android_ripple={{color: rippleColor? rippleColor : 'black'}}>
                <Text style={[styles.buttonText, {fontSize: textSize, color: textColor}, textStyles]}>{children}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonOuterContainer:{
        borderRadius: 10,
        height: 50,
        width: DeviceFractions.deviceWidth / 3 * 2,
        justifyContent: 'center',
        overflow: Platform.OS === 'android'? 'hidden' : 'visible',
        borderRadius: 10
    },
    buttonInnerContainer:{
      height: '100%',
      justifyContent: 'center',
      
    },
    buttonText:{
        color: 'white',
        fontSize: 12,
        textAlign: 'center'
    },
  
})

export default ModularButton