import { useState, useContext, useEffect } from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'
import {Ionicons} from '@expo/vector-icons'
import ScheduleNodeOption from './ScheduleNodeOption'
import { wordSplitter } from '../../utils/helperFunctions'
import { CafeContext } from '../../store/cafe-context'

const ScheduleNode = ({ targetSkill,   companyCafeDesignation,  openModalHandler, currentIndex}) =>{
    const [expanded, setExpanded] = useState(false)
    const {cafeDetails} = useContext(CafeContext)

    const {scheduledDates, cafeTracker} = cafeDetails


    let date = ""
    let variableGroup = {}


    if(scheduledDates!== undefined && scheduledDates.length > 0){
        //this isn't to print a date, but a year (check the dateGroup below)
        date = new Date(scheduledDates[currentIndex][0].date)
      
        variableGroup = {
            monthName: scheduledDates[currentIndex][0].monthName,
            monthNumber:scheduledDates[currentIndex][0].monthNumber,
            clinicMonthName: scheduledDates[currentIndex][0].clinicMonthName,
            year: date.getFullYear(),
            currentCafeOfferedSet : scheduledDates[currentIndex],
            targetSkill: targetSkill
        }
        
      
    }


    const {monthName, monthNumber, clinicMonthName} = variableGroup
    

    const expandHandler = () =>{
        setExpanded(prev => !prev)
    }

    const separatedStr = wordSplitter(targetSkill) 


    const currentListTarget = cafeTracker.list.find(entry => entry.monthNumber === monthNumber)


    let rightSidePrompt = ''
    
    if(cafeTracker.list.length > 0 && currentListTarget !== undefined){
        if(currentListTarget.id !== ""){
            rightSidePrompt = currentListTarget.date 
        } else{
            rightSidePrompt = 'Not Scheduled'
        }
    }else{
        rightSidePrompt = 'Not Scheduled'
    }


    return(
        <View style={styles.container}>
            <Pressable onPress={expandHandler} style={[styles.nodeTop, expanded && styles.nodeTopExpanded]}>
                <View style={styles.topTitleContainer}>
                    {
                        separatedStr.map(word =>{
                            return(
                                <Text style={styles.topTitle} key={separatedStr[separatedStr.indexOf(word)]}>{word}</Text>
                            )
                        })
                    }                
                </View>
                <View style={styles.topDetailContainer}>
                    <Text style={styles.topDate}>{monthName}</Text>
                    {/* <Text style={styles.topCafeType}>{companyCafeDesignation}</Text> */}
                    <Text style={styles.topCafeType}>
                        {rightSidePrompt}
                    </Text>
                    <Ionicons name={expanded? 'chevron-up' : 'chevron-down'} size={35} color={'white'}/>
                </View>
            </Pressable>
            <View style={expanded? styles.nodeBottomExpanded : styles.nodeBottom}>
                <ScheduleNodeOption 
                    title={'Clinic'}
                    topTitle= {clinicMonthName}
                    roundL={true}
                    bgColor={Colors.highlightColor} 
                    iconName={'school-outline'} 
                    iconSize={36} 
                    iconColor={Colors.secondaryColor400}
                    textColor={Colors.secondaryColor400}
                    link={'https://seismic.com/lessonly/'}
                    />
                <ScheduleNodeOption
                    bgColor={Colors.secondaryColor300} 
                    title={'ExSellerator'} 
                    topTitle={monthName}
                    iconName={'speedometer-outline'} 
                    iconSize={36} 
                    iconColor={Colors.primaryColor100}
                    textColor={Colors.primaryColor100}
                    link={'https://zoom.us/'}
                    />
                <ScheduleNodeOption 
                    title={'Schedule'}
                    topTitle={'Edit'}
                    roundR={true}
                    bgColor={Colors.secondaryColor400} 
                    iconName={'calendar-outline'} 
                    iconSize={36} 
                    iconColor={Colors.highlightColor}
                    textColor={Colors.highlightColor}
                    variableGroup={variableGroup}
                    openModalHandler={openModalHandler}
                    />
                {/* <View style={styles.captionContainer}>
                    {
                        separatedStr.map(word =>{
                            return(
                                <Text style={styles.bottomTitle} key={separatedStr[separatedStr.indexOf(word)]}>{word}</Text>
                            )
                        })
                    }
                    <Text style={styles.bottomText}>February - March</Text>
                </View> */}
                {/* <View style={styles.optionContainer}>
                
                </View> */}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width: DeviceFractions.deviceWidth / 10 * 7.5,
        marginBottom: DeviceFractions.deviceWidth / 60,
    },
    nodeTop:{
        backgroundColor: Colors.accentColor400,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        paddingHorizontal: 24,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: DeviceFractions.deviceHeight / 7
    },
    nodeTopExpanded:{
        backgroundColor: Colors.accentColor400,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 0,
        height: DeviceFractions.deviceHeight / 7
    },
    topTitleContainer:{
        paddingVertical: DeviceFractions.deviceH40 
    },
    topTitle:{
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    topDetailContainer:{
        paddingVertical: DeviceFractions.deviceH40 ,
        justifyContent: 'space-evenly',
        alignItems: 'flex-end'
    },
    topDate:{
        color: 'white',
        fontSize: 18,
        textAlign: 'right',
        fontWeight: 'bold'
    },
    topCafeType:{
        color: 'white',
        fontSize: 15,
        textAlign: 'right'
    },
    iconContainer:{
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        padding: 2
    },  
    nodeBottom:{
        height: 0
    },
    nodeBottomExpanded:{
        backgroundColor: Colors.highlightColor,
        height: DeviceFractions.deviceHeight / 7,
        flexDirection: 'row',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    optionContainer:{
        flex: 1,
        flexDirection: 'row'
    },
    bottomTitle:{
        fontWeight: 'bold',
        color:Colors.accentColor300,
        fontSize: 22
    },
    bottomText:{
        color:Colors.accentColor300,
        fontSize: 17
    }
})

export default ScheduleNode