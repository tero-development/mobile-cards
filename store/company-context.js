import { createContext, useReducer } from "react";

export const CompanyContext = createContext()

function companyReducer(state, action){
    switch(action.type){
        case "update_company":
            return {...action.payload}
        default:
            return state
    }
}

const CompanyContextProvider = ({children}) =>{

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
        <CompanyContext.Provider value={value}>
            {children}
        </CompanyContext.Provider>
    )
}


export default CompanyContextProvider