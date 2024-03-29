import {View, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import DeviceFractions from '../utils/dimensions'
import QuestionBuilder from '../components/QuizComponents/QuestionBuilder'

const QuizAdminScreen = ({navigation}) =>{

    function openDrawer({}){
        navigation.toggleDrawer()
    }

    return(
        <LinearGradient style={styles.screen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={false} iconName='menu' iconSize={28} iconColor={Colors.secondaryColor} onPress={openDrawer} viewStyle={{position: 'absolute', left: DeviceFractions.deviceW20, top: DeviceFractions.deviceH10, zIndex: 1}}/>
            <View style={styles.builderContainer}>
                <QuestionBuilder />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    container:{
        flex: 1,
        alignItems: 'center'
    },
    builderContainer:{
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default QuizAdminScreen