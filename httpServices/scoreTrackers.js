import axios from 'axios'
import { url } from '../utils/urlReferences'


export async function getSingleScoreTracker(employeeId){
    console.log("from scoreTracker http employeeId:")
    console.log(employeeId)
    try{
        const response = await axios.get(`${url}/scoretrackers/single/${employeeId}`)
        if(response){
            console.log("response")
            console.log(response.data) 
            return response.data
        }
    }catch(e){
        return e
    }
}

