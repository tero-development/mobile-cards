import { createContext, useReducer } from "react";

export const SeasonContext = createContext()

function seasonReducer(state, action){
    switch(action.type){
        case 'update_season':
            return action.payload
        default:
            return state
    }
}

const SeasonContextProvider = ({children}) =>{
    const [season, dispatch] = useReducer(seasonReducer, {})

    function updateSeason(season){
        dispatch({type:'update_season', payload: season})
    }

    const value = {
        season: season,
        updateSeason: updateSeason
    }

    return(
        <SeasonContext.Provider value={value}>
            {children}
        </SeasonContext.Provider>
    )
}

export default SeasonContextProvider