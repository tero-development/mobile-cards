import { Text, useWindowDimensions, Pressable} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {converterSetup, useStyles} from '../../utils/dimensions'
import {openBrowserAsync} from 'expo-web-browser'

const ScheduleNodeOption  = ({title, topTitle, iconName, iconSize, iconColor, roundL, roundR, bgColor, textColor, openModalHandler, variableGroup, link, active}) =>{
    
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        container:{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        roundedLeft:{
            borderBottomLeftRadius: converter(15, 20, 35)
        },
        roundedRight:{
            borderBottomRightRadius: converter(15, 20, 35)
        },
        text:{
            fontWeight: 'bold',
            fontSize: converter(width/30, width/30, width/30)
        }
    }
 
    const styles = useStyles(localStyles)

    let content =  <Pressable style={[
        styles.container, 
        roundL && styles.roundedLeft, 
        roundR && styles.roundedRight, 
        {backgroundColor: '#5c5c5c',}]}
        onPress={()=> {}}
        >
        <Text style={[styles.text, {color: '#9e9e9e'}]}>{topTitle}</Text>
        <Ionicons name={iconName} size={iconSize} color={'#9e9e9e'} style={{marginHorizontal: width /100 * 4}}/>
        <Text style={[styles.text, {color: '#9e9e9e'}]}>{title}</Text>
    </Pressable>

    if(active || openModalHandler){
        content = <Pressable style={[
            styles.container, 
            roundL && styles.roundedLeft, 
            roundR && styles.roundedRight, 
            {backgroundColor: bgColor,}]}
            onPress={()=> openModalHandler? openModalHandler(variableGroup) : openBrowserAsync(link)}
            >
            <Text style={[styles.text, {color: textColor}]}>{topTitle}</Text>
            <Ionicons name={iconName} size={iconSize} color={iconColor} style={{marginHorizontal: width /100 * 4}}/>
            <Text style={[styles.text, {color: textColor}]}>{title}</Text>
        </Pressable>
    }

    return(
        content
    )
}


export default ScheduleNodeOption 