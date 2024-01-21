import axios from 'axios'
import { url } from '../utils/urlReferences'

export async function getActiveSeason(companyId){
    try{
        const resposne = await axios.get(`${url}/seasons/${companyId}`)
        if(resposne){
            return resposne.data
        }
    } catch(e){
        return e
    }
}