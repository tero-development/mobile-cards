import { useState, useContext} from 'react'
import {View, Text, StyleSheet, Pressable, Platform, UIManager, LayoutAnimation} from 'react-native'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'
import {Ionicons} from '@expo/vector-icons'
import ScheduleNodeOption from './ScheduleNodeOption'
import { CafeContext } from '../../store/cafe-context'

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  

const ScheduleNode = ({ targetSkill, groupTargetId,  companyCafeDesignation,  openModalHandler, currentIndex}) =>{
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
            year: date.toLocaleString('default', {year: 'numeric'}),
            currentCafeOfferedSet : scheduledDates[currentIndex],
            targetSkill: targetSkill,
            groupTargetId: groupTargetId,
            clinicLink: scheduledDates[currentIndex][0].clinic_link,
            zoomLink: scheduledDates[currentIndex][0].zoom_link
        }
        
        
    }


    const {monthName, monthNumber, clinicMonthName, clinicLink, zoomLink} = variableGroup


    const CustomAnimation = {
        duration: 500,
        create: {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.scaleXY,
          springDamping: 1
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 1
        }
      }

    const expandHandler = () =>{
        LayoutAnimation.configureNext(CustomAnimation);
        setExpanded(prev => !prev)
    }


    const currentListTarget = cafeTracker.list.find(entry => entry.monthNumber === monthNumber)

    let rightSidePrompt = ''
    let timePrompt = ''
    let scheduledPrompt = ''
    
    if(cafeTracker.list.length > 0 && currentListTarget !== undefined){
        if(currentListTarget.id !== ""){
            rightSidePrompt = currentListTarget.headlineDate
            timePrompt = currentListTarget.time
            scheduledPrompt = 'Scheduled' 
        } else{
            rightSidePrompt = 'Not Scheduled'
        }
    }else{
        rightSidePrompt = 'Not Scheduled'
    }

    

    return(
        <View style={styles.container}>
            <Pressable onPress={expandHandler} style={[styles.nodeTop, expanded? styles.nodeTopExpanded : null]}>
                <View style={styles.nodeTopInnerContainer}>
                    <View style={styles.topTitleContainer}>
                        <Text style={styles.topTitle}>{targetSkill}</Text>
                        <Text style={styles.topTimeText}>{timePrompt}</Text>
                    </View>
                    <View style={styles.topDetailContainer}>
                        <Text style={styles.topScheduledText}>{scheduledPrompt}</Text>
                        {/* <Text style={styles.topCafeType}>{companyCafeDesignation}</Text> */}
                        <Text style={[styles.topCafeType, rightSidePrompt === 'Not Scheduled'&& {color: Colors.errorColor, fontWeight:'bold'}]}>
                            {rightSidePrompt}
                        </Text>
                        <Ionicons name={expanded? 'chevron-up' : 'chevron-down'} size={35} color={'white'}/>
                    </View>            
                </View>

            </Pressable>
            {/* <View style={expanded? styles.nodeBottomExpanded : styles.nodeBottom}> */}
            <View style={[styles.nodeBottom, expanded? styles.nodeBottomExpanded : null]}>

                <ScheduleNodeOption 
                    title={'Clinic'}
                    topTitle= {clinicMonthName}
                    roundL={true}
                    bgColor={Colors.highlightColor} 
                    iconName={'school-outline'} 
                    iconSize={30} 
                    iconColor={Colors.secondaryColor400}
                    textColor={Colors.secondaryColor400}
                    link={clinicLink}
                    />
                <ScheduleNodeOption
                    bgColor={Colors.secondaryColor300} 
                    title={companyCafeDesignation} 
                    topTitle={monthName}
                    iconName={'speedometer-outline'} 
                    iconSize={30} 
                    iconColor={Colors.primaryColor300}
                    textColor={Colors.primaryColor300}
                    link={'https://zoom.us/'}
                    />
                <ScheduleNodeOption 
                    title={'Schedule'}
                    topTitle={'Edit'}
                    roundR={true}
                    bgColor={Colors.secondaryColor400} 
                    iconName={'calendar-outline'} 
                    iconSize={30} 
                    iconColor={Colors.highlightColor}
                    textColor={Colors.highlightColor}
                    variableGroup={variableGroup}
                    openModalHandler={openModalHandler}
                    groupTargetId={groupTargetId}
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
        marginBottom: DeviceFractions.deviceH40,
    },
    nodeTop:{
        backgroundColor: Colors.accentColor400,
        borderRadius: 20,
        paddingHorizontal: DeviceFractions.deviceH40,
        paddingVertical: DeviceFractions.deviceH50,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: DeviceFractions.deviceHeight / 6,
        zIndex: 1,
        marginBottom: DeviceFractions.deviceHeight / 500
    },
    nodeTopExpanded:{
        backgroundColor: Colors.accentColor300,
        borderRadius: 20,
        paddingHorizontal: DeviceFractions.deviceH40,
        paddingVertical: DeviceFractions.deviceH50,
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 0,
        height: DeviceFractions.deviceHeight / 7,
        zIndex: 1,
        marginBottom: DeviceFractions.deviceHeight / 10 * 1.36
    },
    nodeTopInnerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex:1
    },
    topTitleContainer:{
        flexShrink: 1,
        flex: 0.9,
        justifyContent: 'space-evenly'
    },
    topTitle:{
        color: 'white',
        fontSize: DeviceFractions.deviceHeight / 45,
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },
    topTimeText:{
        color: Colors.highlightColor
    },
    topDetailContainer:{
        justifyContent: 'space-evenly',
        alignItems: 'flex-end'
    },
    topScheduledText:{
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
        position: 'absolute',
        flexDirection: 'row',
        opacity:0,
        left: 0,
        right: 0,
        top: 20
    },
    nodeBottomExpanded:{
        backgroundColor: Colors.highlightColor,
        height: DeviceFractions.deviceHeight / 7,
        flexDirection: 'row',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        position: 'absolute',
        left: 0,
        right: 0,
        top: DeviceFractions.deviceHeight / 10 * 1.36,
        opacity: 1
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