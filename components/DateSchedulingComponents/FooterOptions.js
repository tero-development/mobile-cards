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


const Body = ({phraseGenerator, submitOption, modeSelection, deleteSubmitHandler, replaceSubmitHandler, toggleYesHandler, toggleNoHandler}) =>{

    if(modeSelection==='delete'){
        return(
    
            <View style={styles.footerSaveOptions}>
                <View>
                    {
                       wordStacker( phraseGenerator(modeSelection), styles.footerTitleStyle)
                    }
                </View>
                <View style={styles.submitContainer}>
                    <Pressable onPress={toggleYesHandler} style={styles.submitOption}>
                        <Text style={styles.submitText}>Yes</Text>
                        <ClickBox height={15} width={15} borderRadius={3} toggle={submitOption} toggleColor={Colors.secondaryColor300} />
                    </Pressable>
                    <Pressable onPress={toggleNoHandler} style={styles.submitOption}>
                        <Text style={styles.submitText}>No</Text>
                        <ClickBox height={15} width={15} borderRadius={3} toggle={!submitOption} toggleColor={Colors.secondaryColor300} />
                    </Pressable>
                    <ModularButton 
                        style={{
                            width: '75%', 
                            height: DeviceFractions.deviceH40,
                            borderRadius: 4,
                            shadowColor: 'black',
                            shadowOpacity: 0.25,
                            shadowOffset: {width: 0, height: 2},
                            shadowRadius: 8,
                            elevation: 4
                        }} 
                        buttonColor={Colors.secondaryColor300} 
                        textSize={DeviceFractions.deviceW30} 
                        textStyles={{fontWeight: 'bold'}} 
                        textColor={Colors.highlightColor}
                        onPress={deleteSubmitHandler}
                    >
                        Submit
                    </ModularButton>
                </View>
            </View>
          
      )
    }
    if(modeSelection==='replace'){
        //this should also bring up the modal, with similar fields as the add version of the modal
        return(
    
            <View style={styles.footerSaveOptions}>
                <View>
                    {
                       wordStacker( phraseGenerator(modeSelection), styles.footerTitleStyle)
                    }
                </View>
                <View style={styles.submitContainer}>
                    <Pressable onPress={toggleYesHandler} style={styles.submitOption}>
                        <Text style={styles.submitText}>Yes</Text>
                        <ClickBox height={15} width={15} borderRadius={3} toggle={submitOption} toggleColor={Colors.secondaryColor300} />
                    </Pressable>
                    <Pressable onPress={toggleNoHandler} style={styles.submitOption}>
                        <Text style={styles.submitText}>No</Text>
                        <ClickBox height={15} width={15} borderRadius={3} toggle={!submitOption} toggleColor={Colors.secondaryColor300} />
                    </Pressable>
                    <ModularButton 
                        style={{
                            width: '75%', 
                            height: DeviceFractions.deviceH40,
                            borderRadius: 4,
                            shadowColor: 'black',
                            shadowOpacity: 0.25,
                            shadowOffset: {width: 0, height: 2},
                            shadowRadius: 8,
                            elevation: 4
                        }} 
                        buttonColor={Colors.secondaryColor300} 
                        textSize={DeviceFractions.deviceW30} 
                        textStyles={{fontWeight: 'bold'}} 
                        textColor={Colors.highlightColor}
                        onPress={replaceSubmitHandler}
                    >
                        Submit
                    </ModularButton>
                </View>
            </View>
          
      )
    }
    
        
}
    

const FooterOptions = ({isDifferent, submitOption, modeSelection, deleteSubmitHandler, replaceSubmitHandler, toggleYesHandler, toggleNoHandler, closeEditingHandler, modalOpenHandler}) =>{

const phraseGenerator = (mode) =>{
    switch(mode){
        case 'add':
            return "Add New Date"
        case 'delete':
            return 'Delete Date?'
        case 'replace':
            return 'Replace Date?'
        default:
        return ''
    }
}

const inherit = {
    isDifferent: isDifferent,
    submitOption: submitOption,
    modeSelection: modeSelection,
    deleteSubmitHandler: deleteSubmitHandler,
    replaceSubmitHandler: replaceSubmitHandler,
    toggleYesHandler: toggleYesHandler,
    toggleNoHandler: toggleNoHandler,
    modalOpenHandler: modalOpenHandler
}

if(!isDifferent && modeSelection === 'add'){
    return (
        <View style={styles.addPairContainer}>
            {/* this button's onPress should open a modal with the 
            necessary fields for adding a new cafe_date
            it will be the only version of the footer that doesn't change,
            just gets covered by the modal, which can cancel back to it */}
            <ModularButton 
                buttonColor={Colors.secondaryColor300} 
                textColor={Colors.highlightColor}
                textSize={DeviceFractions.deviceH50}
                textStyles={{fontWeight: 'bold'}}
                style={{
                    width: DeviceFractions.deviceWidth / 10 * 3,
                    marginBottom: DeviceFractions.deviceHeight / 75
                }}
                onPress={modalOpenHandler}
            >
                Add
            </ModularButton>
            <ModularLink 
                textColor={Colors.highlightColor} 
                textSize={DeviceFractions.deviceH50} 
                onPress={closeEditingHandler}
            >
                Close
            </ModularLink>
        </View>
    )
}

if(!isDifferent){
    return <ModularLink 
    textColor={Colors.highlightColor} 
    textSize={DeviceFractions.deviceH50} 
    onPress={closeEditingHandler}
>
    Close
</ModularLink>
}

if(isDifferent){
        return(
            <Body {...inherit} phraseGenerator={phraseGenerator}/>
        )
    }
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
        fontSize: DeviceFractions.deviceHeight / 54,
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
    },
    addPairContainer:{
        alignItems: 'center'
    }
    
})

export default FooterOptions