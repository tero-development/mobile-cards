import {View, Text, StyleSheet} from 'react-native'
import React, { useMemo, useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import DeviceFractions from '../../utils/dimensions';


const QuestionNode = ({questionNum, questionText, answerArray}) =>{
     const[answer, setAnswer] = useState('')

     const radioButtons = useMemo(() => (answerArray), []);

    return(
        <View style={styles.container}>
            <Text style={styles.questionLineText}>{`${questionNum}. ${questionText}`}</Text>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={setAnswer}
                answer={answer}
                containerStyle={styles.radioGroupContainer}
            />
        </View>
    )
}

export default QuestionNode

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    container:{
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: DeviceFractions.deviceH40
    },
    radioGroupContainer:{
        alignItems: 'flex-start'
    },
    questionLineText:{
        fontSize: DeviceFractions.deviceH50
    }
})