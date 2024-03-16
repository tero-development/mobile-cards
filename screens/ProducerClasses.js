import {View, useWindowDimensions, ScrollView} from 'react-native'
import {useContext, useState, useEffect} from 'react'
import Title from '../UI/Title'
import { LinearGradient } from 'expo-linear-gradient'
import { ProducerContext } from '../store/producer-context'
import { CompanyContext } from '../store/company-context'
import { QuizContext } from '../store/quiz-context'
import { getAllCafes } from '../httpServices/cafes'
import { getMonths } from '../httpServices/producers'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'
import Loader from '../UI/Loader'
import BackButton from '../UI/BackButton'
import ClassListing from '../components/ProducerComponents/ClassListing'


const ProducerClasses = ({navigation, route}) =>{
    const {schedule} = useContext(ProducerContext)
    const {company} = useContext(CompanyContext)
    const {quizzes, updateQuizzes} = useContext(QuizContext)
    const [months, setMonths] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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

    const {classes} = schedule
    
 
    const routeDesignation = route.params.designation

    // useEffect(()=>{
// maybe you could load until classes is set by the async classRouting in ProducerMonths

    //     async function populateMonths(){
    //         try{
    //             const response = await getMonths('62d47c7a36aeee14652966cd', '650b8c8746533a5af871ba0a')
    //             if(response){
    //                 setMonths(response)
    //             }
    //         }catch(e){
    //             alert(e)
    //         }
    //     }

    //     populateMonths()

    //     return ()=>{

    //     }
    // },[])


    useEffect(()=>{
        if(classes.length > 0){
            setIsLoading(false)
        }
        
        return ()=>{}
    }, [classes])

    function navigateClasses(classes){
        navigation.navigate('ProducerClasses', {designation: routeDesignation, classes: classes})
    }

    function navigateBack(){
        navigation.navigate('ProducerScreen')
    }

    function openDrawer( ){
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
                            Select Class
                        </Title>
                </View>
                <View style={styles.container}>
                    <View style={styles.nodeContainer}>
                        {
                            //'selectedCafes' is assessment.currentSkillsChallenges, 'scheduledDates' is an array of all the offered dates per selectedCafe 
                            classes.length < 1 || isLoading ? <Loader size="large" color={Colors.accentColor} /> : 
                            classes.map(
                                classInstance => {
                                    return <ClassListing 
                                        key={classInstance._id}
                                        title={classInstance.title}
                                        date={classInstance.date_standard}
                                        time={classInstance.time}
                                        onPress={()=>console.log("it clicks!")}
                                    />
                                }
                            )
                            
                        }
                    </View>
                </View>
            </ScrollView>
            <BackButton viewStyle={{left:converter( width/70,  width/100,  width/70)}} textSize={converter(width/30, width/30, width/35)} iconSize={converter(width/20, width/25, width/25)} navigationHandler={navigateBack}/>
        </LinearGradient>
    )
}




export default ProducerClasses
