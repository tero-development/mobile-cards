import {useMemo} from 'react'
import {useWindowDimensions} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import QuizBuilder from '../components/QuizComponents/QuizBuilder'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'

const QuizScreen = ({navigation}) =>{

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        screen:{
            flex: 1
        },
        container:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }

    const styles = useStyles(localStyles)


    function openDrawer({}){
        navigation.toggleDrawer()
    }
    const questionList = useMemo(() => [
        {
            question: 'What is the capital of New York State?',
            answers: [ 
                {
                    label: 'Manhattan',
                    value: 'Manhattan'
                },
                {
                    label: 'Rochester',
                    value: 'Rochester'
                },
                {
                    label: 'Monticello',
                    value: 'Monticello'
                },
                {
                    label: 'Ames',
                    value: 'Ames'
                }
            ]
        },
        {
            question: 'How many colors are in regular pack of M&Ms',
            answers: [ {
                label: '7',
                value: '7'
            },
            {
                label: '8',
                value: '8'
            },
            {
                label: '5',
                value: '5'
            },
            {
                label: '6',
                value: '6'
            }
        ]
        },
        {
            question: 'Which is the only country that is also a continent?',
            answers: [ {
                label: 'Australia',
                value: 'Australia'
            },
            {
                label: 'Canada',
                value: 'Canada'
            },
            {
                label: 'South Africa',
                value: 'South Africa'
            },
            {
                label: 'Russia',
                value: 'Russia'
            }
        ]
        },
        {
            question: 'What is the official language of the United States?',
            answers: [ {
                label: 'Iriquois',
                value: 'Iriquois'
            },
            {
                label: 'Spanish',
                value: 'Spanish'
            },
            {
                label: 'English',
                value: 'English'
            },
            {
                label: 'none',
                value: 'none'
            }
        ]
        },
        {
            question: 'Who is the author of Game of Thrones?',
            answers:[
                {
                    label: 'Michael Crichton',
                    value: 'Michael Crichton'
                },
                {
                    label: 'Anne Rice',
                    value: 'Anne Rice'
                },
                {
                    label: ' J. R. R. Tolkien',
                    value: ' J. R. R. Tolkien'
                },
                {
                    label: 'George R.R. Martin',
                    value: 'George R.R. Martin'
                }
            ]
        }
        
    ], []);
    return(
        <LinearGradient style={styles.screen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={false} iconName='menu'  iconColor={Colors.secondaryColor} onPress={openDrawer} viewStyle={{position: 'absolute', left: width/20, top: height/10, zIndex: 1}}/>
            <QuizBuilder cafeTitle='Handling Questions' questionArray={questionList} />
        </LinearGradient>
    )
}

export default QuizScreen