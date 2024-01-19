import {View, Text, StyleSheet, Pressable} from 'react-native'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'
import { useState, useEffect, useContext } from 'react'
import { CafeContext } from '../../store/cafe-context'
import _ from 'lodash'


const ScheduleEntry = (props) =>{
    const {
        date, 
        time, 
        monthNumber, 
        id, 
        cafeTracker, 
    } = props
    const {updateCafeTracker} = useContext(CafeContext)

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
        <Pressable style={styles.container} onPress={()=>updateCafeTracker(monthNumber, id, date)}>
            <View>
                <Text style={styles.dateText}>{date}</Text>
                <Text style={styles.timeText}>{time}</Text>
            </View>
            <View style={[styles.clickBox, 
                determineSelected() && styles.clickBoxSelected
                ]}></View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.secondaryColor400,
        paddingHorizontal: DeviceFractions.deviceW20,
        marginBottom: DeviceFractions.deviceH50,
        width: '100%',
        height: DeviceFractions.deviceH20,
        borderRadius: 10,
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
        fontWeight: 'bold'
    },
    timeText:{
        fontSize: 10,
        color: Colors.highlightColor
    },
    clickBox:{
        backgroundColor: Colors.unselectedColor,
        height: 15,
        width: 15,
        borderRadius: 3
    },
    clickBoxSelected:{
        backgroundColor: Colors.primaryColor100
    }
})

export default ScheduleEntry