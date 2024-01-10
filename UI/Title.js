import {View, Text, StyleSheet} from 'react-native'

const Title = ({children, textSize, color, style, textStyle}) =>{
    return(
        <View>
            <Text style={[styles.presets, {fontSize: textSize, color: color}, style]}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    presets:{
        fontSize: 24,
        fontWeight: 'bold',
    }
})

export default Title