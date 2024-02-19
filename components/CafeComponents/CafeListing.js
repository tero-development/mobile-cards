import {View, Text, Pressable, useWindowDimensions} from 'react-native'
import Colors from '../../utils/colors'
import { converterSetup, useStyles } from '../../utils/dimensions'
import IconButton from '../../UI/IconButton'

const CafeListing=({title, onPress, locked})=>{
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        container:{ 
            backgroundColor: Colors.secondaryColor400,
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            height: height/8,
            width: converter(width/10 * 7),
            marginBottom: height/50,
            paddingHorizontal: width/25,
            borderRadius: converter(width/25, width/20, width/20, width/25)
        },
        listingTitle:{
            color: Colors.highlightColor,
            fontSize: width/20,
            fontWeight: 'bold'
        }
    }

    const styles = useStyles(localStyles)
    return( 
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.listingTitle}>{title}</Text>
            <IconButton 
                isHeader={false} iconName={locked? "lock-closed-outline" : "caret-forward-outline"}   iconColor={Colors.highlightColor} 
            />
        </Pressable>
    )
}

export default CafeListing