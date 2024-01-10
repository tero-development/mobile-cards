import {TextInput, View, Text, StyleSheet} from 'react-native'
import DeviceFractions from '../utils/dimensions'

const LabeledPhoneInput = ({style, viewStyle, label, textSize, color, textInputConfig, visible, disable}) =>{

    const content = <View style={viewStyle}>
        <Text style={[styles.labelStyle, {color:color, fontSize: textSize}]}>{label}</Text>
        <TextInput style={[styles.inputStyle, , style, {borderColor: color, color: color}, disable && styles.deactivated]} {...textInputConfig}/>
    </View>

    if(visible){
        return null
    } else{
        return(content)
    }
 
}


const styles = StyleSheet.create({
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
    deactivated:{
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 2
    }
})

export default LabeledPhoneInput