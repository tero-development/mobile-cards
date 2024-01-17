import { View, Text, StyleSheet} from 'react-native'
import DropdownComponent from '../DropdownComponent'
import ModularModal from '../ModularModal'


const DateScheduleModal = ({isModalVisible, modalCloseHandler, modeSelection}) =>{
    if(modeSelection === "add"){
        return(
            <ModularModal modalIsVisible={isModalVisible} modalOff={modalCloseHandler} style={styles.modal}>
                <View style={styles.modalInnerContainer}>
                    <Text>Add Modal here</Text>
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
    }
})

export default DateScheduleModal