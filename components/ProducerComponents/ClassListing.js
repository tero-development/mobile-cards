import {View, Text, Pressable, useWindowDimensions} from 'react-native'
import Colors from '../../utils/colors'
import { converterSetup, useStyles } from '../../utils/dimensions'
import IconButton from '../../UI/IconButton'

const ClassListing=({title, date, rosterSize, time, onPress, locked})=>{
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        container:{ 
            backgroundColor: Colors.accentColor,
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
            fontSize: converter(width/25),
            fontWeight: 'bold'
        },
        listingDate:{
            color: Colors.highlightColor,
            fontSize: converter(width/30),
        },
        listingTime:{
            color: Colors.highlightColor,
            fontSize: converter(width/35),
            marginRight: converter(width/35)
        },
        timeAndRoster:{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'baseline',
        }
    }

    const styles = useStyles(localStyles)
    return( 
        <Pressable style={styles.container} onPress={onPress}>
            <View>
                <Text style={styles.listingTitle}>{title}</Text>
                <Text style={styles.listingDate}>{date}</Text>
                <View style={styles.timeAndRoster}>
                    <Text style={styles.listingTime}>{time}</Text>
                    <Text style={styles.listingTime}>{`Roster: ${rosterSize}`}</Text>
                </View>
            </View>
            <IconButton 
                isHeader={false} iconName={locked? "lock-closed-outline" : "caret-forward-outline"}   iconColor={Colors.highlightColor} 
            />
        </Pressable>
    )
}

export default ClassListing