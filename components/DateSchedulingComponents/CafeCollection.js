import {View, Text, StyleSheet, Pressable} from 'react-native'
import Colors from '../../utils/colors'
import DeviceFractions from '../../utils/dimensions'
import IconButton from '../../UI/IconButton'
import ModularLink from '../ModularLink'


const CafeCollection = ({cafes, onPressHandler, closeHandler}) =>{

   
    return(
        <View style={styles.container}>
            <View style={styles.cafeTopContainer}>
                {
                    cafes.length > 0 &&
                    cafes.map(entry =>{
                        return (
                            <Pressable key={cafes.indexOf(entry)} style={styles.cafeContainer} onPress={()=>{onPressHandler(entry.title)}}>
                                <Text style={styles.cafeText}>{entry.title}</Text>
                                <IconButton isHeader={false} hasEditProfile={false} iconName={'chevron-forward'} iconSize={DeviceFractions.deviceH50} iconColor={Colors.secondaryColor}/>
                            </Pressable>
                        )
                                
                    })
                }
            </View>
            <ModularLink textSize={DeviceFractions.deviceH50} textColor={Colors.secondaryColor} onPress={closeHandler}>close</ModularLink>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginBottom: DeviceFractions.deviceH10
    },
    cafeContainer:{
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colors.secondaryColor,
        padding: DeviceFractions.deviceW50,
        marginBottom: DeviceFractions.deviceHeight / 65,
        marginRight: DeviceFractions.deviceW50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cafeText:{
        color: Colors.secondaryColor,
        fontWeight: 'bold',
        fontSize: DeviceFractions.deviceWidth / 35
    },
    cafeTopContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: DeviceFractions.deviceWidth / 10 * 8.5
    }
})

export default CafeCollection