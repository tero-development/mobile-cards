import { View, Pressable, StyleSheet, useWindowDimensions} from "react-native"
import {Ionicons} from '@expo/vector-icons'
import  {converterSetup, useStyles} from "../utils/dimensions"
import { useNavigation } from "@react-navigation/native"



//isHeader is a boolean, if true, it will have be placed in a View w/ alignItems: flex-start
//false: it's just icon, no View or special placement
const IconButton = ({isHeader, hasEditProfile, iconName, iconSize, iconColor, onPress, viewStyle}) =>{

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        iconContainer:{
            width: width,
            paddingLeft: width / 20,
            paddingTop: height / 10,
        },

    withProfile:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: width/15,
    }
}
 
    const styles = useStyles(localStyles)

    const navigation = useNavigation(localStyles)

    function navigateProfile(){
        navigation.navigate('ProfileScreen')
    } 
    

    const standard = 
    <Pressable onPress={onPress} style={viewStyle}>
        <Ionicons  name={iconName}  size={iconSize? iconSize : converter(width/15, width/15, width/20, width/25)} color={iconColor} />
    </Pressable>
   
   const header = 
   <View style={[styles.iconContainer, hasEditProfile && styles.withProfile, viewStyle]}>
        <Pressable onPress={onPress} style={{width: iconSize}}> 
            <Ionicons  name={iconName} size={iconSize? iconSize : converter(width/15, width/15, width/20, width/25)}  color={iconColor} />
        </Pressable>
        {hasEditProfile && 
        <Pressable onPress={navigateProfile}>
            <Ionicons name='person' size={iconSize? iconSize : converter(width/15, width/15, width/20, width/25)} color={iconColor}/>
        </Pressable>
        }
    </View>

    return(
            isHeader? header : standard
    )
}



export default IconButton