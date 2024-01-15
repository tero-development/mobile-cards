import {View, Text, StyleSheet} from 'react-native'
import {RadioButton} from 'react-native-radio-buttons-group';
import DeviceFractions from '../../utils/dimensions';
import Colors from '../../utils/colors';

const AnswerButton = ({label, value, onPress, id, current, setCurrent}) =>{

    return(
       <RadioButton
            id={id}
            value={value} 
            onPress={()=>{
                setCurrent(id)
                onPress(value)
            }}
            label={label}
            labelStyle={{color: Colors.secondaryColor}}
            selected={id === current}
            color={Colors.secondaryColor}
            borderSize={1}
            size={DeviceFractions.deviceHeight / 60}
        />
    )
}

export default AnswerButton

const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    container:{
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: DeviceFractions.deviceH40
    },
    radioGroupContainer:{
        alignItems: 'flex-start'
    },
    questionLineText:{
        fontSize: DeviceFractions.deviceH50
    }
})