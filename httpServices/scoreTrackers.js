import axios from 'axios'
import { url } from '../utils/urlReferences'


export async function getSingleScoreTracker(employeeId){
    try{
        const response = await axios.get(`${url}/scoretrackers/single/${employeeId}`)
        if(response){
            return response.data

        }
    }catch(e){
        return e
    }
}

