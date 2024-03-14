import axios from 'axios'
import { url } from '../utils/urlReferences'

export async function unlockquiz(cafeDateId){
    try{
        const response = await axios.post(`${url}/producers/unlockquiz`, {id: cafeDateId})
        if(response){
            return response.data

        }
    }catch(e){
        return e
    }
}

export async function getMonths(companyId, seasonId){
    try{
        const response = await axios.get(`${url}/cafes/producerMonths/${companyId}&${seasonId}`)
        if(response){
            console.log(response)
            return response.data

        }
    }catch(e){
        return e
    }
}

