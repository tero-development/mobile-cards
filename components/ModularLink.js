import {Text, Pressable, StyleSheet} from 'react-native'


const ModularLink = ({children, onPress, textSize, textWeight, textColor, textStyles, viewStyle}) =>{

    return(
        <Pressable onPress={onPress} style={viewStyle}>
            <Text style={[styles.text, {color: textColor, fontSize: textSize, fontWeight: textWeight}, textStyles]}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text:{
        fontWeight: 400
    }
})

export default ModularLink