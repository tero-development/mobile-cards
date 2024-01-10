import axios from 'axios'

const url = 'http://10.0.2.2:4002'

//use this to get the contact ID for contact swaps (rather than the get associations in HB Deals)
export async function getContact(email){
    try{
        const response = await axios.get(`${url}/hb/contacts/${email}`)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}

export async function postContact(contactInfo){
    try{
        const response = await axios.post(`${url}/hb/contacts/create`, contactInfo)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}

//** this needs a contactId property within the contactInfo object argument (unilke in postContact)
export async function updateContact(contactInfo){
    try{
        const response = await axios.put(`${url}/hb/contacts/update`, contactInfo)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}