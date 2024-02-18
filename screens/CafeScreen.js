import {View, Text, useWindowDimensions, ScrollView, Pressable} from 'react-native'
import {useContext, useState, useEffect} from 'react'
import Title from '../UI/Title'
import { LinearGradient } from 'expo-linear-gradient'
import { CafeContext } from '../store/cafe-context'
import { CompanyContext } from '../store/company-context'
import { QuizContext } from '../store/quiz-context'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'
import BackButton from '../UI/BackButton'
// import ScenarioModal from '../components/CafeComponents/ScenarioModal'


const CafeScreen = ({navigation, route}) =>{
    const {cafeDetails} = useContext(CafeContext)
    const {company} = useContext(CompanyContext)
    const {quizzes, updateQuizzes} = useContext(QuizContext)
    const [isLoading, setIsLoading] = useState(true)
    const [modalIsVisible, setModalIsVisble] = useState(false)


    const {title, scenarios, quiz} = route.params

    const {scenario1, scenario2} = scenarios
    
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = { 
        rootScreen:{
            flex: 1
        },
        scrollContainer:{
            paddingTop: height / 8
        },
        container:{
            flex: 1,
            paddingTop: height/40,
            alignItems: 'center',
        },
        nodeContainer:{
            marginBottom:  height / 7
        },
        modal:{
            flex:1
        },
        modalInnerContainer:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'turquoise'
        }
    }

    const styles = useStyles(localStyles)
 

    // useEffect(()=>{
    //     async function retrieveQuizzes(){
    //         try{
    //             const response = await getAllCafes(company._id)
    //             if(response){
    //                 updateQuizzes(response.map(entry => { 
    //                     return {title: entry.title, quizSet: entry.quizSet}
    //                 }))
                    
    //             }
    //         }catch(e){
    //             alert(e)
    //         }
    //     }

    //     retrieveQuizzes()

    //     return ()=>{

    //     }
    // },[])

    // useEffect(()=>{
    //     if(quizzes.length > 0){
    //         setIsLoading(false)
    //     }
        
    //     return ()=>{}
    // }, [quizzes])

    function navigateQuiz(quiz){
        navigation.navigate("QuizScreen", {quiz: quiz})
    } 

    function navigateBack(){
        navigation.navigate('CafeListScreen')
    }

    function closeModalHandler(){
        setModalIsVisble(false)
    }

    const {selectedCafes, scheduledDates} = cafeDetails


    function openDrawer({}){
        navigation.toggleDrawer()
    }


    return(
        <LinearGradient style={styles.rootScreen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={false} iconName='menu'  iconColor={Colors.secondaryColor} onPress={openDrawer} viewStyle={{position: 'absolute', left: width/20, top: height/10, zIndex: 1}}/>
            <ScrollView style={styles.scrollContainer}>
            <View style={{alignItems: 'center', marginBottom: height/40}}>
                <Title 
                    color={Colors.secondaryColor} 
                    large={true} 
                    style={{
                        marginTop: height/30,  
                        width: width / 10 * 8, 
                        textAlign:'right'}}
                >
                    {title}
                </Title>
            </View>
            <View style={styles.container}>
                <View>
                    <Text>{scenario1}</Text>
                    <Text>{scenario2}</Text>
                </View>
            </View>
            </ScrollView>
            <BackButton viewStyle={{left:converter( width/70,  width/100,  width/70)}} textSize={converter(width/30, width/30, width/35)} iconSize={converter(width/20, width/25, width/25)} navigationHandler={navigateBack}/>
            {/* {(scheduledDates.length > 0 && modalIsVisble) && <ScenarioModal visible={modalIsVisible} closeModalHandler={closeModalHandler}/> } */}
        </LinearGradient>
    )
}




export default CafeScreen
