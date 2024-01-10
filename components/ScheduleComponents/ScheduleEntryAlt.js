import {View, Text, StyleSheet} from 'react-native'
import Colors from '../../utils/colors'

const ScheduleEntry = () =>{
    return(
        <View style={styles.container}>
            <Text style={styles.text}>February 12, 2024</Text>
            <View style={styles.clickBox}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.highlightColor500,
        paadingVertical: 12,
        paddingHorizontal: 18,
        width: '85%',
        height: '15%',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 5,
        overflow: 'hidden'
    },
    text:{
        color: Colors.secondaryColor,
        fontWeight: 'bold'
    },
    clickBox:{
        backgroundColor: Colors.highlightColor,
        height: 15,
        width: 15,
        borderRadius: 3
    }
})

export default ScheduleEntry