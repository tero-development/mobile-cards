import axios from "axios";
import { url } from "../utils/urlReferences";

export async function sendCredentials(credentials){
    try{
        const response = await axios.post(`${url}/credentials/initiate`, credentials)
        if(response){
            return response.data
        }
    } catch(e){
        return e
    }
}

export async function verifyCredentials(credentials){
    try{
        const response = await axios.post(`${url}/credentials/get`, credentials)
        if(response){
            return response.data
        }
    } catch(e){
        return e
    }
}

export async function replacePasswordCredentials(credentials){
    try{
        const response = await axios.put(`${url}/credentials/replacepassword`, credentials)
        if(response){
            return response.data
        }
    } catch(e){
        return e
    }
}