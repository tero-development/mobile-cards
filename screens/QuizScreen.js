import {useWindowDimensions} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import QuizBuilder from '../components/QuizComponents/QuizBuilder'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'

const QuizScreen = ({navigation, route}) =>{

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


    // function openDrawer({}){
    //     navigation.toggleDrawer()
    // }

    
    function navigateCafeList(){
        navigation.navigate('CafeScreen', route.params)
    }

    const quizObject = route.params


    return(
        <LinearGradient style={styles.screen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={false} iconName='close' iconColor={Colors.secondaryColor} onPress={navigateCafeList} viewStyle={{position: 'absolute', left: width/20, top: height/10, zIndex: 1}}/>
            <QuizBuilder cafeTitle={quizObject.title} questionArray={quizObject.quizSet} />
        </LinearGradient>
    )
}

export default QuizScreen