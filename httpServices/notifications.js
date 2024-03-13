import axios from 'axios'
import { url } from '../utils/urlReferences'

export async function unlockquiz(title, array){
    try{
        const response = await axios.post(`${url}/notifications/quiz/unlock`, {cafeTitle: title, tokenArray: array})
        if(response){
            return response.data

        }
    }catch(e){
        return e
    }
}
