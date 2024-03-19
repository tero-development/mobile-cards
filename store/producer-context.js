import { createContext, useReducer, useState } from "react";

export const ProducerContext = createContext()

function producerReducer(state, action){
    switch(action.type){
        case "update_classes":
            return {...state, classes : action.payload}
        case "update_months":
                return {...state, months : action.payload}
        case "update_roster":
                return {...state, roster : action.payload}
        case "update_score_list":
                return {...state, scoreList : action.payload}
        case "update_quiz_score":
                const index = action.payload.index
                let placeholder = state.scoreList
                placeholder.splice(index, 0, {...placeholder[index], quizScore: action.payload.message})
                return {...state, scoreList : placeholder}          
        default:
            return state
    }
}

const ProducerContextProvider = ({children}) =>{
    const [schedule, dispatch] = useReducer(producerReducer, {
        months: [],
        classes: [],
        roster: [],
        scoreList: []
    })

    async function updateScheduleClasses(classes){
        dispatch({type: 'update_classes', payload: classes})
    }

    function updateScheduleMonths(months){
        dispatch({type: 'update_months', payload: months})
    }

    async function updateScheduleRoster(roster){
        dispatch({type: 'update_roster', payload: roster})
    }

    async function updateScoreList(roster){
        dispatch({type: 'update_score_list', payload: roster})
    }

    async function updateQuizScore(object){
        dispatch({type: 'update_quiz_score', payload: object})
    }

    function updateScheduleClear(){
        dispatch({type:"", payload:""})
    }

    const value = {
        schedule: schedule,
        updateScheduleClasses: updateScheduleClasses,
        updateScheduleMonths: updateScheduleMonths,
        updateScheduleRoster: updateScheduleRoster,
        updateScoreList: updateScoreList,
        updateQuizScore: updateQuizScore,
        updateScheduleClear: updateScheduleClear
    }
    
    return(
        <ProducerContext.Provider value={value}>
            {children}
        </ProducerContext.Provider>
    )
}


export default ProducerContextProvider