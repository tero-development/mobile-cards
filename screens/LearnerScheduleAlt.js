import {View, StyleSheet, Text, ScrollView} from 'react-native'
import Title from '../UI/Title'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../utils/colors'
import ScheduleNode from '../components/ScheduleComponents/ScheduleNode'
import IconButton from '../UI/IconButton'
import DeviceFractions from '../utils/dimensions'


const LearnerSchedule = ({navigation, route}) =>{

    const openDrawer = () =>{
        navigation.toggleDrawer()
    }

    return(
        <LinearGradient style={styles.rootScreen} colors={['white', Colors.primaryColor]}>
            <IconButton isHeader={true} iconName='menu' iconSize={28} iconColor={Colors.secondaryColor} onPress={openDrawer}/>
            <Title color={Colors.secondaryColor} textSize={26} style={{marginTop: DeviceFractions.deviceH30, paddingLeft: DeviceFractions.deviceW20}}>Upcoming</Title>
            <View style={styles.container}>
                <ScrollView horizontal={true} style={styles.nodeContainer}>
                    <ScheduleNode/>
                    <ScheduleNode/>
                    <ScheduleNode/>
                    <ScheduleNode/>
                    <ScheduleNode/>
                </ScrollView>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    rootScreen:{
        flex: 1
    },
    container:{
        flex: 1,
        paddingTop: DeviceFractions.deviceH40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nodeContainer:{
        paddingLeft: DeviceFractions.deviceW20
    }
})

export default LearnerSchedule