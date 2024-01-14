import axios from "axios";
// import {HBT} from '@env';

const url = 'http://10.0.2.2:4002'

const hubspotApi = 'https://api.hubapi.com'

const dealToContactId = '3'


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
        const response = await axios.put(`${hubspotApi}/crm/v3/objects/deals/${dealId}/associations/contacts/${contactId}/${dealToContactId}`, {}, config)
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

