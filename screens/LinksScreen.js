import {View, Text, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import DeviceFractions from '../utils/dimensions'

const LinkScreen = ({navigation}) =>{

    function openDrawer({}){
        navigation.toggleDrawer()
    }
   
    return(
        <LinearGradient style={styles.screen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={false} iconName='menu' iconSize={28} iconColor={Colors.secondaryColor} onPress={openDrawer} viewStyle={{position: 'absolute', left: DeviceFractions.deviceW20, top: DeviceFractions.deviceH10, zIndex: 1}}/>
            <View style={styles.container}>
                <Text>Link Screen</Text>
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
        justifyContent:'center',
        alignItems: 'center'
    }
})

export default LinkScreen
