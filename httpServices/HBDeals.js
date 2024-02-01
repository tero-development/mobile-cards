import axios from "axios";
import {EXPO_PUBLIC_HBT} from '@env';
import { url } from "../utils/urlReferences";

const hubspotApi = 'https://api.hubapi.com'

const dealToContactId = '3'

const associationTypeId = '4'

const config = {
    headers: {Authorization: `Bearer ${EXPO_PUBLIC_HBT}`}
}

export async function getDealByMongoId(cafeDateId){
 
    try{
        const response = await axios.get(`${url}/hb/deals/${cafeDateId}`)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}



export async function getDealGroup(cafeGroupId){
 
    try{
        const response = await axios.get(`${url}/hb/deals/group/${cafeGroupId}`)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}

//use the getContact method from HBcontacts rather than this to get the individual employee's contact Id
export async function getDealAssociations(dealId){
    try{
        const response = await axios.post(`${url}/hb/deals/assoc`, {dealId: dealId})
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}

export async function insertContactToDeal(dealId, contactId){

    try{
        const response = await axios.put(`${hubspotApi}/crm/v4/objects/contact/${contactId}/associations/deal/${dealId}`, [
            {
                    "associationCategory": "USER_DEFINED",
                    "associationTypeId": associationTypeId
                }
        ], config)
        if(response){
            return response.data 
        }
    }catch(e){
        return e
    }
}

export async function deleteContactFromDeal(dealId, contactId){
    try{
        const reply = await axios.delete(`${hubspotApi}/crm/v3/objects/deals/${dealId}/associations/contacts/${contactId}/${dealToContactId}`, config)
        if(reply){
            return reply
        }
    }catch(e){
        return(e)
    }
}

export async function archiveDeal(dealId){
    try{
        const response = await axios.delete(` https://api.hubapi.com/crm/v3/objects/deals/${dealId}`)
        if(response){
            return response 
        }
    }catch(e){
        return(e)
    }
}