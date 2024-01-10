import axios from 'axios'

const url = 'http://10.0.2.2:4002'

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