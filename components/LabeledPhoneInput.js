import {TextInput, View, Text, useWindowDimensions} from 'react-native'
import {converterSetup, useStyles} from '../utils/dimensions'

const LabeledPhoneInput = ({style, viewStyle, label, textSize, color, textInputConfig, visible, disable}) =>{
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        labelStyle:{
            fontWeight: 'bold',
            fontSize: converter(width/30, width/30, width/35, width/35)
        },
        inputStyle:{
            width: width/2,
                height: height /20,
                borderWidth: converter(1.5, 2, 3, 3.5),
                borderRadius: converter(width/50, width/35, width/55, width/60),
                paddingHorizontal: converter(width/40, width/30, width/30, width/30),
                fontSize: converter(width/30, width/25, width/35, width/40),
                marginBottom:converter(height/50, height/40, height/50, height/50)
        },
        deactivated:{
            borderRadius: 0,
            borderWidth: 0,
            borderBottomWidth: 2
        }
    }
 
    const styles = useStyles(localStyles)

    const content = <View style={viewStyle}>
        <Text style={[styles.labelStyle, {color:color, }, textSize&&{fontSize: textSize}]}>{label}</Text>
        <TextInput style={[styles.inputStyle, , style, {borderColor: color, color: color}, disable && styles.deactivated]} {...textInputConfig}/>
    </View>

    if(visible){
        return null
    } else{
        return(content)
    }
 
}


export default LabeledPhoneInput