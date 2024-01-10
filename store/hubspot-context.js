import { createContext, useReducer } from "react";

export const HubspotContext = createContext()

function hbReducer(state, action){
    switch(action.type){
        case 'update_contactId':
            return {...state, contactId: action.payload}
        case 'update_fromDealId':
            return {...state, fromDealId: action.payload}
        case 'update_toDealId':
            return {...state, toDealId: action.payload}
        default:
            return {
                contactId: '',
                fromDealId: '',
                toDealId: ''
            }
    }
}

const HubspotContextProvider = ({children}) =>{
    const [hubspotDetails, dispatch] = useReducer(hbReducer, {
        contactId: '',
        fromDealId: '',
        toDealId: ''
    })

    function updateContactId(contactId){
        dispatch({type:'update_contactId', payload: contactId})
    }

    function updatefromDealId(dealId){
        dispatch({type:'update_fromDealId', payload: dealId})
    }

    function updateToDealId(dealId){
        dispatch({type:'update_toDealId', payload: dealId})
    }

    function updateClearHbAll(){
        dispatch({type: '', payload: ''})
    }

    const value = {
        hubspotDetails: hubspotDetails,
        updateContactId: updateContactId,
        updatefromDealId: updatefromDealId,
        updateToDealId: updateToDealId,
        updateClearHbAll: updateClearHbAll
    }

    return(
        <HubspotContext.Provider value={value}>
            {children}
        </HubspotContext.Provider>
    )
}

export default HubspotContextProvider