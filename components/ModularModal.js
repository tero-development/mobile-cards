import { Modal, View, Button} from "react-native";


const ModularModal = ({children, modalIsVisible, modalOff}) =>{

    return(
        <Modal visible={modalIsVisible} animationType="slide">
            <View>
                {children}
            </View>
            <Button title="close" onPress={modalOff}/>
        </Modal>
    )
}

export default ModularModal