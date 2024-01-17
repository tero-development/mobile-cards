import {useMemo, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'
import LabeledInput from '../LabeledInput'

const QuestionBuilder = ({navigation}) =>{
    const [question, setQuestion] = useState('')
    const [answers, setAnswers] = useState([
        {
            label: '',
            value: ''
        },
        {
            label: '',
            value: ''
        },
        {
            label: '',
            value: ''
        },
        {
            label: '',
            value: ''
        }
    ])

    console.log('question: ')
    console.log(question)
    console.log('')
    console.log('answers: ')
    console.log(answers)

    let answerFields = []

    for(let i =0 ; i< answers.length ; i++){
        answerFields.push(
            <LabeledInput
                key={i} 
                label={`answer ${i+1}`} 
                color={Colors.secondaryColor}
                style={styles.inputStyle}
                textInputConfig={{
                    onChangeText:(text)=>{setAnswers(prev =>{
                        return ([ prev[i] = {label: text, value: text}, ...prev])
                    })},
                    autoCorrect: true, 
                    autoCapitalize:'words',
                    value: question
                }}                             
            />
        )
    }

console.log(question)
    return(
        <View>
            <LabeledInput 
                label={"Question"} 
                color={Colors.secondaryColor}
                style={styles.inputStyle}
                textInputConfig={{
                    onChangeText:(text)=>{setQuestion(text)},
                    autoCorrect: true, 
                    autoCapitalize:'words',
                    value: question
                }}                             
            />
            {
                answerFields
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    container:{
        flex: 1,
        alignItems: 'center'
    },
    inputStyle:{
        width: DeviceFractions.deviceWidth / 10 * 6,
        height: DeviceFractions.deviceWidth / 10,
        marginBottom: DeviceFractions.deviceH40
    }
})

export default QuestionBuilder