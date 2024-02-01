import {Animated} from 'react-native'
import { createContext, useReducer } from "react";
import Colors from "../utils/colors";

export const ColorContext = createContext()

function companyReducer(state, action){
    switch(action.type){
        case "update_company":
            return {...action.payload}
        default:
            return state
    }
}

const ColorContextProvider = ({children}) =>{


    const color = useAnimatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['color1', 'color2']
    })

    const [company, dispatch] = useReducer(companyReducer, {
        
    })

    function updateCompany(company){
        dispatch({type: 'update_company', payload:company})
    }

    function updateCompanyClear(){
        dispatch({type:"", payload:""})
    }

    const value = {
        company: company,
        updateCompany: updateCompany,
        updateCompanyClear: updateCompanyClear
    }
    
    return(
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    )
}


export default ColorContextProvider