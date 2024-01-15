import {View, Text, StyleSheet} from 'react-native'
import React, { useMemo, useState } from 'react';
import AnswerButton from './AnswerButton';
import DeviceFractions from '../../utils/dimensions';
import Colors from '../../utils/colors';

const QuestionNode = ({questionObj, number}) =>{
    const {
        question, 
        answers
    } = questionObj
     const[answer, setAnswer] = useState('')
     const[current, setCurrent] = useState('')
     
     
    return(
        <View style={styles.container}>
            <Text style={styles.questionLineText}>{`${number}. ${question}`}</Text>
            <View style={styles.answerContainer}>
                {
                    answers.map(entry => <AnswerButton 
                        id={answers.indexOf(entry)} 
                        key={answers.indexOf(entry)} 
                        value={entry.value}
                        onPress={setAnswer} 
                        label={entry.label}
                        setCurrent={setCurrent}
                        current={current}
                    />)
                }
            </View>
             
        </View>
    )
}

export default QuestionNode

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    container:{
        borderWidth: 2,
        borderRadius: 10,
        width: DeviceFractions.deviceWidth / 10 * 7.5,
        borderColor: Colors.secondaryColor,
        padding: DeviceFractions.deviceW30,
        marginBottom: DeviceFractions.deviceH40
    },
    answerContainer:{
        paddingLeft: DeviceFractions.deviceW30
    },
    questionLineText:{
        fontSize: DeviceFractions.deviceHeight / 60,
        marginBottom: DeviceFractions.deviceHeight / 100,
        color: Colors.secondaryColor,
        fontWeight: 'bold'
    }
})