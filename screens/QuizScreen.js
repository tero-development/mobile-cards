import {View, Text, StyleSheet} from 'react-native'
import QuizBuilder from '../components/QuizComponents/QuizBuilder'

const QuizScreen = () =>{
    return(
        <View style={styles.container}>
            <QuizBuilder numQuestions={1} questionText={'How many sides are on the Triforce?'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default QuizScreen