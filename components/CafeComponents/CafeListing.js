import {View, Text, Pressable, useWindowDimensions} from 'react-native'
import Colors from '../../utils/colors'
import { converterSetup, useStyles } from '../../utils/dimensions'
import IconButton from '../../UI/IconButton'

const CafeListing=({title})=>{
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        container:{ 
            backgroundColor: Colors.secondaryColor400,
            flexDirection: "row",
            justifyContent: 'space'
        }
    }

    const styles = useStyles(localStyles)
    return( 
        <Pressable style={styles.container}>
            <Text>{title}</Text>
            <IconButton 
                isHeader={false} iconName={"caret-forward-outline"}   iconColor={Colors.highlightColor} 
            />
        </Pressable>
    )
}

export default CafeListing