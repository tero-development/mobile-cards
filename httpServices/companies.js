import axios from 'axios'
import { url } from '../utils/urlReferences'


export async function getCompany(id){
    try{
        const response = await axios.get(`${url}/companies/${id}`)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}