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

    const negativeRotate = postiveSpinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
    })


    function spinPositive(){
        postiveSpinValue.setValue(0)
  
          Animated.timing(postiveSpinValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true
          }).start(()=> spinPositive()) 
      
    }


    useEffect(()=>{
        spinPositive()
        return ()=>{}
    },[])

    const localStyles = {
        scoreContainer:{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: height/30,
        },
        upperContainer:{
            height: height/10*2.5,
            width: width/2
        },
        scoreCircle:{
            borderWidth: converter(7, 10, 20),
            borderColor: converter(Colors.secondaryColor, Colors.secondaryColor, Colors.primaryColor400),
            borderRadius: converter(100, 100, 150),
            padding: converter(45,65, 60),
            height: converter(height/10 * 0.5,height/10 * 1.4, height/10 * 1.8),
            width: converter(height/10 * 0.5,height/10 * 1.4, height/10 * 1.8),
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: rotate}],
            zIndex: converter(1, 1, 1)
        },
        scoreCircleLine:{
            borderWidth: converter(0, 0, 0),
            borderLeftWidth: converter(6, 10, 6),
            borderRightWidth: converter(0, 0, 20),
            borderBottomWidth: converter(6, 10, 8),
            borderTopWidth: converter(0, 0, 15),
            borderColor: converter(Colors.primaryColor400, Colors.primaryColor400, Colors.secondaryColor),
            borderRadius: converter(100, 100, 150),
            // borderRadius: converter(100, 10, 150),
            padding: converter(45,65, 60),
            height: converter(height/10 * 0.5,height/10 * 1.4, height/10 * 1.8),
            width: converter(height/10 * 0.5,height/10 * 1.4, height/10 * 1.8),
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: rotate}],
            zIndex: converter(2,2,2)
        },
        scoreInnerCircle:{
            borderWidth: converter(7, 10, 18),
            // borderLeftWidth: 0,
            borderRadius: converter(100, 100, 150),
            borderColor: Colors.primaryColor,
            padding: converter(5,10,10),
            height: converter(height/10 * 1.2, height/10 * 1.2, height/10 * 1.3),
            width: converter(height/10 * 1.2, height/10 * 1.2, height/10 * 1.3),
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: negativeRotate}],
            zIndex:converter(1, 1, 1)

        },
        scoreInnerCircleLine:{
            borderWidth: converter(0, 0, 0),
            borderLeftWidth: converter(7, 10, 15),
            borderTopWidth: converter(7, 10, 15),
            borderRadius: converter(100, 100, 150),
            borderColor: Colors.secondaryColor400,
            padding: converter(5,10,10),
            height: converter(height/10 * 1.2, height/10 * 1.2, height/10 * 1.3),
            width: converter(height/10 * 1.2, height/10 * 1.2, height/10 * 1.3),
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: negativeRotate}],
            zIndex: converter(2, 2, 2)
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
            <View style={styles.upperContainer}>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Animated.View style={styles.scoreCircle}>
                    </Animated.View>
                </View>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Animated.View style={styles.scoreCircleLine}>
                    </Animated.View>
                </View>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Animated.View style={styles.scoreInnerCircle}>
                    </Animated.View>
                </View>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Animated.View style={styles.scoreInnerCircleLine}>
                    </Animated.View>
                </View>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.scoreText}>{points}</Text>
                </View>
            </View>
        <Title color={Colors.secondaryColor} textSize={converter(16, 20, 34)}>{name}</Title>
        <Title color={Colors.secondaryColor} textSize={converter(12, 16, 28)}>Leaderboard Rank: {rank}</Title>
    </View>
    )
}

export default ScoreGreeting
