import {View, Text, useWindowDimensions, Pressable, ScrollView, Animated} from 'react-native'
import {useContext, useState, useRef, useEffect} from 'react'
import Title from '../UI/Title'
import { LinearGradient } from 'expo-linear-gradient'
import { CafeContext } from '../store/cafe-context'
import { CompanyContext } from '../store/company-context'
import { QuizContext } from '../store/quiz-context'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'
import BackButton from '../UI/BackButton'
import CafeListing from '../components/CafeComponents/CafeListing'
import { Easing } from 'react-native-reanimated'
// import ScenarioModal from '../components/CafeComponents/ScenarioModal'


const CafeScreen = ({navigation, route}) =>{
    const {cafeDetails} = useContext(CafeContext)
    const {company} = useContext(CompanyContext)
    // const {quizzes, updateQuizzes} = useContext(QuizContext)
    const [quizLock, setQuizLock] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [modalIsVisible, setModalIsVisble] = useState(false)
    const [activeSection, setActiveSection] = useState("")

    const {title, scenarios, quiz} = route.params

    const {scenario1, scenario2} = scenarios
    
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = { 
        screen:{
            flex: 1
        },
        scrollContainer:{
            paddingTop: height / 12
        },
        container:{
            flex: 1,
            paddingTop: converter(height/75),
            alignItems: 'center',
        },
        modal:{
            flex:1
        },
        modalInnerContainer:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'turquoise'
        },
        scenarioContainer:{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        scenarioSubContainer:{
            height: converter(height/2.15),
            width: width/10 * 7,
            backgroundColor: Colors.accentColor400,
            paddingHorizontal: converter(width/20),
            paddingTop: converter(width/35),
            paddingBottom: converter(width/50),
            borderRadius: converter(width/25, width/20, width/20, width/25),
            marginHorizontal: width/10*1.5 ,
            justifyContent: 'space-between'
        },
        scenarioText:{
            color: Colors.highlightColor,
            fontSize: converter(width/35),
            marginBottom: converter(width/50)
        },
        scenarioNavText:{
            color: Colors.highlightColor,
            fontSize: converter(width/30),
            marginBottom: converter(width/50)
        },
        firstScenarioNav:{
            flexDirection: 'row',
            justifyContent: "flex-end",
            alignItems: 'center'
        },
        midScenarioNav:{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center'
        },
        lastScenarioNav:{
            flexDirection: 'row',
            justifyContent: "flex-start",
            alignItems: 'center'
        },
        pressSet:{
            flexDirection: 'row',
            alignItems: 'flex-start'
        }
    }

    const styles = useStyles(localStyles)
 

    function navigateQuiz(quizObject){
        navigation.navigate("QuizScreen", quizObject)
    } 

    function navigateBack(){
        navigation.navigate('CafeListScreen')
    }

    function closeModalHandler(){
        setModalIsVisble(false)
    }

    function openDrawer({}){
        navigation.toggleDrawer()
    }

    const translation = useRef(new Animated.Value(0)).current

    function move(amount){
        Animated.timing(translation, {
            toValue: amount,
            easing: Easing.ease,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    function moveMiddleHandler(){
        move(-width)
    }

    function moveFirstHandler(){
        move(0)
    }

    function moveLastHandler(){
        move(-width*2)
    }


    

    
    
    const ScenarioNavigation = ({type}) =>{
        if(type==="first"){
            return(
                <View style={styles.firstScenarioNav}>
                    <Pressable style={styles.pressSet} onPress={moveMiddleHandler}>
                        <Text style={styles.scenarioNavText}>Process</Text>
                        <IconButton 
                            isHeader={false} iconName={ "caret-forward-outline"}   iconColor={Colors.highlightColor} iconSize={converter(width/20)}
                        />
                    </Pressable>
                </View>
                
            )
        }
        if(type==="middle"){
            return(
                <View style={styles.midScenarioNav}>
                    <Pressable style={styles.pressSet} onPress={moveFirstHandler}>
                        <IconButton 
                            isHeader={false} iconName={ "caret-back-outline"}   iconColor={Colors.highlightColor} iconSize={converter(width/20)}
                            />
                        <Text style={styles.scenarioNavText}>Background</Text>
                    </Pressable>
                    <Pressable style={styles.pressSet} onPress={moveLastHandler}>
                        <Text style={styles.scenarioNavText}>Remember</Text>
                        <IconButton 
                            isHeader={false} iconName={ "caret-forward-outline"}   iconColor={Colors.highlightColor} iconSize={converter(width/20)}
                            />
                    </Pressable>
                </View>
                
            )
        } if(type==="last"){
            return(
                <View style={styles.lastScenarioNav}>
                    <Pressable style={styles.pressSet} onPress={moveMiddleHandler}>
                        <IconButton 
                            isHeader={false} iconName={ "caret-back-outline"}   iconColor={Colors.highlightColor} iconSize={converter(width/20)}
                            />
                        <Text style={styles.scenarioNavText}>Process</Text>
                    </Pressable>
                </View>
                
            )
        }
       
    }

    return(
        <LinearGradient style={styles.screen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={false} iconName='close' iconColor={Colors.secondaryColor} onPress={navigateBack} viewStyle={{position: 'absolute', left: width/20, top: height/10, zIndex: 1}}/>
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
                <CafeListing locked={quizLock} title={"Knowledge Check"} onPress={()=> !quizLock && navigateQuiz(route.params)}/>
            </View>
                <Animated.View style={[styles.screen, {transform: [{translateX: translation}]}]}>
                    <View style={styles.scenarioContainer}>
                        <View style={styles.scenarioSubContainer}>
                            <View>
                                <Title color={Colors.highlightColor} textSize={converter(width/15)} style={{marginBottom: converter(width/40)}}>Scenario</Title>
                                <Text style={styles.scenarioText}>Some customers like to test salespeople. You believe successfully handling hostile customer questions and objections is a powerful differentiator over your competitors.</Text>
                                <Text style={styles.scenarioText}>You know that when faced with aggression, the first human challenge is to resist getting defensive or apologetic and remain assertive. You also know that providing a factual and logical answer to a hostile question or objection sometimes results in the customer escalating and arguing their point further. Going deeper by addressing where the customer is coming from and reframing the question can shift the interaction and demonstrate why they should do business with you. The L, A, Q method Corteva teaches can also be highly effective.</Text>                             
                            </View>
                            <ScenarioNavigation type={"first"}/>
                        </View>
                        <View style={styles.scenarioSubContainer}>
                            <View>
                                <Title color={Colors.highlightColor} textSize={converter(width/15)} style={{marginBottom: converter(width/40)}}>Process </Title>
                                <Text style={styles.scenarioText}>1.	Have each member of your breakout group share the most hostile question you’ve either experienced or expect to encounter this selling season. </Text>
                                <Text style={styles.scenarioText}>2.	Reach consensus on one hostile question to focus on for this exercise.</Text>
                                <Text style={styles.scenarioText}>3.	Use the techniques from the Handling Questions Clinic to formulate a recommendation on how to respond to this one hostile question.</Text>
                                <Text style={styles.scenarioText}>4.	Prepare a 4-minute presentation to share with the larger group.  </Text>
                            </View>
                            <ScenarioNavigation type={"middle"}/>
                        </View>
                        <View style={styles.scenarioSubContainer}>
                            <View>
                                <Title color={Colors.highlightColor} textSize={converter(width/15)} style={{marginBottom: converter(width/40)}}>Remember </Title>
                                <Text style={styles.scenarioText}>•	Quality and content matters – you’re competing for points.</Text>
                                <Text style={styles.scenarioText}>•	Get started right away – you have 10 minutes so use them well.</Text>
                                <Text style={styles.scenarioText}>•	Differentiator – get most if not all team members involved in the 4-minute presentation.</Text>
                            </View>
                            <ScenarioNavigation type={"last"}/>
                        </View>
                    </View>
                </Animated.View> 
            </ScrollView>
            {/* {(scheduledDates.length > 0 && modalIsVisble) && <ScenarioModal visible={modalIsVisible} closeModalHandler={closeModalHandler}/> } */}
        </LinearGradient>
    )
}




export default CafeScreen
