import { createContext, useReducer } from "react";

export const QuizContext = createContext()

function quizReducer(state, action){
    switch(action.type){
        case 'update_quiz':
            return action.payload
        default:
            return state
    }
}

const QuizContextProvider = ({children}) =>{
    const [quiz, dispatch] = useReducer(quizReducer, {})

    function updateAssessment(quizArray){
        dispatch({type:'update_quiz', payload: quizArray})
    }

    const value = {
        quiz: quiz,
        updateAssessment: updateAssessment
    }

    return(
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    )
}

export default QuizContextProvider