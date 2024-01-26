import {View, Text, Pressable, StyleSheet, Platform, useWindowDimensions} from 'react-native'
import DeviceFractions, {converterSetup, getDimensions, useStyles} from '../utils/dimensions'

const ModularButton = ({children, onPress, style, textSize, textColor, textStyles,  buttonColor, rippleColor}) =>{

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        buttonOuterContainer:{
            width: converter(width/2, width/1.6, width/2),
            height: height /20,
            borderRadius: converter(6, 8, 12),
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom:converter(height/50, height/40, height/50)
        },
        buttonInnerContainer:{
          height: '100%',
          justifyContent: 'center',
          
        },
        buttonText:{
            color: 'white',
            fontSize: converter(width/30, width/25, width/30),
            textAlign: 'center'
        },
      
    }

    const styles = useStyles(localStyles)

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
                <Text style={[styles.buttonText, textSize&&{fontSize: textSize}, {color: textColor}, textStyles && textStyles]}>{children}</Text>
            </Pressable>
        </View>
    )
}


export default ModularButton