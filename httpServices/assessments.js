import axios from 'axios'
import { url } from '../utils/urlReferences'

export async function getAssessment(employeeId, seasonId){
    try{
        const response = await axios.get(`${url}/assessments/get/${employeeId}&${seasonId}`)
        if(response){

            return response.data
        }
    } catch(e){
        return e
    }
}