import { createContext, useReducer } from "react";

export const ProducerContext = createContext()

function producerReducer(state, action){
    switch(action.type){
        case "update_schedule":
            return {...action.payload}
        default:
            return state
    }
}

const ProducerContextProvider = ({children}) =>{

    const [schedule, dispatch] = useReducer(producerReducer, {
        
    })

    function updateSchedule(schedule){
        dispatch({type: 'update_schedule', payload:schedule})
    }

    function updateScheduleClear(){
        dispatch({type:"", payload:""})
    }

    const value = {
        schedule: schedule,
        updateSchedule: updateSchedule,
        updateScheduleClear: updateScheduleClear
    }
    
    return(
        <ProducerContext.Provider value={value}>
            {children}
        </ProducerContext.Provider>
    )
}


export default ProducerContextProvider