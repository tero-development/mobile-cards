import {View, Text, useWindowDimensions} from 'react-native'
import { converterSetup, useStyles } from '../utils/dimensions'

const Title = ({children, textSize, color, style, textStyle, large}) =>{
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        presets:{
            fontSize: 24,
            fontWeight: 'bold',
        }, 
        largeText:{
            fontSize: width/9
        }
    }
 
    const styles = useStyles(localStyles)


    return(
        <View>
            <Text style={[styles.presets, large && styles.largeText, textSize&&{fontSize: textSize}, {color: color}, style, textStyle]}>{children}</Text>
        </View>
    )
}



export default Title