import {View, Text, useWindowDimensions} from 'react-native'
import  {converterSetup, useStyles} from '../../utils/dimensions'
import Colors from '../../utils/colors'

const PasswordRules = () =>{
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        container:{
            marginBottom: height/40,
        },
        passwordRules:{
            fontSize: converter(width/35, width/30, width/35, width/40),
            color: Colors.accentColor,
            fontWeight: 'bold'
        }
    
    }

    const styles = useStyles(localStyles)
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

