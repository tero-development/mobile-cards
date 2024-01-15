import {View, StyleSheet, ScrollView} from 'react-native'
import Title from '../../UI/Title';
import Colors from '../../utils/colors';
import DeviceFractions from '../../utils/dimensions';
import QuestionNode from './QuestionNode';
import { wordStacker } from '../../utils/helperFunctions';

const QuizBuilder = ({questionArray, cafeTitle})=>{


    
    return (
        <ScrollView style={styles.screen}>
            <View style={styles.titleContainer}>
                    {
                        wordStacker(cafeTitle, {color: Colors.secondaryColor, fontSize: DeviceFractions.deviceHeight /22, fontWeight: 'bold', textAlign: 'right'})
                        
                    }
                    <Title color={Colors.secondaryColor}  textSize={DeviceFractions.deviceH30} textStyle={{fontWeight: 'normal',  textAlign: 'right'}} >Knowledge Check</Title>
            </View>
            <View style={styles.container}>
                {
                    questionArray.map(question => 
                        <QuestionNode key={questionArray.indexOf(question)} number={questionArray.indexOf(question)+1} questionObj={question} />)
                }
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    screen:{
        paddingTop: DeviceFractions.deviceHeight / 8
    },
    container:{
        flex: 1,
        paddingTop: DeviceFractions.deviceH40,
        alignItems: 'center',
        marginBottom: DeviceFractions.deviceHeight / 10 * 2
    },
    titleContainer:{
        paddingRight: DeviceFractions.deviceWidth / 8,
        marginBottom: DeviceFractions.deviceH50,
    },
    questionLineText:{
        fontSize: DeviceFractions.deviceH50
    }
})

export default QuizBuilder