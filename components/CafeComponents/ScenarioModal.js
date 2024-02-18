import ModularLink from "../ModularLink"
import ModularModal from "../ModularModal"

const ScenarioModal = ({visible, scenarios, modalOff}) =>{
    const {scenario1, scenario2} = scenarios

    return(
        <ModularModal visible={visible}>
            <Text>{scenario1}</Text>
            <Text>{scenario2}</Text>
            <ModularLink onPress={modalOff}>Close</ModularLink>
        </ModularModal>
    )
}

export default ScenarioModal