import { useState } from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'
import IconButton from '../../UI/IconButton'
import ScheduleNodeMainOption from './ScheduleNodeMainOption'


const ScheduleNodeMain = ({onPress, skillTitle}) =>{
    const [expanded, setExpanded] = useState(false)

    const strCount = skillTitle.length

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

    function wordSplitter(string){
        return string.split(' ').map(u => u.trim())
    }

    const separatedStr = wordSplitter(skillTitle)    

    return(
        <View style={styles.container}>
            <View style={styles.nodeTop}>
                <View>
                    <Text style={styles.topTitle}>Upcoming Challenge</Text>
                </View>
                <IconButton iconName='disc-outline' iconSize={26} iconColor={'white'} />
            </View>
            <View style={styles.nodeBottom}>
                <View style={styles.captionContainer}>
                    {
                        separatedStr.map(word =>{
                            return(
                                <Text style={styles.bottomTitle} key={separatedStr[separatedStr.indexOf(word)]}>{word}</Text>
                            )
                        })
                    }
                    <Text style={styles.bottomText}>February - March</Text>
                </View>
                <View style={styles.optionContainer}>
                    <ScheduleNodeMainOption title='Lessonly' iconName={'school-outline'} iconSize={24} iconColor={Colors.secondaryColor}/>
                    <ScheduleNodeMainOption title='Schedule' iconName={'calendar-outline'} iconSize={24} iconColor={Colors.secondaryColor}/>
                    <ScheduleNodeMainOption title='Test' iconName={'clipboard-outline'} iconSize={24} iconColor={Colors.secondaryColor}/>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width: DeviceFractions.deviceWidth / 10 * 8,
        marginBottom: DeviceFractions.deviceH20,

    },
    nodeTop:{
        backgroundColor: Colors.secondaryColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 0,
        minHeight: DeviceFractions.deviceHeight/12
    },
    topTitle:{
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    topText:{
        color: 'white',
        fontSize: 12
    },
    iconContainer:{
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        padding: 2
    },  
    nodeBottom:{
        backgroundColor: Colors.highlightColor,
        height: DeviceFractions.deviceHeight / 4,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    captionContainer:{
        flex:1,
        paddingLeft: "5%",
        height: '100%',
        justifyContent: 'center'
    },
    optionContainer:{
        flex: 1
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