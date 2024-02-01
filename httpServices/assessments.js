import axios from 'axios'
import { url } from '../utils/urlReferences'

export async function getAssessment(employeeId, seasonId){
    console.log("from assessment ln 5, empId and SeasonId:")
    console.log(employeeId)
    console.log(seasonId)
    try{
        const response = await axios.get(`${url}/assessments/get/${employeeId}&${seasonId}`)
        if(response){
            return response.data
        }
    } catch(e){
        return e
    }
}