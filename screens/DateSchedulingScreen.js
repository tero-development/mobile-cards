import {View, Text, StyleSheet, Pressable} from 'react-native'
import { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../utils/colors'
import IconButton from '../UI/IconButton'
import DeviceFractions from '../utils/dimensions'
import { archiveDeal } from '../httpServices/HBDeals'
import { getCafeDates } from '../httpServices/cafes'
import { wordStacker } from '../utils/helperFunctions'
import CafeCollection from '../components/DateSchedulingComponents/CafeCollection'
import ButtonGroup from '../components/DateSchedulingComponents/ButtonGroup'
import DateEditModule from '../components/DateSchedulingComponents/DateEditModule'

const DateSchedulingScreen = ({navigation, route}) =>{
    const [modeSelection, setModeSelection] = useState('')
    const [targetCafe, setTargetCafe] = useState({})
    const [offeredDateIds, setOfferedDateIds] = useState([])
    const [isEditingDates, setIsEditingDates] = useState(false)
    
    const cafes = route.params


    useEffect(()=>{
        if(offeredDateIds.length > 0){
            setIsEditingDates(true)
        } else{
            setIsEditingDates(false)
        }
    },[offeredDateIds])

    function openDrawer({}){
        navigation.toggleDrawer()
    }
    
    function onPressHandler(cafeTitle){
        cafes.forEach(entry =>{
            if(entry.title === cafeTitle){
                setTargetCafe(entry)
                setOfferedDateIds(entry.offeredDates)
            }
        })
    }

    function selectionHandler(designation){
        setModeSelection(designation)
    }

    function closeHandler(){
        setModeSelection('')
    }

    function closeEditingHandler(){
        setIsEditingDates(false)
        setModeSelection('')
        setOfferedDateIds([])

    }


    let initialContent = <ButtonGroup selectionHandler={selectionHandler} />
    
    if(modeSelection !== ''){
        initialContent =  <CafeCollection cafes={cafes} mode={modeSelection} onPressHandler={onPressHandler} closeHandler={closeHandler}/>
    }
   
    return(
        <LinearGradient style={styles.screen} colors={[Colors.highlightColor, Colors.primaryColor]}>
            <IconButton isHeader={false} iconName='menu' iconSize={28} iconColor={Colors.secondaryColor} onPress={openDrawer} viewStyle={{position: 'absolute', left: DeviceFractions.deviceW20, top: DeviceFractions.deviceH10, zIndex: 1}}/>
            <View style={styles.overContainer}>
                <View style={{marginBottom: DeviceFractions.deviceH40}}>
                    {
                        wordStacker('Date Scheduling', {
                            fontSize: DeviceFractions.deviceHeight / 22,
                            fontWeight: 'bold',
                            color: Colors.secondaryColor,
                            marginRight: DeviceFractions.deviceWidth / 10 * 1,
                            textAlign: 'right'
                        })
                    }
                </View>
                <View style={styles.container}>
                    <View style={styles.cafeCollectionContainer}>
                       {
                        isEditingDates ?
                        <DateEditModule cafes={cafes} targetCafe={targetCafe} offeredDateIds={offeredDateIds} modeSelection={modeSelection} closeEditingHandler={closeEditingHandler}/>
                         : initialContent
                       }
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    overContainer:{
        flex: 1,
        justifyContent: 'center',
        marginTop: DeviceFractions.deviceHeight / 10 * 1
    },
    container:{
        flex: 1,
        alignItems: 'center',
        marginBottom: DeviceFractions.deviceH10
    },
    cafeContainer:{
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colors.secondaryColor,
        padding: DeviceFractions.deviceW50,
        marginBottom: DeviceFractions.deviceHeight / 65,
        marginRight: DeviceFractions.deviceW50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cafeText:{
        color: Colors.secondaryColor,
        fontWeight: 'bold',
        fontSize: DeviceFractions.deviceWidth / 35
    },
    cafeCollectionContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: DeviceFractions.deviceWidth / 10 * 8.5
    },
    buttonStyle:{
        marginBottom: DeviceFractions.deviceH40,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 4
    },
    buttonContainer:{
        height: DeviceFractions.deviceHeight / 10 * 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default DateSchedulingScreen