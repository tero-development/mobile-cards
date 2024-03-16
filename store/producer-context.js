import { createContext, useReducer, useState } from "react";

export const ProducerContext = createContext()

function producerReducer(state, action){
    switch(action.type){
        case "update_classes":
            return {...state, classes : action.payload}
        case "update_months":
                return {...state, months : action.payload}
        default:
            return state
    }
}

const ProducerContextProvider = ({children}) =>{
    const [schedule, dispatch] = useReducer(producerReducer, {
        months: [],
        classes: []
    })
    const [stateClasses, setStateClasses] = useState([])

    function scheduleClassesSetter(classes){
        setStateClasses(classes)
    }

    async function updateScheduleClasses(classes){
        dispatch({type: 'update_classes', payload: classes})
    }

    function updateScheduleMonths(months){
        dispatch({type: 'update_months', payload: months})
    }

    function updateScheduleClear(){
        dispatch({type:"", payload:""})
    }

    const value = {
        schedule: schedule,
        stateClasses: stateClasses,
        scheduleClassesSetter: scheduleClassesSetter,
        updateScheduleClasses: updateScheduleClasses,
        updateScheduleMonths: updateScheduleMonths,
        updateScheduleClear: updateScheduleClear
    }
    
    return(
        <ProducerContext.Provider value={value}>
            {children}
        </ProducerContext.Provider>
    )
}


export default ProducerContextProvider