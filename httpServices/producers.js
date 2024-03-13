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
