import {View, Text, StyleSheet} from 'react-native'
import DeviceFractions from '../../utils/dimensions'
import Colors from '../../utils/colors'

const PasswordRules = () =>{
    return(
        <View style={styles.container}>
            <Text style={styles.passwordRules}>Passwords requirements:</Text>
            <Text style={styles.passwordRules}>At least 8 characters long</Text>
            <Text style={styles.passwordRules}>Contains at least 1 number</Text>
            {/* <Text style={styles.passwordRules}>Contains at least 1 lowercase letter</Text> */}
            <Text style={styles.passwordRules}>Contains at least 1 uppercase letter</Text>
            {/* <Text style={styles.passwordRules}>Contains at least 1 special character {`[!@#$%^&*()]`}</Text> */}
        </View>
    )
}

export default PasswordRules

const styles = StyleSheet.create({
    container:{
        marginBottom: DeviceFractions.deviceH40
    },
    passwordRules:{
        fontSize: 12,
        color: Colors.accentColor,
        fontWeight: 'bold'
    }

})