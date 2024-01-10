import { useState } from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'
import ScheduleNodeOption from './ScheduleNodeOption'
import { wordSplitter } from '../../utils/helperFunctions'

const ScheduleNodeMain = ({onPress, title, targetSkill, dateRange, time, modalTrigger}) =>{
    const [expanded, setExpanded] = useState(false)


    const expandHandler = () =>{
        setExpanded(prev => !prev)
    }

    function adujstFont(length){
        
        switch(true){
            case length >= 30:
                return 24
            case length >= 20:
                return 26
            default:
                return 30    
        }
    }

    const separatedStr = wordSplitter(targetSkill)    

    return(
        <View style={styles.container}>
            <View style={styles.nodeTop}>
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
                    <Text style={styles.topDate}>{dateRange}</Text>
                    <Text style={styles.topTime}>{time}</Text>
                </View>
            </View>
            <View style={styles.nodeBottom}>
                <ScheduleNodeOption 
                    title='Clinic' 
                    topTitle={'February'}
                    roundL={true}
                    bgColor={Colors.highlightColor} 
                    iconName={'school-outline'} 
                    iconSize={36} 
                    iconColor={Colors.secondaryColor400}
                    textColor={Colors.secondaryColor400}
                    type='link'
                    link={'https://seismic.com/lessonly/'}
                    />
                <ScheduleNodeOption
                    bgColor={Colors.secondaryColor300} 
                    title='ExSellerator' 
                    topTitle={'March'}
                    iconName={'disc-outline'} 
                    iconSize={36} 
                    iconColor={Colors.primaryColor300}
                    textColor={Colors.primaryColor300}
                    type='link'
                    link={'https://zoom.us/'}
                    />
                <ScheduleNodeOption 
                    title='Schedule'
                    targetSkill={targetSkill}
                    dateRange={dateRange}
                    topTitle={'Edit'}
                    roundR={true}
                    bgColor={Colors.accentColor400} 
                    iconName={'calendar-outline'} 
                    iconSize={36} 
                    iconColor={Colors.highlightColor}
                    textColor={Colors.highlightColor}
                    modalTrigger={modalTrigger}
                    type={'modal'}
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
        width: DeviceFractions.deviceWidth / 10 * 8,
        marginBottom: DeviceFractions.deviceH30,

    },
    nodeTop:{
        backgroundColor: Colors.secondaryColor400,
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
        paddingVertical: DeviceFractions.deviceH40 
    },
    topDate:{
        color: 'white',
        fontSize: 18,
        textAlign: 'right'
    },
    topTime:{
        color: 'white',
        fontSize: 12,
        textAlign: 'right'
    },
    iconContainer:{
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        padding: 2
    },  
    nodeBottom:{
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

export default ScheduleNodeMain