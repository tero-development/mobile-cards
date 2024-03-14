import {View, useWindowDimensions, ScrollView} from 'react-native'
import {useContext, useState, useEffect} from 'react'
import Title from '../UI/Title'
import { LinearGradient } from 'expo-linear-gradient'
import { CafeContext } from '../store/cafe-context'
import { CompanyContext } from '../store/company-context'
import { QuizContext } from '../store/quiz-context'
import { getAllCafes } from '../httpServices/cafes'
import Colors from '../utils/colors'
import CafeListing from '../components/CafeComponents/CafeListing'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'
import Loader from '../UI/Loader'
import BackButton from '../UI/BackButton'


const ProducerClasses = ({navigation, route}) =>{
    const {cafeDetails} = useContext(CafeContext)
    const {company} = useContext(CompanyContext)
    const {quizzes, updateQuizzes} = useContext(QuizContext)
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
 
    //The mongo pipleline should target the cafedates and be based on this designation
    const routeDesignation = route.designation

    useEffect(()=>{
        async function retrieveQuizzes(){
            try{
                const response = await getAllCafes(company._id)
                if(response){
                    updateQuizzes(response.map(entry => { 
                        return {title: entry.title, scenario: entry.scenario, quizSet: entry.quizSet}
                    }))
                    
                }
            }catch(e){
                alert(e)
            }
        }

        retrieveQuizzes()

        return ()=>{

        }
    },[])

    useEffect(()=>{
        if(quizzes.length > 0){
            setIsLoading(false)
        }
        
        return ()=>{}
    }, [quizzes])

    function navigateClasses(classes){
        navigation.navigate('ProducerClasses', {designation: routeDesignation, classes: classes})
    }


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
                            ExSellerators
                        </Title>
                </View>
                <View style={styles.container}>
                    <View style={styles.nodeContainer}>
                        {
                            //'selectedCafes' is assessment.currentSkillsChallenges, 'scheduledDates' is an array of all the offered dates per selectedCafe 
                            (selectedCafes.length < 1 && scheduledDates.length < 1) || isLoading ? <Loader size="large" color={Colors.accentColor} /> : 
                            selectedCafes.map(
                                month => {
                                    const classes = month.classes
                                    return <CafeListing 
                                        key={month.montName}
                                        title={month.montName}
                                        onPress={()=>navigateClasses(classes)}
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
