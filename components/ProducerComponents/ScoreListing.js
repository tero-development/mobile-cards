import {View, Text, Pressable, useWindowDimensions} from 'react-native'
import { useState, useContext } from 'react'
import Colors from '../../utils/colors'
import { converterSetup, useStyles } from '../../utils/dimensions'
import { TextInput } from 'react-native-gesture-handler'
import { ProducerContext } from '../../store/producer-context'
import IconButton from '../../UI/IconButton'

const ScoreListing=({firstName, lastName, index, roster, rosterChecker, onPress})=>{
    const [quizScore, setQuizScore] = useState("")
    const [teamScore, setTeamScore] = useState("")
    const { updateQuizScore, updateTeamScore} = useContext(ProducerContext)

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    const localStyles = {
        container:{ 
            backgroundColor: Colors.accentColor400,
            flexDirection: "row",
            alignItems: 'center',
            height: converter(height/10),
            width: converter(width/10 * 8.5),
            marginBottom: height/50,
            paddingLeft: width/18.5,
            borderRadius: converter(width/25, width/20, width/20, width/25)
        },
        name:{
            color: Colors.highlightColor,
            fontSize: width/22.5,
            fontWeight: 'bold',
            flex: converter(0.55)
        },
        inputContainer:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: converter(0.35)
        },
        input:{
            backgroundColor: Colors.highlightColor,
            height: converter(width/12.5),
            width: converter(width/12.5),
            paddingLeft: converter(width/50),
            fontSize: width/30,
            borderRadius: converter(width/75)
        },
        // teamInput:{
        //     backgroundColor: Colors.highlightColor,
        //     fontSize: width/35,
        // }
    }


    function setQuizPoints(text){
        updateQuizScore({index: index, value: text})
        rosterChecker(prev => !prev)
    }

    function setTeamPoints(text){
        updateTeamScore({index: index, value: text})
        rosterChecker(prev => !prev)
    }

    const styles = useStyles(localStyles)
    return( 
            <Pressable style={styles.container} onPress={onPress}>
                <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
                {/* <View style={styles.inputContainer}>
                    <TextInput 
                        value ={quizScore}
                        onChangeText = {(text) =>  {
                            if(!isNaN(text)) { 
                                setQuizScore(text)
                                const numericValue = parseInt(text)
                                setQuizPoints(numericValue)
                            } 
                        }}
                        placeholder=''
                        autoCorrect = {true}
                        autoCapitalize = "none"
                        style={styles.input}
                        keyboardType= 'number-pad'
                        maxLength = {2}
                    />
                    <TextInput 
                        value ={teamScore}
                        onChangeText = {(text) =>  {
                            if(!isNaN(text)) { 
                                setTeamScore(text); 
                                const numericValue = parseInt(text)
                                setTeamPoints(numericValue)
                            } 
                        }}  
                        autoCorrect = {true}
                        autoCapitalize = "none"
                        style={styles.input}
                        keyboardType= 'number-pad'
                        maxLength={2}
                    />
                </View> */}
                <IconButton iconName={"create-outline"} iconColor={Colors.highlightColor} />
            </Pressable>
    )
}

export default ScoreListing