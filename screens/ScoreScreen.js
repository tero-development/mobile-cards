import {View, useWindowDimensions, FlatList, Text} from 'react-native'
import {useContext, useState, useEffect} from 'react'
import Title from '../UI/Title'
import { LinearGradient } from 'expo-linear-gradient'
import { ProducerContext } from '../store/producer-context'
import { CompanyContext } from '../store/company-context'
import { SeasonContext } from '../store/season-context'
import {  sendScore } from '../httpServices/producers'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'
import Loader from '../UI/Loader'
import BackButton from '../UI/BackButton'
import ScoreListing from '../components/ProducerComponents/ScoreListing'
import ModularButton from '../components/ModularButton'
import ScoreOverlay from '../UI/ScoreOverlay'
import { getSingleScoreTracker } from '../httpServices/scoreTrackers'
import _ from 'lodash'


const ScoreScreen = ({navigation}) =>{
    const {schedule, updateScoreList, updateShallowScoreTracker} = useContext(ProducerContext)
    const {season} = useContext(SeasonContext)
    const {company} = useContext(CompanyContext)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [canSubmit, setCanSubmit] = useState(false)
    const [scoreChange, setScoreChange] = useState(true)
    const [overlayObject, setOverlayObject] = useState({})
    // const [sudoRoster, setSudoRoster] = useState([])
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
            alignItems: 'center'
        },
        listContainer:{
            // height: converter(height/10 * 4.25),
            marginTop: height/100,
            width: converter(width/10 * 7)

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

    const {roster, currentMonth} = schedule


    useEffect(()=>{
        if(roster.length > 0){

            updateScoreList(
                roster.map(participant =>{
                    return(
                        { 
                            _id: participant._id,
                            firstName: participant.firstName,
                            lastName: participant.lastName,
                            quizScore: "",
                            teamRank: "",
                            attendanceMinutes: ""
                        }
                    )
                 })
            )
            setIsLoading(false)
        }
        
        return ()=>{}
    }, [roster])



    function navigateBack(){
        navigation.navigate('ProducerScreen')
    }

    function openDrawer( ){
        navigation.toggleDrawer()
    }


     
    async function openOverlay(employeeId, index, firstName){
        try{
            const response = await getSingleScoreTracker(employeeId)
            if(response === "not found"){
                let placeholder = {
                    company_id: company._id,
                    season_id: season._id,
                    employee_id: employeeId,
                }
                placeholder[currentMonth] = {
                    quizScore: 0,
                    teamRank: 0,
                    attendancePoints: 0,
                    attendanceMinutes:0,
                    maxScore: 60
                }
                updateShallowScoreTracker(placeholder)
                setOverlayObject({
                    firstName: firstName,
                    index: index,
                    dbTracker: null  
                })
                setIsEditing(true)
            } else{
               
                if(currentMonth in response){
                    updateShallowScoreTracker(response)
                    setOverlayObject({
                        firstName: firstName,
                        index: index,
                        dbTracker: response
                    })
                    setIsEditing(true)
                } else{
                    let placeholder = response
                    placeholder[currentMonth] = {
                        quizScore: 0,
                        teamRank: 0,
                        attendancePoints: 0,
                        attendanceMinutes:0,
                        maxScore: 60
                    }

                    updateShallowScoreTracker(placeholder)
                    setOverlayObject({
                        firstName: firstName,
                        index: index,
                        dbTracker: null  
                    })
                    setIsEditing(true)
                }
                }
        }catch(e){
            alert(e)
        }
        
    }

    function closeOverlay(){
        setIsEditing(false)
    }

    if(isEditing){
        return <ScoreOverlay closeFunction={closeOverlay} rosterChecker={setScoreChange} overlayObject={overlayObject} />
    }

    

    return(
        <LinearGradient style={styles.rootScreen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={false} iconName='menu'  iconColor={Colors.secondaryColor} onPress={openDrawer} viewStyle={{position: 'absolute', left: width/20, top: height/10, zIndex: 1}}/>
            <View style={styles.scrollContainer}>
                {/* <View style={{alignItems: 'center', marginBottom: height/40}}>
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
                </View> */}
                <View style={styles.container}>
                    {/* <View style={styles.headerLine}>
                        <Text style={styles.headerLineName}>Name</Text>
                        <View style={styles.headerLineRight}>
                            <Text style={styles.headerLineRightText}>Quiz Score</Text>
                            <Text style={styles.headerLineRightText}>Team Score</Text>
                        </View>
                    </View> */}
                    {isLoading? <Loader size="large" color={Colors.accentColor}/> : <FlatList
                                    contentContainerStyle={styles.listContainer}
                                    data={roster}
                                    keyExtractor={participant => participant._id}
                                    renderItem={participant =>{
                                            let filtered = roster.filter(entry => entry._id === participant.item._id)
                                            let employeeId = participant.item._id
                                            let current = filtered[0]
                                            let index = roster.indexOf(current)
                                            const firstName = participant.item.firstName
                                            // const lastName = participant.item.lastName
                                        if(index === 0){
                                            return (
                                                <>
                                                <View style={{alignItems: 'center', marginBottom: height/40}}>
                                                    <Title 
                                                        color={Colors.secondaryColor} 
                                                        large={true} 
                                                        style={{
                                                            marginTop: height/30,  
                                                            marginRight: width/10,  
                                                            width: width / 10 * 8, 
                                                            textAlign:'right'
                                                            }}
                                                    >
                                                            Scoring
                                                        </Title>
                                                </View>
                                                <ScoreListing
                                                index={index}
                                                // roster={scoreList}
                                                rosterChecker={setScoreChange}
                                                overlayObject={overlayObject} 
                                                setOverlayObject={setOverlayObject} 
                                                firstName={participant.item.firstName}
                                                lastName={participant.item.lastName}
                                                onPress={()=>{openOverlay(employeeId, index, firstName)}}
                                                />
                                                </>    
                                            )
                                        }
                                        return (    
                                                <ScoreListing
                                                index={index}
                                                // roster={scoreList}
                                                rosterChecker={setScoreChange}
                                                overlayObject={overlayObject} 
                                                setOverlayObject={setOverlayObject} 
                                                firstName={participant.item.firstName}
                                                lastName={participant.item.lastName}
                                                onPress={()=>{openOverlay(employeeId, index, firstName)}}
                                                />
                                            )
                                        }
                                    } 
                    />}
                    {/* <View style={styles.footerLine} /> */}

                    {/* {canSubmit && 
                        <ModularButton 
                            style={{height: converter(height/15)}} 
                            textSize={converter(width/20)} 
                            buttonColor={Colors.accentColor300} 
                            rippleColor={Colors.accentColor} 
                            textColor={Colors.highlightColor}
                            onPress={async()=>{
                                try{
                                    setIsLoading(true)
                                    const response = await sendScores(currentMonth, scoreList, company._id, season._id)
                                    if(response){
                                        console.log("async response from ScoreScreen:")
                                        console.log(response)
                                        setIsLoading(false)
                                        navigateBack()
                                    }
                                } catch(e){
                                    alert(e)
                                    setIsLoading(false)
                                }
                            }}    
                        >
                            Submit
                        </ModularButton>         
                    } */}
                </View>

                        
            </View>
            <BackButton viewStyle={{left:converter( width/70,  width/100,  width/70)}} textSize={converter(width/30, width/30, width/35)} iconSize={converter(width/20, width/25, width/25)} navigationHandler={navigateBack}/>
        </LinearGradient>
    )
}




export default ScoreScreen

// const whatever = {"score_tracker": 
// {"March": {"attendanceMinutes": 45, "attendancePoints": 12, "maxScore": 60, "quizScore": 14, "teamRank": 15}, 
// "May": {"attendanceMinutes": 0, "attendancePoints": 0, "quizScore": 0, "teamRank": 0}, 
// "_id": "65fb4d2f360f353c874af6b6", 
// "company_id": "62d47c7a36aeee14652966cd", 
// "employee_id": "6539f75d550ee9b24fa5fc5c", 
// "season_id": "650b8c8746533a5af871ba0a"}
// }
