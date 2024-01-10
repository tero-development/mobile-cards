import { createContext, useReducer } from "react";
import { nameFormatter, emailFormatter, phoneFormatter } from "../utils/helperFunctions";
export const SignInContext = createContext()

function signInReducer(state, action){

    switch(action.type){
        case 'update_all':
            return {...action.payload}
        case 'update_firstName':
            return {...state, firstName: nameFormatter(action.payload)}
        case 'update_lastName':
            return {...state, lastName: nameFormatter(action.payload)}
        case 'update_email':
            return {...state, email: emailFormatter(action.payload)}
        case 'update_confirmEmail':
                return {...state, confirmEmail: emailFormatter(action.payload)}
        case 'update_managerEmail':
                return {...state, managerEmail: emailFormatter(action.payload)}
        case 'update_password':
            return {...state, password: action.payload}
        case 'update_confirmPassword':
            return {...state, confirmPassword: action.payload}
        case 'update_industryYears':
            return {...state, industryYears: action.payload}
        case 'update_commercialUnit':
            return {...state, employeeTerritory: action.payload}
        case 'update_phoneNumber':
            return {...state, phoneNumber: phoneFormatter(action.payload)}
            case 'update_companyId':
            return {...state, company_id: action.payload}
            case 'update_employeeId':
            return {...state, employeeId: action.payload}
        default:
            return {
                employeeId: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
                email: '',
                confirmEmail: '',
                managerEmail: '',
                industryYears: '',
                employeeTerritory: '',
                phoneNumber: ''
        
            }
    }
}

const SignInContextProvider = ({children}) =>{    
    const [credentials, dispatch] = useReducer(signInReducer, {
        employeeId: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmEmail: '',
        managerEmail: '',
        industryYears: '',
        employeeTerritory: '',
        phoneNumber: '',
        company_id: ''
    })
    
    function updateFirstname(firstName){
        dispatch({type: 'update_firstName', payload:firstName})
    }

    function updateLastName(lastName){
        dispatch({type: 'update_lastName', payload: lastName})
    }
    function updateEmail(email){
        dispatch({type: 'update_email', payload:email})
    }

    function updateConfirmEmail(email){
        dispatch({type: 'update_confirmEmail', payload:email})
    }

    function updateManagerEmail(email){
        dispatch({type: 'update_managerEmail', payload:email})
    }

    function updatePassword(password){
        dispatch({type: 'update_password', payload: password})
    }

    function updateConfirmPassword(password){
        dispatch({type: 'update_confirmPassword', payload: password})
    }
    function updateIndustryYears(years){
        dispatch({type: 'update_industryYears', payload:years})
    }

    function updateEmployeeTerritory(employeeTerritory){
        dispatch({type: 'update_commercialUnit', payload: employeeTerritory})
    }
    function updatePhoneNumber(phone){
        dispatch({type: 'update_phoneNumber', payload: phone})
    }

    function updateCompany(company_id){
        dispatch({type: 'update_companyId', payload: company_id})
    }

    function updateEmployeeId(employeeId){
        dispatch({type: 'update_employeeId', payload: employeeId})
    }

    function updateSignInClear(){
        dispatch({type:'', payload:''})
    }

    function updateAllCredentials(obj){
        dispatch({type: 'update_all', payload: obj})
    }

    value={
        credentials: credentials,
        updateFirstname: updateFirstname,
        updateLastName: updateLastName,
        updateEmail: updateEmail,
        updateConfirmEmail: updateConfirmEmail,
        updateManagerEmail: updateManagerEmail,
        updatePassword: updatePassword,
        updateConfirmPassword: updateConfirmPassword,
        updateIndustryYears: updateIndustryYears,
        updateEmployeeTerritory: updateEmployeeTerritory,
        updatePhoneNumber: updatePhoneNumber,
        updateCompany: updateCompany,
        updateEmployeeId: updateEmployeeId,
        updateSignInClear: updateSignInClear,
        updateAllCredentials: updateAllCredentials
    }

    return(
        <SignInContext.Provider value={value}>
            {children}
        </SignInContext.Provider>
    )
}

export default SignInContextProvider