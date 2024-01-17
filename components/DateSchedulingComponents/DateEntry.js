import {View, Text, StyleSheet, Pressable} from 'react-native'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'
import { useState, useEffect, useContext } from 'react'
import { CafeContext } from '../../store/cafe-context'
import _ from 'lodash'


const DateEntry = (props) =>{
    const {
        date, 
        time, 
        monthNumber, 
        id,
        index,
        currentList,
        pressedEntry,
        setPressedEntry,
        modeSelection 
    } = props


    function determineSelected(){
        let value = false
   
                if(pressedEntry._id === id){
                    value = true
                }
            
        
        return value
    }


    if(modeSelection === 'add'){
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={styles.timeText}>{time}</Text>
                </View>
            </View>
        )
    } else{
        return(
            <Pressable style={styles.container} onPress={()=>{setPressedEntry(currentList[index])}}>
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

export default DateEntry