import { useState, useContext} from 'react'
import {View, Text, useWindowDimensions, Pressable, Platform, UIManager, LayoutAnimation} from 'react-native'
import Colors from '../../utils/colors'
import {converterSetup, useStyles} from '../../utils/dimensions'
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


    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        container:{
            width: converter(width/10 * 6.75, width/10 * 7.2, width/10 * 7),
            marginBottom: height/40,
            
        },
        nodeTop:{
            backgroundColor: Colors.accentColor400,
            borderRadius: converter(15, 20, 35),
            paddingHorizontal: height/40,
            paddingVertical: height/50,
            borderBottomRightRadius: converter(15, 20, 35),
            borderBottomLeftRadius: converter(15, 20, 35),
            height: height / 6,
            zIndex: 1,
            marginBottom: height / 500
        },
        nodeTopExpanded:{
            backgroundColor: Colors.accentColor300,
            borderRadius: converter(15, 20, 35),
            paddingHorizontal: height/40,
            paddingVertical: height/50,
            borderBottomLeftRadius: 0, 
            borderBottomRightRadius: 0,
            height: height / 5.5,
            zIndex: 1,
            marginBottom: height / 10 * 1.7
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
            color: Colors.highlightColor,
            fontSize: converter(width/24, width / 20, width/22),
            fontWeight: 'bold',
            flexWrap: 'wrap'
        },
        topTimeText:{
            color: Colors.highlightColor,
            fontSize: converter(width/35, width/30, width/35)
        },
        topDetailContainer:{
            justifyContent: 'space-evenly',
            alignItems: 'flex-end'
        },
        topScheduledText:{
            color: Colors.highlightColor,
            fontSize: width/25,
            textAlign: 'right',
            fontWeight: 'bold'
        },
        topCafeType:{
            color: Colors.highlightColor,
            fontSize: width/30,
            textAlign: 'right'
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
            backgroundColor: 'red',
            height: height / 5.5,
            flexDirection: 'row',
            borderBottomRightRadius: converter(15, 20, 35),
            borderBottomLeftRadius: converter(15, 20, 35),
            position: 'absolute',
            left: 0,
            right: 0,
            top: height / 10 * 1.7,
            opacity: 1
        },
        optionContainer:{
            flex: 1,
            flexDirection: 'row'
        },
        // bottomTitle:{
        //     fontWeight: 'bold',
        //     color:Colors.accentColor300,
        //     fontSize: 22
        // },
        // bottomText:{
        //     color:Colors.accentColor300,
        //     fontSize: 17
        // }
    }
 
    const styles = useStyles(localStyles)


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
    let linksActive = false

    if(cafeTracker.list.length > 0 && currentListTarget !== undefined){

        if(currentListTarget.id !== ""){
            rightSidePrompt = currentListTarget.headlineDate
            timePrompt = currentListTarget.time
            scheduledPrompt = 'Scheduled' 
            linksActive = true
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
                        <Ionicons name={expanded? 'chevron-up' : 'chevron-down'} size={35} color={Colors.highlightColor}/>
                    </View>            
                </View>

            </Pressable>
            {/* <View style={expanded? styles.nodeBottomExpanded : styles.nodeBottom}> */}
            <View style={[styles.nodeBottom, expanded? styles.nodeBottomExpanded : null]}>

                <ScheduleNodeOption
                    active={linksActive} 
                    title={'Clinic'}
                    topTitle= {clinicMonthName}
                    roundL={true}
                    bgColor={Colors.highlightColor} 
                    iconName={'school-outline'} 
                    iconSize={converter(24, 30, 60)} 
                    iconColor={Colors.secondaryColor400}
                    textColor={Colors.secondaryColor400}
                    link={currentListTarget !== undefined && currentListTarget.clinicLink}
                    />
                <ScheduleNodeOption
                    active={linksActive}
                    bgColor={Colors.secondaryColor300} 
                    title={companyCafeDesignation} 
                    topTitle={monthName}
                    iconName={'speedometer-outline'} 
                    iconSize={converter(24, 30, 60)} 
                    iconColor={Colors.primaryColor300}
                    textColor={Colors.primaryColor300}
                    link={currentListTarget !== undefined && currentListTarget.zoomLink}
                    />
                <ScheduleNodeOption 
                    title={'Schedule'}
                    topTitle={'Edit'}
                    roundR={true}
                    bgColor={Colors.secondaryColor400} 
                    iconName={'calendar-outline'} 
                    iconSize={converter(24, 30, 60)} 
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



export default ScheduleNode