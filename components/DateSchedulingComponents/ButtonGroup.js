import {View, StyleSheet} from 'react-native'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'
import ModularButton from '../ModularButton'


const ButtonGroup = ({selectionHandler}) =>{

   
    return(
        <View style={styles.buttonContainer}>
        <ModularButton 
            textColor={Colors.highlightColor} 
            textSize={DeviceFractions.deviceH50} 
            textStyles={{fontWeight: 'bold'}} 
            style={styles.buttonStyle} 
            buttonColor={Colors.secondaryColor400} 
            onPress={()=>{selectionHandler('add')}}
            >
                Add Date
            </ModularButton>
        <ModularButton 
            buttonColor={Colors.accentColor400} 
            textColor={Colors.highlightColor} 
            textSize={DeviceFractions.deviceH50} 
            textStyles={{fontWeight: 'bold'}} 
            style={styles.buttonStyle} 
            onPress={()=>{selectionHandler('delete')}}
            >
                Delete Date
            </ModularButton>
        <ModularButton 
            buttonColor={Colors.secondaryColor} 
            textColor={Colors.highlightColor} 
            textSize={DeviceFractions.deviceH50} 
            textStyles={{fontWeight: 'bold'}} 
            style={styles.buttonStyle} 
            onPress={()=>{selectionHandler('replace')}}
            >
                Replace Date
            </ModularButton>
        </View>
          
    )
}

const styles = StyleSheet.create({

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

export default ButtonGroup