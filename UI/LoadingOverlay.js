import {Text, View, StyleSheet, ActivityIndicator} from 'react-native'

const LoadingOverlay = ({message, color}) =>{
    return (
    <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
        <ActivityIndicator size={'large'} color={color? color : null}/>
    </View>
        
    )
}

export default LoadingOverlay

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 24,
        marginBottom: 24
    }
})