import {View, Text, useWindowDimensions, Animated} from 'react-native'
import { useEffect, useRef } from 'react'
import Title from '../../UI/Title'
import Colors from '../../utils/colors'
import {converterSetup, useStyles} from '../../utils/dimensions'
import { Easing } from 'react-native-reanimated'

const ScoreGreeting = ({points, rank, name}) =>{

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const postiveSpinValue = useRef(new Animated.Value(0)).current
    const negativeSpinValue = useRef(new Animated.Value(0)).current

    const rotate = postiveSpinValue.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg', '360deg']
    })

    const negativeRotate = negativeSpinValue.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg', '360deg']
    })

    function spinPositive(){
        postiveSpinValue.setValue(0)
        Animated.timing(postiveSpinValue, {
            toValue: 1,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: true
          }).start(()=> spinPositive())  
    }

    // function spinNegative(){
    //     postiveSpinValue.setValue(0)
    //     Animated.timing(postiveSpinValue, {
    //         toValue: 1,
    //         duration: 9000,
    //         easing: Easing.linear,
    //         useNativeDriver: true
    //       }).start(()=> spinNegative())  
    // }

    useEffect(()=>{
        spinPositive()
    },[])

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
            borderRightWidth: 0,
            padding: converter(45,65, 60),
            height: converter(height/10 * 0.5,height/10 * 1.4, height/10 * 1.8),
            width: converter(height/10 * 0.5,height/10 * 1.4, height/10 * 1.8),
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: width / 60,
            transform: [{rotate}]
        },
        scoreInnerCircle:{
            borderWidth: converter(7, 10, 15),
            borderLeftWidth: 0,
            borderRadius: converter(100, 100, 150),
            borderColor: Colors.primaryColor,
            padding: converter(5,10,10),
            height: converter(height/10 * 1.2, height/10 * 1.2, height/10 * 1.3),
            width: converter(height/10 * 1.2, height/10 * 1.2, height/10 * 1.3),
            justifyContent: 'center',
            alignItems: 'center',
                transform: [{rotate}]
        },
        scoreText:{
            color: Colors.secondaryColor,
            fontSize: converter(25, 40, 70),
            fontWeight: 'bold',
            position: 'absolute',
            bottom: '50%'
        }
    }
 
    const styles = useStyles(localStyles)


    return(
        <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{points}</Text>
        <Animated.View style={styles.scoreCircle}>
            <Animated.View style={styles.scoreInnerCircle}>
            </Animated.View>
        </Animated.View>
        <Title color={Colors.secondaryColor} textSize={converter(16, 20, 34)}>{name}</Title>
        <Title color={Colors.secondaryColor} textSize={converter(12, 16, 28)}>Leaderboard Rank: {rank}</Title>
    </View>
    )
}

export default ScoreGreeting
