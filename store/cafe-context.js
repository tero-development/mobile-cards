import { createContext, useReducer } from "react";

export const CafeContext = createContext()

function cafeReducer(state, action){
    switch(action.type){
        case 'update_selectedCafes':
            return {...state, selectedCafes: action.payload}
        case 'update_scheduledDates':
            return {...state, scheduledDates: action.payload}
        case 'update_cafeTrackerAll':
            return {...state, cafeTracker: action.payload}
        case 'update_shallowTrackerAll':
            return {...state, shallowTracker: action.payload}
        case 'update_editScheduleVariables':
            return {...state, editScheduleVariables: action.payload}
        case 'update_editScheduleVariablesClear':
            return {...state, editScheduleVariables: action.payload}
        case 'update_cafeTracker':
            let modified = [...state.shallowTracker.list.filter(entry => entry.monthNumber !== action.payload.monthNumber)]
            modified.splice(action.payload.monthNumber - 1, 0, action.payload)
            return {
                ...state,
                cafeTracker: {list: modified}
            }
        case 'update_shallowTracker':
            let shallowModified = [...state.shallowTracker.list.filter(entry => entry.monthNumber !== action.payload.monthNumber)]
            shallowModified.splice(action.payload.monthNumber - 1, 0, action.payload)
            return {
                ...state,
                shallowTracker: {list: shallowModified}
            }
        default:
            return {
                selectedCafes: [],
                scheduledDates: [],
                cafeTracker: {list: []},
                shallowTracker: {list: []},
                editScheduleVariables:{
                    monthName: "",
                    monthNumber: "", 
                    clinicMonthName: "",
                    year: "",
                    currentCafeOfferedSet: [], 
                    targetSkill: "",
                }
            }
    }
}

const CafeContextProvider = ({children}) =>{
    const [cafeDetails, dispatch] = useReducer(cafeReducer, {
        selectedCafes: [],
        scheduledDates: [],
        cafeTracker: {list:[]},
        shallowTracker: {list: []},
        editScheduleVariables:{
            monthName: "",
            monthNumber: "", 
            clinicMonthName: "",
            year: "",
            currentCafeOfferedSet: [], 
            targetSkill: "",
        }
    })

    function updateSelectedCafes(cafeArray){
        dispatch({type:'update_selectedCafes', payload: cafeArray})
    }

    function updateScheduledDates(scheduledDateArray){
        dispatch({type:'update_scheduledDates', payload: scheduledDateArray})
    }
  
    function updateCafeTrackerAll(tracker){
        dispatch({type: 'update_cafeTrackerAll', payload: tracker})
    }

    function updateShallowTrackerAll(tracker){
        dispatch({type: 'update_shallowTrackerAll', payload: tracker})
    }
    //this mainly updated within the ScheduleEntry component, that is hydrated by 
    //mapping through a useState array called 'filteredArray' found within the EditSchedule
    //parent component
    function updateCafeTracker(headlineDate,date, time, monthNumber, id, zoomLink,clinicLink){
        dispatch({type: 'update_cafeTracker', payload: {
            headlineDate: headlineDate,
            date: date, 
            time: time, 
            monthNumber: monthNumber, 
            id: id, 
            zoomLink: zoomLink,
            clinicLink: clinicLink }})
    }

    function updateShallowTracker(headlineDate,date, time, monthNumber, id, zoomLink,clinicLink){
        dispatch({type: 'update_shallowTracker', payload: {
            headlineDate: headlineDate,
            date: date, 
            time: time, 
            monthNumber: monthNumber, 
            id: id, 
            zoomLink: zoomLink,
            clinicLink: clinicLink }})
    }
    
    function updateEditScheduleVariables(object){
        dispatch({type: 'update_editScheduleVariables', payload: object})
    }

    function updateEditScheduleVariablesClear(){
        dispatch({type: 'update_editScheduleVariablesClear', payload: {
            monthName: "",
            monthNumber: "", 
            clinicMonthName: "",
            year: "",
            currentCafeOfferedSet: [], 
            targetSkill: "",
        }})
    }

    function updateCafeClear(){
        dispatch({type: '', payload: ''})
    }

    value={
        cafeDetails: cafeDetails,
        updateSelectedCafes: updateSelectedCafes,
        updateScheduledDates: updateScheduledDates,
        updateCafeTrackerAll: updateCafeTrackerAll,
        updateShallowTrackerAll: updateShallowTrackerAll,
        updateCafeTracker: updateCafeTracker,
        updateShallowTracker: updateShallowTracker,
        updateCafeClear: updateCafeClear,
        updateEditScheduleVariables: updateEditScheduleVariables,
        updateEditScheduleVariablesClear: updateEditScheduleVariablesClear
    }
    return(
        <CafeContext.Provider value={value}>
            {children}
        </CafeContext.Provider>
    )
}

export default CafeContextProvider