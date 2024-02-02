import { View, Pressable, Text, useWindowDimensions} from "react-native"
import {Ionicons} from '@expo/vector-icons'
import  {converterSetup, useStyles} from "../utils/dimensions"
import { useNavigation } from "@react-navigation/native"
import Colors from "../utils/colors"



//
const BackButton = ({iconColor, iconSize, textColor, textSize, navigationHandler, viewStyle}) =>{

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
    container:{
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute', 
        left: width/20, 
        bottom: width/10, 
        zIndex: 1
    },
    defaultText:{
        color: Colors.secondaryColor,
        fontSize: converter(width/25, width/20, width/25),
        fontWeight: 'bold',
        margin: 0,
        padding: 0
    }
}
 
    const styles = useStyles(localStyles)

    const navigation = useNavigation(localStyles)

    


    return(
        
    <Pressable style={[styles.container, viewStyle&&viewStyle]} onPress={navigationHandler}>
        <Ionicons style={{margin: 0, padding: 0}}  name={"chevron-back"}  size={iconSize? iconSize : converter(width/19, width/15, width/20)} color={iconColor? iconColor: Colors.secondaryColor} />
        <Text style={[styles.defaultText, textSize&&{fontSize: textSize}, textColor&&{color: textColor}]}>Back</Text>
    </Pressable>
    )
}



export default BackButton