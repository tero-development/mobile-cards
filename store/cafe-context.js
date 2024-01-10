import { createContext, useReducer } from "react";

export const CafeContext = createContext()

function cafeReducer(state, action){
    switch(action.type){
        case 'update_selectedCafes':
            return {...state, selectedCafes: action.payload}
        case 'update_scheduledDates':
            return {...state, scheduledDates: action.payload}
        case 'update_targetSkill':
            return {...state, targetSkill: action.payload}
        case 'update_monthName':
            return {...state, monthName: action.payload}
        case 'update_clinicMonthName':
            return {...state, clinicMonthName: action.payload}
        case 'update_year':
            return {...state, year: action.payload}
        case 'update_cafeDateList':
            return {...state, cafeDateList: action.payload}
        case 'update_cafeTrackerAll':
            return {...state, cafeTracker: action.payload}
        case 'update_shallowTrackerAll':
            return {...state, shallowTracker: action.payload}
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
                targetSkill: '',
                monthName: '',
                clinicMonthName: '',
                year: '', 
                cafeDateList: [],
                cafeTracker: {list: []},
                shallowTracker: {list: []}

            }
    }
}

const CafeContextProvider = ({children}) =>{
    const [cafeDetails, dispatch] = useReducer(cafeReducer, {
        selectedCafes: [],
        scheduledDates: [],
        targetSkill: '',
        monthName: '',
        clinicMonthName: '',
        year: '', 
        cafeDateList: [],
        cafeTracker: {list:[]},
        shallowTracker: {list: []}
    })

    function updateSelectedCafes(cafeArray){
        dispatch({type:'update_selectedCafes', payload: cafeArray})
    }

    function updateScheduledDates(scheduledDateArray){
        dispatch({type:'update_scheduledDates', payload: scheduledDateArray})
    }
    
    function updateTargetSkill(skillTitle){     
        dispatch({type:'update_targetSkill', payload: skillTitle})
    }

    function updateMonthName(monthName){     
        dispatch({type:'update_monthName', payload: monthName})
    }

    function updateClinicMonthName(monthName){     
        dispatch({type:'update_clinicMonthName', payload: monthName})
    }

    function updateYear(year){
        dispatch({type: 'update_year', payload: year})
    }

    function updateCafeDateList(cafeDateList){
        dispatch({type: 'update_cafeDateList', payload: cafeDateList})
    }

    function updateCafeTrackerAll(tracker){
        dispatch({type: 'update_cafeTrackerAll', payload: tracker})
    }

    function updateShallowTrackerAll(tracker){
        dispatch({type: 'update_shallowTrackerAll', payload: tracker})
    }

    function updateCafeTracker(monthNumber, id, date){
        dispatch({type: 'update_cafeTracker', payload: {monthNumber: monthNumber, id:id, date:date}})
    }

    function updateShallowTracker(monthNumber, id, date){
        dispatch({type: 'update_shallowTracker', payload: {monthNumber: monthNumber, id:id, date:date}})
    }


    function updateCafeClear(){
        dispatch({type: '', payload: ''})
    }

    value={
        cafeDetails: cafeDetails,
        updateSelectedCafes: updateSelectedCafes,
        updateScheduledDates: updateScheduledDates,
        updateTargetSkill: updateTargetSkill,
        updateMonthName: updateMonthName,
        updateClinicMonthName: updateClinicMonthName,
        updateYear: updateYear,
        updateCafeDateList: updateCafeDateList,
        updateCafeTrackerAll: updateCafeTrackerAll,
        updateShallowTrackerAll: updateShallowTrackerAll,
        updateCafeTracker: updateCafeTracker,
        updateShallowTracker: updateShallowTracker,
        updateCafeClear: updateCafeClear,
    }
    return(
        <CafeContext.Provider value={value}>
            {children}
        </CafeContext.Provider>
    )
}

export default CafeContextProvider