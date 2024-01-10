import axios from 'axios'

const url = 'http://10.0.2.2:4002'


export async function searchEmployee(email){
    try{
        const response = await axios.get(`${url}/employees/${email}`)
        if(response){
            return response.data
        }
    } catch(e){
        return e
    }
}

export async function postNewEmployee(contactInfo){
    try{
        const response = await axios.post(`${url}/employees/new`, contactInfo)
        if(response){
            return response.data
        }
    } catch(e){
        return e
    }
}

export async function updateEmployee(contactInfo){
    try{
        const response = await axios.put(`${url}/employees/edit`, contactInfo)
        if(response){
            return response.data
        }
    } catch(e){
        return e
    }
}