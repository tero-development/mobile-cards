import { View} from "react-native"
import Colors from "../utils/colors"

const ClickBox = ({height, width, borderRadius, toggle, toggleColor, styles})=>{
    
    const clickBoxStyles={
        backgroundColor: Colors.unselectedColor,
        height: height,
        width: width,
        borderRadius: borderRadius
    }

    clickBoxSelectedStyles={
        backgroundColor: toggleColor
    }
    return(
        <View style={[clickBoxStyles, toggle && clickBoxSelectedStyles, styles && styles]}></View>
    )
}

export default ClickBox

