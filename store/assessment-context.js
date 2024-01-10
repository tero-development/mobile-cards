import { createContext, useReducer } from "react";

export const AssessmentContext = createContext()

function assessmentReducer(state, action){
    switch(action.type){
        case 'update_assessment':
            return action.payload
        default:
            return state
    }
}

const AssessmentContextProvider = ({children}) =>{
    const [assessment, dispatch] = useReducer(assessmentReducer, {})

    function updateAssessment(assessment){
        dispatch({type:'update_assessment', payload: assessment})
    }

    const value = {
        assessment: assessment,
        updateAssessment: updateAssessment
    }

    return(
        <AssessmentContext.Provider value={value}>
            {children}
        </AssessmentContext.Provider>
    )
}

export default AssessmentContextProvider