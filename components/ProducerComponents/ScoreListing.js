import {View, Text, Pressable, useWindowDimensions} from 'react-native'
import Colors from '../../utils/colors'
import { converterSetup, useStyles } from '../../utils/dimensions'
import IconButton from '../../UI/IconButton'
import { TextInput } from 'react-native-gesture-handler'

const ClassListing=({firstName, lastName, onPress})=>{
    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        container:{ 
            backgroundColor: Colors.accentColor300,
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            height: height/8,
            width: converter(width/10 * 7),
            marginBottom: height/50,
            paddingHorizontal: width/25,
            borderRadius: converter(width/25, width/20, width/20, width/25)
        },
        name:{
            color: Colors.highlightColor,
            fontSize: width/25,
            fontWeight: 'bold'
        },
        listingDate:{
            color: Colors.highlightColor,
            fontSize: width/30,
        },
        listingTime:{
            color: Colors.highlightColor,
            fontSize: width/35,
        }
    }

    const styles = useStyles(localStyles)
    return( 
        <Pressable style={styles.container} onPress={onPress}>
            <View>
                <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
                <TextInput 
                    value ={"quizScore"}
                    // onChangeText = {() =>}
                    autoCorrect = {true}
                    autoCapitalize = "none"
                    // style={[styles.passwordInputStyle, disable && styles.deactivated,  {color: color}]} 
                />
                <TextInput 
                    value ={"teamScore"}
                    // onChangeText = {() =>}
                    autoCorrect = {true}
                    autoCapitalize = "none"
                    // style={[styles.passwordInputStyle, disable && styles.deactivated,  {color: color}]} 
                />
            </View>
            <IconButton 
                isHeader={false} iconName={"caret-forward-outline"}   iconColor={Colors.highlightColor} 
            />
        </Pressable>
    )
}

export default ClassListing