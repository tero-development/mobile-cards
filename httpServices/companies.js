import axios from 'axios'
import { url } from '../utils/urlReferences'


export async function getCompany(id){
    try{
        const response = await axios.get(`${url}/companies/get/${id}`)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}

export async function searchCompanyEmail(email){
    try{
        const response = await axios.get(`${url}/companies/search/${email}`)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}