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
            borderWidth: width/50,
            borderColor: converter(Colors.secondaryColor, Colors.secondaryColor, Colors.secondaryColor, Colors.secondaryColor),
            borderRadius: converter(100, 100, 150, 150),
            padding: converter(width/10*1.35,width/10*1.6, 60, 60),
            height: converter(height/10 * 0.5,height/10 * 1.4, height/10 * 1.8, height/10 * 1.8),
            width: converter(height/10 * 0.5,height/10 * 1.4, height/10 * 1.8, height/10 * 1.8),
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: rotate}],
            zIndex: converter(1, 1, 1, 1, 1)
        },
        scoreCircleLine:{
            borderWidth: converter(0, 0, 0, 0),
            borderLeftWidth: converter(6, 10, 10,10),
            borderRightWidth: converter(0, 0, 0, 0),
            borderBottomWidth: converter(6, 10, 10, 10),
            borderTopWidth: converter(0, 0, 0, 0),
            borderColor: converter(Colors.primaryColor400, Colors.primaryColor400, Colors.primaryColor400, Colors.primaryColor400),
            borderRadius: converter(100, 100, 150, 150),
            padding: converter(width/10*1.4,width/10*1.65, 60, 60),
            height: converter(height/10 * 0.5,height/10 * 1.4, height/10 * 1.8, height/10 * 1.78),
            width: converter(height/10 * 0.5,height/10 * 1.4, height/10 * 1.8, height/10 * 1.78),
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: rotate}],
            zIndex: converter(2,2,2),
            marginLeft: converter(0, 0, width/75, width/100)
        },
        scoreInnerCircle:{
            borderWidth: converter(7, 10, 18, 18),
            // borderLeftWidth: 0,
            borderRadius: converter(100, 100, 150, 150),
            borderColor: Colors.primaryColor,
            padding: converter(10,10,10, 10),
            height: converter(height/10 * 1.2, height/10 * 1.2, height/10 * 1.3, height/10 * 1.3),
            width: converter(height/10 * 1.2, height/10 * 1.2, height/10 * 1.3, height/10 * 1.3),
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: negativeRotate}],
            zIndex:converter(1, 1, 1, 1)

        },
        scoreInnerCircleLine:{
            borderWidth: converter(0, 0, 0, 0),
            borderLeftWidth: converter(7, 10, 15, 15),
            borderTopWidth: converter(7, 10, 15, 15),
            borderRadius: converter(100, 100, 150, 150),
            borderColor: Colors.secondaryColor400,
            padding: converter(5,10,10, 10),
            height: converter(height/10 * 1.2, height/10 * 1.2, height/10 * 1.3, height/10 * 1.3),
            width: converter(height/10 * 1.2, height/10 * 1.2, height/10 * 1.3, height/10 * 1.3),
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: negativeRotate}],
            zIndex: converter(2, 2, 2, 2)
        },
        scoreText:{
            color: Colors.secondaryColor,
            fontSize: converter(width/10*1, width/10*1.2, width/10*1, width/10*0.90),
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
        <Title color={Colors.secondaryColor} textSize={converter(16, 20, 34, 34)}>{name}</Title>
        <Title color={Colors.secondaryColor} textSize={converter(12, 16, 28, 28)}>Leaderboard Rank: {rank}</Title>
    </View>
    )
}

export default ScoreGreeting
