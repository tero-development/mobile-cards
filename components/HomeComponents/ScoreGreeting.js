import {View, Text, useWindowDimensions} from 'react-native'
import Title from '../../UI/Title'
import Colors from '../../utils/colors'
import {converterSetup, useStyles} from '../../utils/dimensions'

const ScoreGreeting = ({points, rank, name}) =>{

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        scoreContainer:{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: height/30,
        },
        scoreCircle:{
            borderWidth: converter(7, 10, 15),
            borderColor: Colors.secondaryColor,
            borderRadius: converter(100, 100, 150),
            padding: converter(45,65, 60),
            height: converter(height/10 * 0.5,height/10 * 1.5, height/10 * 1.8),
            width: converter(height/10 * 0.5,height/10 * 1.5, height/10 * 1.8),
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: width / 60
        },
        scoreInnerCircle:{
            borderWidth: converter(7, 10, 15),
            borderColor: Colors.primaryColor,
            padding: converter(5,10,10),
            borderRadius: converter(100, 100, 150),
            height: converter(height/10 * 1.2, height/10 * 1.3, height/10 * 1.3),
            width: converter(height/10 * 1.2, height/10 * 1.3, height/10 * 1.3),
            justifyContent: 'center',
            alignItems: 'center'
        },
        scoreText:{
            color: Colors.secondaryColor,
            fontSize: converter(25, 40, 70),
            fontWeight: 'bold'
        }
    }
 
    const styles = useStyles(localStyles)


    return(
        <View style={styles.scoreContainer}>
        <View style={styles.scoreCircle}>
            <View style={styles.scoreInnerCircle}>
                <Text style={styles.scoreText}>{points}</Text>
            </View>
        </View>
        <Title color={Colors.secondaryColor} textSize={converter(16, 20, 35)}>{name}</Title>
        <Title color={Colors.secondaryColor} textSize={converter(14, 16, 30)}>Leaderboard Rank: {rank}</Title>
    </View>
    )
}

export default ScoreGreeting
