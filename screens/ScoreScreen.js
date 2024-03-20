import {View, useWindowDimensions, FlatList, Text} from 'react-native'
import {useContext, useState, useEffect} from 'react'
import Title from '../UI/Title'
import { LinearGradient } from 'expo-linear-gradient'
import { ProducerContext } from '../store/producer-context'
import { CompanyContext } from '../store/company-context'
import { QuizContext } from '../store/quiz-context'
import { getDetailedRoster } from '../httpServices/producers'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'
import Loader from '../UI/Loader'
import BackButton from '../UI/BackButton'
import ClassListing from '../components/ProducerComponents/ClassListing'
import ScoreListing from '../components/ProducerComponents/ScoreListing'
import ModularButton from '../components/ModularButton'

const ScoreScreen = ({navigation}) =>{
    const {schedule, updateScoreList} = useContext(ProducerContext)
    const [isLoading, setIsLoading] = useState(true)
    const [sudoRoster, setSudoRoster] = useState([])
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        rootScreen:{
            flex: 1
        },
        scrollContainer:{
            paddingTop: height / 8
        },
        headerLine:{
            backgroundColor: Colors.secondaryColor400,
            flexDirection: "row",
            alignItems: 'center',
            height: height/12,
            width: converter(width/10 * 8.5),
            paddingLeft: width/18.5,
            borderRadius: converter(width/25, width/20, width/20, width/25),
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0
        },
        footerLine:{
            backgroundColor: Colors.secondaryColor400,
            flexDirection: "row",
            alignItems: 'center',
            height: height/16,
            width: converter(width/10 * 8.5),
            paddingLeft: width/18.5,
            borderRadius: converter(width/25, width/20, width/20, width/25),
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            marginBottom: converter(height/40)
        },
        headerLineName:{
            color: Colors.highlightColor,
            fontWeight: 'bold',
            flex: converter(0.40),
            fontSize: converter(width/22.5)
        },
        
        headerLineRight:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: converter(0.55)
        },
        headerLineRightText:{
            color: Colors.highlightColor,
            fontWeight: 'bold',
            fontSize: converter(width/27.5)
        },
        container:{
            alignItems: 'center',
        },
        nodeContainer:{
            width: converter(width/10 * 8.5),
            height: converter(height/10 * 4.25),
            marginTop: height/100
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

    const {roster, scoreList} = schedule
    

    // useEffect(()=>{
    //     if(roster.length > 0){
    //         setSudoRoster(()=>{
    //             return roster.map(participant =>{
    //                 return(
    //                     { 
    //                         id: participant._id,
    //                         firstName: participant.firstName,
    //                         lastName: participant.lastName,
    //                         quizScore: 0,
    //                         teamScore: 0
    //                     }
    //                 )
    //              })
    //         })
    //         setIsLoading(false)
    //     }
        
    //     return ()=>{}
    // }, [roster])

    useEffect(()=>{
        if(roster.length > 0){

            updateScoreList(
                roster.map(participant =>{
                    return(
                        { 
                            id: participant._id,
                            firstName: participant.firstName,
                            lastName: participant.lastName,
                            quizScore: 0,
                            teamScore: 0
                        }
                    )
                 })
            )
            setIsLoading(false)
        }
        
        return ()=>{}
    }, [roster])

    console.log('From ScoreScreen scoreList: ')
    console.log(scoreList)
    console.log(scoreList.length)

    function navigateBack(){
        navigation.navigate('ProducerScreen')
    }

    function openDrawer( ){
        navigation.toggleDrawer()
    }

    console.log("roster from ScoreScreen: ")
    console.log(roster)

    return(
        <LinearGradient style={styles.rootScreen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={false} iconName='menu'  iconColor={Colors.secondaryColor} onPress={openDrawer} viewStyle={{position: 'absolute', left: width/20, top: height/10, zIndex: 1}}/>
            <View style={styles.scrollContainer}>
                <View style={{alignItems: 'center', marginBottom: height/40}}>
                    <Title 
                        color={Colors.secondaryColor} 
                        large={true} 
                        style={{
                            marginTop: height/30,  
                            width: width / 10 * 8, 
                            textAlign:'right'}}
                    >
                            Scoring
                        </Title>
                </View>
                <View style={styles.container}>
                    <View style={styles.headerLine}>
                        <Text style={styles.headerLineName}>Name</Text>
                        <View style={styles.headerLineRight}>
                            <Text style={styles.headerLineRightText}>Quiz Score</Text>
                            <Text style={styles.headerLineRightText}>Team Score</Text>
                        </View>
                    </View>
                    {scoreList.length > 0 && <FlatList
                                    contentContainerStyle={styles.nodeContainer}
                                    data={roster}
                                    keyExtractor={participant => participant._id}
                                    renderItem={participant =>{
                                            let filtered = roster.filter(entry => entry._id === participant.item._id)
                                            console.log("filter from the mapping: ")
                                            console.log(filtered)
                                            let current = filtered[0]
                                            console.log("current: ")
                                            console.log(current)
                                            let index = roster.indexOf(current)
                                            console.log('index')
                                            console.log(index)
                                        return (    
                                                <ScoreListing
                                                index={index}
                                                roster={scoreList}
                                                rosterSetter={setSudoRoster} 
                                                firstName={participant.item.firstName}
                                                lastName={participant.item.lastName}
                                                />
                                            )
                                        }
                                    } 
                    />}
                    <View style={styles.footerLine} />

                    <ModularButton style={{height: converter(height/15)}} textSize={converter(width/20)} buttonColor={Colors.accentColor300} rippleColor={Colors.accentColor} textColor={Colors.highlightColor}>Submit</ModularButton>         

                </View>

                        
            </View>
            <BackButton viewStyle={{left:converter( width/70,  width/100,  width/70)}} textSize={converter(width/30, width/30, width/35)} iconSize={converter(width/20, width/25, width/25)} navigationHandler={navigateBack}/>
        </LinearGradient>
    )
}




export default ScoreScreen

