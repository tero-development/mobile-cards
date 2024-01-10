import { Text, StyleSheet, Pressable} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import DeviceFractions from '../../utils/dimensions'
import {openBrowserAsync} from 'expo-web-browser'

const ScheduleNodeOption  = ({title, topTitle, iconName, iconSize, iconColor, roundL, roundR, bgColor, textColor, openModalHandler, variableGroup, link}) =>{
    
    return(
        <Pressable style={[
            styles.container, 
            roundL && styles.roundedLeft, 
            roundR && styles.roundedRight, 
            {backgroundColor: bgColor,}]}
            onPress={()=> openModalHandler? openModalHandler(variableGroup) : openBrowserAsync(link)}
            >
            <Text style={[styles.text, {color: textColor}]}>{topTitle}</Text>
            <Ionicons name={iconName} size={iconSize} color={iconColor} style={{marginHorizontal: DeviceFractions.deviceWidth /100 * 4}}/>
            <Text style={[styles.text, {color: textColor}]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    roundedLeft:{
        borderBottomLeftRadius: 20
    },
    roundedRight:{
        borderBottomRightRadius: 20
    },
    text:{
        fontWeight: 'bold',
        fontSize:16
    },
    clickBox:{
        height: 15,
        width: 15,
        borderRadius: 3
    }
})

export default ScheduleNodeOption 