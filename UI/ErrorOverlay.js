import {View, Text, useWindowDimensions} from 'react-native'
import Colors from '../utils/colors'
import ModularButton from '../components/ModularButton'
import {converterSetup, useStyles} from '../utils/dimensions'

const ErrorOverlay = ({message, onPress}) =>{
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        container:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.primaryColor100
        },
        text:{
            textAlign: 'center',
            color: Colors.secondaryColor,
            marginBottom: height/30,
            fontSize: converter(width/35, width/27, width/35, width/35)
        },
        title:{
            fontSize: converter(width/25, width/20, width/25, width/25),
            fontWeight: 'bold',
            marginBottom: height / 100,
            color: Colors.secondaryColor
        }
    }

    const styles = useStyles(localStyles)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>An error occured!</Text>
            <Text style={styles.text}>{message}</Text>
            <ModularButton onPress={onPress} buttonColor={Colors.accentColor} textColor={Colors.highlightColor} rippleColor={Colors.secondaryColor}>close</ModularButton>
        </View>
    )
    
}

export default ErrorOverlay

