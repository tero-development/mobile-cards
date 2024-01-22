import {View, Text, StyleSheet, Pressable} from 'react-native'
import IconButton from '../../UI/IconButton'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'

const HomeSelection = ({title, iconName, iconSize, onPress, prompt, prompText, promptColor, prompSize}) =>{
    const propStyles = {
        fontSize: prompSize,
        color: promptColor,
    }
    return(
        <Pressable style={styles.profileSelection} onPress={onPress}>
        <View style={styles.profileSelection_TextIcon}>
            <IconButton 
                isHeader={false} iconName={iconName}  iconSize={iconSize} iconColor={Colors.secondaryColor} viewStyle={{marginRight: 12}}
            />
            <View style={styles.profileTextContainer}>
                <Text style={styles.profileSelectionTitle}>{title} </Text>
                {prompt && 
                <Text style={[styles.defaultNotification, propStyles]}>{prompText}</Text>}
            </View>
        </View>
        <IconButton 
             isHeader={false} iconName='chevron-forward'  iconSize={24} iconColor={Colors.secondaryColor} 
          
        />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    profileContainer:{
    
    },
    profileSelection:{
        borderWidth: 2,
        borderColor: Colors.secondaryColor,
        padding: 12,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: DeviceFractions.deviceH40
    },
    profileSelection_TextIcon:{
        flexDirection: 'row',
        alignItems: 'center',
        width: DeviceFractions.deviceWidth / 10 * 5
    },
    profileTextContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileSelectionTitle:{
        fontSize: DeviceFractions.deviceW30,
        color: Colors.secondaryColor,
        fontWeight: 'bold',
        marginRight: DeviceFractions.deviceW50
    },
    defaultNotification:{
        fontSize: DeviceFractions.deviceW30,
        fontWeight: 'bold'
    }
})

export default HomeSelection