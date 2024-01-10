import {Pressable, Keyboard, StyleSheet} from 'react-native'

const DismissKeyboard = ({children}) =>{
    return(
        <Pressable style={styles.screen} onPress={()=>{Keyboard.dismiss()}}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    }
})

export default DismissKeyboard 