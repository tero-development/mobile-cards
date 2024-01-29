import {View, Text, useWindowDimensions, Pressable} from 'react-native'
import Colors from '../../utils/colors'
import {converterSetup, useStyles} from '../../utils/dimensions'
import { useContext } from 'react'
import { CafeContext } from '../../store/cafe-context'
import _ from 'lodash'


const ScheduleEntry = (props) =>{
    const {
        headlineDate,
        date, 
        time, 
        monthNumber, 
        id, 
        zoomLink,
        clinicMonthName,
        clinicLink,
        cafeTracker,
        title 
    } = props
    const {updateCafeTracker} = useContext(CafeContext)

    
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        container:{
            backgroundColor: Colors.secondaryColor400,
            paddingHorizontal: width/20,
            marginBottom: height/50,
            width: converter('95%', '100%', '95%'),
            height: converter(height/18, height/20,height/16),
            borderRadius: converter(8, 10, 20),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflow: 'hidden',
            shadowColor: 'black',
            shadowOpacity: 0.25,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 8,
            elevation: 5
        },
        dateText:{
            color: Colors.highlightColor,
            fontWeight: 'bold',
            fontSize: converter(width/35, width/30, width/32)
        },
        timeText:{
            fontSize: 10,
            color: Colors.highlightColor,
            fontSize: converter(width/40, width/35, width/36)
        },
        clickBox:{
            backgroundColor: Colors.unselectedColor,
            height: converter(width/30, width/30, width/30),
            width: converter(width/30, width/30, width/30),
            borderRadius: converter(3, 4, 6)
        },
        clickBoxSelected:{
            backgroundColor: Colors.primaryColor100
        }
    }
 
    const styles = useStyles(localStyles)


    function determineSelected(){
        let value = false
        if(cafeTracker.list.length > 0){
            const currentListTarget = cafeTracker.list.find(entry =>{
                if( entry.monthNumber === monthNumber){
                    return entry
                }
            })
            if(currentListTarget !== undefined && currentListTarget.id === id){
                value = true
            }
        }
        
        return value
    }



    
    return(
        <Pressable style={styles.container} onPress={()=>updateCafeTracker(
            headlineDate,
            date, 
            time, 
            monthNumber, 
            id, 
            zoomLink,
            clinicLink,
            clinicMonthName, 
            title
        )}>
            <View>
                <Text style={styles.dateText}>{headlineDate}</Text>
                <Text style={styles.timeText}>{time}</Text>
            </View>
            <View style={[styles.clickBox, 
                determineSelected() && styles.clickBoxSelected
                ]}></View>
        </Pressable>
    )
}



export default ScheduleEntry