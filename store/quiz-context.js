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
    const [quizzes, dispatch] = useReducer(quizReducer, [])

    function updateQuizzes(quizArray){
        dispatch({type:'update_quiz', payload: quizArray})
    }

    const value = {
        quizzes: quizzes,
        updateQuizzes: updateQuizzes
    }

    return(
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    )
}

export default QuizContextProvider