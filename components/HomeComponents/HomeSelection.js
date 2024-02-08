import {View, Text, useWindowDimensions, Pressable} from 'react-native'
import IconButton from '../../UI/IconButton'
import Colors from '../../utils/colors'
import {converterSetup, useStyles} from '../../utils/dimensions'

const HomeSelection = ({title, iconName, iconSize, onPress, prompt, prompText, promptColor, promptSize}) =>{

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        profileContainer:{
        
        },
        profileSelection:{
            borderWidth: converter(1.5, 2, 3, 3.5),
            borderColor: Colors.secondaryColor,
            padding: converter(width/40, width/30, width/40, width/40),
            borderRadius: width/10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: height/40
        },
        profileSelection_TextIcon:{
            flexDirection: 'row',
            alignItems: 'center',
            width: width / 10 * 5
        },
        profileTextContainer:{
            flexDirection: 'row',
            alignItems: 'center'
        },
        profileSelectionTitle:{
            fontSize: converter(width/35, width/30, width/35, width/35),
            color: Colors.secondaryColor,
            fontWeight: 'bold',
            marginRight: width/50
        },
        defaultNotification:{
            fontSize: converter(width/35, width/30, width/35, width/35),
            fontWeight: 'bold'
        }
    }
 
    const styles = useStyles(localStyles)
    return(
        <Pressable style={styles.profileSelection} onPress={onPress}>
        <View style={styles.profileSelection_TextIcon}>
            <IconButton 
                isHeader={false} iconName={iconName}   iconColor={Colors.secondaryColor} viewStyle={{marginRight: converter(width/50, width/35, width/55, width/60)}}
            />
            <View style={styles.profileTextContainer}>
                <Text style={styles.profileSelectionTitle}>{title} </Text>
                {prompt && 
                <Text style={[styles.defaultNotification, {color: promptColor}, promptSize && {fontSize: promptSize}]}>{prompText}</Text>}
            </View>
        </View>
        {
            title !== 'Achievements' && 
            <IconButton isHeader={false} iconName='chevron-forward'   iconColor={Colors.secondaryColor} />
        }
        </Pressable>
    )
}


export default HomeSelection