import {Text, Pressable, useWindowDimensions} from 'react-native'
import { converterSetup, useStyles } from '../utils/dimensions'


const ModularLink = ({children, onPress, textSize, textWeight, textColor, textStyles, viewStyle}) =>{

    const {width, height} = useWindowDimensions()
    const converter = converterSetup(width, height)

    const localStyles = {
        text:{
            fontSize: converter(width/25, width/20, width/27)
        }
    }

    const styles = useStyles(localStyles)

    return(
        <Pressable onPress={onPress} style={viewStyle}>
            <Text style={[styles.text, textSize&&{fontSize: textSize}, textWeight&&{fontWeight: textWeight}, {color: textColor}, textStyles]}>{children}</Text>
        </Pressable>
    )
}



export default ModularLink