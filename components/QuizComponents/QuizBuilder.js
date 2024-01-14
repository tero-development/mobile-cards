import {View, StyleSheet, Text} from 'react-native'
import React, { useMemo, useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import DeviceFractions from '../../utils/dimensions';
import QuestionNode from './QuestionNode';

const QuizBuilder = ()=>{

    const answerList = [
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'One',
            value: 'option1'
        },
        {
            id: '2',
            label: 'Two',
            value: 'option2'
        },
        {
            id: '3',
            label: 'Three',
            value: 'option3'
        }
    ]

    return (
        <View style={styles.container}>
            <QuestionNode questionNum={1} questionText={'How many sides are there on the Triforce?'} answerArray={answerList}/>
            <QuestionNode questionNum={1} questionText={'How many sides are there on the Triforce?'} answerArray={answerList}/>
        </View>
    );

}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    container:{
    },
    radioGroupContainer:{
        alignItems: 'flex-start'
    },
    questionLineText:{
        fontSize: DeviceFractions.deviceH50
    }
})

export default QuizBuilder