import axios from "axios";
import { url } from "../utils/urlReferences";

export async function verifyReset({email, code}){
    try{
        const response = await axios.get(`${url}/resets/${email}`)
        if(response.data.code === code){
            try{
                const reply = await axios.delete(`${url}/resets/deleteOne/${email}`)
                if(reply){
                    return reply.data
                }
            }catch(e){
                return e
            }
        } else{
            alert('Invalid Code. Please check inbox for latest code')
        }
    }catch(e){
        return e
    }
}

export async function replaceReset(obj){
    try{
        const response = await axios.put(`${url}/resets/replaceOne`, obj)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}