import {View, Text, StyleSheet} from 'react-native'
import Colors from '../utils/colors'
import ModularButton from '../components/ModularButton'
import DeviceFractions from '../utils/dimensions'

const ErrorOverlay = ({message, onPress}) =>{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>An error occured!</Text>
            <Text style={styles.text}>{message}</Text>
            <ModularButton onPress={onPress} buttonColor={Colors.accentColor} textColor={Colors.highlightColor} rippleColor={Colors.secondaryColor}>close</ModularButton>
        </View>
    )
    
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: Colors.primaryColor100
    },
    text:{
        textAlign: 'center',
        color: Colors.secondaryColor,
        marginBottom: DeviceFractions.deviceH30,
        fontSize: 16
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: DeviceFractions.deviceHeight / 100,
        color: Colors.secondaryColor
    }
})