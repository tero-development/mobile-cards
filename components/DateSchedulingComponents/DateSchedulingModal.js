import { useState } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import DateScheduleDropDown from './DateScheduleDropDown'
import ModularModal from '../ModularModal'
import DeviceFractions from '../../utils/dimensions';
import Colors from '../../utils/colors';

const months = [
    { label: 'January', value: 0 },
    { label: 'February', value: 1 },
    { label: 'March', value: 2 },
    { label: 'April', value: 3 },
    { label: 'May', value: 4 },
    { label: 'June', value: 4 },
    { label: 'July', value: 6 },
    { label: 'August', value: 7 },
    { label: 'September', value: 8 },
    { label: 'October', value: 9 },
    { label: 'November', value: 10 },
    { label: 'December', value: 11 },
  ];

 

const DateScheduleModal = ({isModalVisible, modalCloseHandler, modeSelection}) =>{
    const [monthSelection, setMonthSelection] = useState('')
    const [daySelection, setDaySelection] = useState('')

    let days = []

    if(monthSelection === 0){
        days = [
            {label: 1, value: 1}, 
            {label: 2, value: 2}, 
            {label: 3, value: 3}, 
            {label: 4, value: 4}, 
            {label: 5, value: 5}, 
            {label: 6, value: 6}, 
            {label: 7, value: 7}, 
            {label: 8, value: 8}, 
            {label: 9, value: 9}, 
            {label: 10, value: 10}, 
            {label: 11, value: 11}, 
            {label: 12, value: 12}, 
            {label: 13, value: 13}, 
            {label: 14, value: 14}, 
            {label: 15, value: 15}, 
            {label: 16, value: 16}, 
            {label: 17, value: 17}, 
            {label: 18, value: 18}, 
            {label: 19, value: 19}, 
            {label: 20, value: 20}, 
            {label: 21, value: 21}, 
            {label: 22, value: 22}, 
            {label: 23, value: 23}, 
            {label: 24, value: 24}, 
            {label: 25, value: 25}, 
            {label: 26, value: 26}, 
            {label: 27, value: 27}, 
            {label: 28, value: 28}, 
            {label: 29, value: 29}, 
            {label: 30, value: 30}, 
            {label: 31, value: 31}, 
        ]
    }
    
    if(modeSelection === "add"){
        return(
            <ModularModal modalIsVisible={isModalVisible} modalOff={modalCloseHandler} style={styles.modal}>
                <View style={styles.modalInnerContainer}>
                    <View style={styles.dropDownContainer}>
                        <DateScheduleDropDown 
                            data={months} 
                            viewStyle={{width:DeviceFractions.deviceWidth / 10 * 3}}
                            placeholder={'Month'}
                            state={monthSelection}
                            setState={setMonthSelection}
                        />
                        {   monthSelection !== '' &&  
                            <DateScheduleDropDown
                                data={days} 
                                viewStyle={{width:DeviceFractions.deviceWidth / 10 * 3}}
                                placeholder={'Day'}
                                state={daySelection}
                                setState={setDaySelection}
                            />
                        }
                    </View>
                </View>
            </ModularModal>
        )
    } else{
        return(
            <ModularModal modalIsVisible={isModalVisible} modalOff={modalCloseHandler} style={styles.modal}>
                <View style={styles.modalInnerContainer}>
                    <Text>Replace modal here</Text>
                </View>
            </ModularModal>
        )
    }
}

const styles = StyleSheet.create({
    modal:{
        flex:1
    },
    modalInnerContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'turquoise'
    },
    dropDownContainer:{
        borderWidth: 2,
        borderColor: Colors.secondaryColor,
        borderRadius: 10,
        flexDirection: 'row'
    }
})

export default DateScheduleModal