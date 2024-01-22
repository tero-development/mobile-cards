import { View, Pressable, StyleSheet, } from "react-native"
import {Ionicons} from '@expo/vector-icons'
import DeviceFractions from "../utils/dimensions"
import { useNavigation } from "@react-navigation/native"



//isHeader is a boolean, if true, it will have be placed in a View w/ alignItems: flex-start
//false: it's just icon, no View or special placement
const IconButton = ({isHeader, hasEditProfile, iconName, iconSize, iconColor, onPress, viewStyle}) =>{
    const navigation = useNavigation()

    function navigateProfile(){
        navigation.navigate('ProfileScreen')
    } 
    

    const standard = 
    <Pressable onPress={onPress} style={viewStyle}>
        <Ionicons  name={iconName}  size={iconSize} color={iconColor} />
    </Pressable>
   
   const header = 
   <View style={[styles.iconContainer, hasEditProfile && styles.withProfile, viewStyle]}>
        <Pressable onPress={onPress} style={{width: iconSize}}> 
            <Ionicons  name={iconName} size={iconSize} color={iconColor} />
        </Pressable>
        {hasEditProfile && 
        <Pressable onPress={navigateProfile}>
            <Ionicons name='person' size={iconSize} color={iconColor}/>
        </Pressable>
        }
    </View>

    return(
            isHeader? header : standard
    )
}

const styles = StyleSheet.create({
        iconContainer:{
            width: DeviceFractions.deviceWidth,
            paddingLeft: DeviceFractions.deviceW20,
            paddingTop: DeviceFractions.deviceHeight / 10,
        },

    withProfile:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: DeviceFractions.deviceW20,
    }
})

export default IconButton