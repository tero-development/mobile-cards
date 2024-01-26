import {
    Image, 
    useWindowDimensions
} from 'react-native'
import { converterSetup, useStyles } from '../utils/dimensions'


const Logo =() =>{
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        logo: {
            width: height/8, 
            height: height/8, 
            marginBottom: converter(height/50, height/40, height/40)
        }
    }
 
    const styles = useStyles(localStyles)

    return(
        <Image style={styles.logo} source={require('../assets/images/ExSell_logo_vertical_color.png')} />
    )
}

export default Logo