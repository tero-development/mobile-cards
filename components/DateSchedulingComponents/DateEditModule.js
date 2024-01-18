import {View, Text, StyleSheet, Pressable} from 'react-native'
import { useState, useEffect } from 'react'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'
import _ from 'lodash'
import ModularLink from '../ModularLink'
import ModularButton from '../ModularButton'
import { simplePromise, wordStacker } from '../../utils/helperFunctions'
import { getCafeSingularDates } from '../../httpServices/cafes'
import DateEntry from './DateEntry'
import ClickBox from '../ClickBox'
import Loader from '../../UI/Loader'
import FooterOptions from './FooterOptions'
import DateScheduleModal from './DateSchedulingModal'

const DateEditModule = ({targetCafe, cafes, offeredDateIds, modeSelection, closeEditingHandler}) =>{
  const [isLoading, setIsLoading] = useState(false)
  const [currentCafeOfferedSet, setCurrentOfferedSet] = useState([])
  const [pressedEntry, setPressedEntry] = useState({})
  const [isDifferent, setIsDifferent] = useState(false)
  const [submitOption, setSubmitOption] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(()=>{
    async function determineData(targetCafe, cafes, offeredDateIds){
        try{
            const response = await getCafeSingularDates(offeredDateIds)
            if(response){
                setCurrentOfferedSet(response)
            }
        }catch(e){
            alert(e)
        }
    }

    if(offeredDateIds.length > 0){
        determineData(targetCafe, cafes, offeredDateIds)
    }
  },[])

  useEffect(()=>{
    if(Object.keys(pressedEntry).length === 0){
        setIsDifferent(false)
    } else{
        setIsDifferent(true)
    }
  },[pressedEntry])

  function modalOpenHandler(){
    setIsModalVisible(true)
  }

  function modalCloseHandler(){
    setIsModalVisible(false)
  }


  const DateEntryList = () =>{
        return currentCafeOfferedSet.length > 0 && currentCafeOfferedSet.map(entry=>{
        const originalDate = new Date(entry.date) 
        const fullMonth = originalDate.toLocaleString('default', {month: 'long'})
        const numericDay = originalDate.toLocaleString('default', {day: 'numeric'})
        const headlineDate = `${fullMonth}, ${numericDay}`
        const timeDate = originalDate.toLocaleString()
        const time = timeDate.slice(timeDate.length - 11, timeDate.length)



        return(
            <DateEntry 
                key={entry._id} 
                id={entry._id} 
                monthNumber={currentCafeOfferedSet[0].monthNumber} 
                monthName={entry.monthName} 
                date={headlineDate} 
                time={time}
                currentList={currentCafeOfferedSet}
                index={currentCafeOfferedSet.indexOf(entry)}
                setPressedEntry={setPressedEntry}
                pressedEntry={pressedEntry}
                modeSelection={modeSelection}
            />
        )
    })
  }

  function toggleYesHandler(){
    setSubmitOption(true)
}

function toggleNoHandler(){
    setSubmitOption(false)
}

function deleteSubmitHandler(){
    submitOption? deleteYesHandler() : submitNoHandler()
}

function replaceSubmitHandler(){
    submitOption? modalOpenHandler() : submitNoHandler()
}

  async function deleteYesHandler(){
   
        setIsLoading(true)
        setTimeout(()=>{
            console.log('date successfully deleted')
            setIsLoading(false)
            setPressedEntry({})
            setSubmitOption(false)
        }, 3000)

}

function submitNoHandler(){
      closeEditingHandler()
}



const footerVariables = {
    isDifferent: isDifferent,
    submitOption: submitOption,
    modeSelection: modeSelection,
    deleteSubmitHandler: deleteSubmitHandler,
    replaceSubmitHandler: replaceSubmitHandler,
    toggleYesHandler: toggleYesHandler,
    toggleNoHandler: toggleNoHandler,
    closeEditingHandler: closeEditingHandler,
    modalOpenHandler: modalOpenHandler
}

  let footerContent = <FooterOptions {...footerVariables}/>
    


    if(isLoading){
        return <Loader size='large' color={Colors.accentColor}/>
    }
    
    return(
        <View style={styles.scheduleContainer}>
            <View style={styles.scheduleHeader}>
                <Text style={styles.topTitle}>{targetCafe.title}</Text>
            </View>
            <View style={styles.scheduleBody}>
                <DateEntryList />
            </View>
            <View style={styles.scheduleFooter}>
                {footerContent}
            </View>
            <DateScheduleModal isModalVisible={isModalVisible} modalCloseHandler={modalCloseHandler} modeSelection={modeSelection}/>
        </View>
    )
}


const styles = StyleSheet.create({
    scheduleContainer:{
        height: DeviceFractions.deviceHeight / 1.8,
        width: DeviceFractions.deviceWidth / 10 * 8.5,
    },
    scheduleHeader:{
        // height: '20%',
        height: '18%',
        backgroundColor: Colors.secondaryColor,
        paddingHorizontal: DeviceFractions.deviceW20,
        paddingVertical: DeviceFractions.deviceHeight / 85,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topTitle:{
        color: 'white',
        fontSize: DeviceFractions.deviceHeight / 45,
        fontWeight: 'bold'
    },
    
    topDate:{
        fontSize: DeviceFractions.deviceHeight / 50,
        color: 'white',
        textAlign: 'right'
    },
    selectADate:{
        marginBottom: DeviceFractions.deviceH50,
        width: DeviceFractions.deviceWidth,
        padding: DeviceFractions.deviceWidth / 15,
        alignItems: 'flex-end'

    },
    scheduleBody:{
        // height: '60%',
        height: '65%',
        backgroundColor: Colors.highlightColor,
        padding: DeviceFractions.deviceW30,
        justifyContent: 'center'
    },
    scheduleFooter:{
        height: '28%',
        backgroundColor: Colors.accentColor400,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerSaveOptions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        width: '75%'
    },
    submitContainer:{
        backgroundColor: Colors.highlightColor,
        borderRadius: 10,
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: DeviceFractions.deviceHeight / 100
    },
    submitOption:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '50%',
        marginBottom: DeviceFractions.deviceHeight / 200
    },
    submitText:{
        color: Colors.secondaryColor
    },
    clickBox:{
        backgroundColor: Colors.unselectedColor,
        height: 15,
        width: 15,
        borderRadius: 3
    },
    modal:{
        flex:1
    },
    modalInnerContainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.primaryColor100,
        paddingTop: DeviceFractions.deviceH20,
    },
    footerTitleStyle:{
        fontSize: DeviceFractions.deviceHeight / 35, 
        color: Colors.highlightColor,
        fontWeight: 'bold'
    }
    
})

export default DateEditModule