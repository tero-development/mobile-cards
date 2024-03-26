import {View, useWindowDimensions, ScrollView} from 'react-native'
import {useContext, useState, useEffect} from 'react'
import Title from '../UI/Title'
import { LinearGradient } from 'expo-linear-gradient'
import { ProducerContext } from '../store/producer-context'
import { getProClasses } from '../httpServices/cafes'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import {converterSetup, useStyles} from '../utils/dimensions'
import Loader from '../UI/Loader'
import BackButton from '../UI/BackButton'
import MonthListing from '../components/ProducerComponents/MonthListing'

const ProducerMonths = ({navigation, route}) =>{
    const {schedule, updateScheduleClasses, updateCurrentMonth} = useContext(ProducerContext)
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

    const {months} = schedule
 
    const routeDesignation = route.params.designation

    useEffect(()=>{
        if(months.length > 0){
            setIsLoading(false)
        }
        
        return ()=>{}
    }, [months])

    function navigateClasses(){
        navigation.navigate('ProducerClasses', {designation: routeDesignation})
    }


    async function classRouting(month){
         setIsLoading(true)

        updateCurrentMonth(month)
         await getProClasses(month)
        .then(res => {
            updateScheduleClasses(res)
            if(res){
                setIsLoading(false)
                navigateClasses()
            }
        })
        .catch(e => {
            alert(e)
            setIsLoading(false)
        })

        try{
            const response = await getProClasses(month)
            updateScheduleClasses(response)
            if(response){
                setIsLoading(false)
                navigateClasses()
            }
        } catch(e){
            alert(e)
            setIsLoading(false)
        }
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
                            Select Month
                        </Title>
                </View>
                <View style={styles.container}>
                    <View style={styles.nodeContainer}>
                        {
                            //'selectedCafes' is assessment.currentSkillsChallenges, 'scheduledDates' is an array of all the offered dates per selectedCafe 
                            months.length < 1 || isLoading ? <Loader size="large" color={Colors.accentColor} /> : 
                            months.map(
                                month => {
                                    return <MonthListing 
                                        key={month._id}
                                        title={month.monthName}
                                        // onPress={()=>classRouting(month.monthName)}
                                        onPress={async()=> classRouting(month.monthName)}
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


export default ProducerMonths
