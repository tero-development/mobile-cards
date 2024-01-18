import {View, Text, StyleSheet} from 'react-native'
import Title from '../../UI/Title'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'

const ScoreGreeting = ({points, rank, name}) =>{
    return(
        <View style={styles.scoreContainer}>
        <View style={styles.scoreCircle}>
            <View style={styles.scoreInnerCircle}>
                <Text style={styles.scoreText}>{points}</Text>
            </View>
        </View>
        <Title color={Colors.secondaryColor} textSize={20}>{name}</Title>
        <Title color={Colors.secondaryColor} textSize={16}>Leaderboard Rank: {rank}</Title>
    </View>
    )
}

export default ScoreGreeting

const styles = StyleSheet.create({
    scoreContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: DeviceFractions.deviceH30,
    },
    scoreCircle:{
        borderWidth: 10,
        borderColor: Colors.secondaryColor,
        borderRadius: 100,
        padding: 65,
        height: DeviceFractions.deviceH10 * 1.5,
        width: DeviceFractions.deviceH10 * 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: DeviceFractions.deviceWidth / 60
    },
    scoreInnerCircle:{
        borderWidth: 10,
        borderColor: Colors.primaryColor,
        padding: 10,
        borderRadius: 100,
        height: DeviceFractions.deviceH10 * 1.3,
        width: DeviceFractions.deviceH10 * 1.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreText:{
        color: Colors.secondaryColor,
        fontSize: 40,
        fontWeight: 'bold'
    }
})
