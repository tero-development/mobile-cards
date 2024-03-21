import { createContext, useReducer, useState } from "react";

export const ScoreContext = createContext()

function producerReducer(state, action){
    switch(action.type){
        case "update_tracker":
            return {...state, tracker : action.payload}
        default:
            return state
    }
}

const ScoreContextProvider = ({children}) =>{
    const [scoreTracker, dispatch] = useReducer(producerReducer, {
        tracker:{}
    })

    async function updateScoreTracker(tracker){
        dispatch({type: 'update_tracker', payload: tracker})
    }


    const value = {
        scoreTracker: scoreTracker,
        updateScoreTracker: updateScoreTracker,
    }
    
    return(
        <ScoreContext.Provider value={value}>
            {children}
        </ScoreContext.Provider>
    )
}


export default ScoreContextProvider