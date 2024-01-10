import axios from 'axios'

const url = 'http://10.0.2.2:4002'


export async function getCompany(id){
    try{
        const response = await axios.get(`${url}/companies/${id}`)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}