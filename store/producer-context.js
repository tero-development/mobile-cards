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
            const quizIndex = action.payload.index
            let placeholder = state.scoreList
            placeholder.splice(quizIndex, 1, {...placeholder[quizIndex], quizScore: action.payload.value})
            return {...state, scoreList : placeholder}
        case "update_team_rank":
            const teamIndex = action.payload.index
            let temp = state.scoreList
            temp.splice(teamIndex, 1, {...temp[teamIndex], teamRank: action.payload.value})
            return {...state, scoreList : temp}
        case "update_attendance":
            const attendanceIndex = action.payload.index
            let pseudo = state.scoreList
            pseudo.splice(attendanceIndex, 1, {...pseudo[attendanceIndex], attendanceMinutes: action.payload.value})
            return {...state, scoreList : pseudo}
        case "update_current_month":
            return {...state, currentMonth: action.payload}
        case "update_current_class":
            return {...state, currentClass: action.payload}
        case "update_shallow_tracker":
            return {...state, shallowScoreTracker: action.payload}
        default:
            return state
    }
}

const ProducerContextProvider = ({children}) =>{
    const [schedule, dispatch] = useReducer(producerReducer, {
        months: [],
        classes: [],
        roster: [],
        scoreList: [],
        currentMonth: "",
        currentClass: {},
        shallowScoreTracker: {
        }
    })

    async function updateScheduleClasses(classes){
        dispatch({type: 'update_classes', payload: classes})
    }

    function updateScheduleMonths(months){
        dispatch({type: 'update_months', payload: months})
    }

    async function updateCurrentMonth(month){
        dispatch({type: 'update_current_month', payload: month})
    }

    async function updateCurrentClass(classObject){
        dispatch({type: 'update_current_class', payload: classObject})
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

    async function updateTeamRank(object){
        dispatch({type: 'update_team_rank', payload: object})
    }

    async function updateAttenanceMinutes(object){
        dispatch({type: "update_attendance", payload: object})
    }

    async function updateShallowScoreTracker(object){
        dispatch({type: "update_shallow_tracker", payload: object})
    }

    function updateScheduleClear(){
        dispatch({type:"", payload:""})
    }

    const value = {
        schedule: schedule,
        updateScheduleClasses: updateScheduleClasses,
        updateScheduleMonths: updateScheduleMonths,
        updateCurrentMonth: updateCurrentMonth,
        updateCurrentClass: updateCurrentClass,
        updateScheduleRoster: updateScheduleRoster,
        updateScoreList: updateScoreList,
        updateQuizScore: updateQuizScore,
        updateTeamRank: updateTeamRank,
        updateAttenanceMinutes: updateAttenanceMinutes,
        updateShallowScoreTracker: updateShallowScoreTracker,
        updateScheduleClear: updateScheduleClear
    }
    
    return(
        <ProducerContext.Provider value={value}>
            {children}
        </ProducerContext.Provider>
    )
}


export default ProducerContextProvider