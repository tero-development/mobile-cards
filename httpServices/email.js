import axios from "axios"
import { replaceReset } from "./resets"
const url = 'http://10.0.2.2:5002'

export async function sendResetEmail(email, code){
    try{
     
        const response = await axios.post(`${url}/reset/send`,{email: email, code: code})
        if(response){
            let result = false
            try{    
                const reply = await replaceReset({email: email, code: code})
                if(reply){
                    result = true
                }
            }catch(e){
                return(e.message)
            }
            return result
        }
    }catch(e){
        return(e.message)
    }

}

export async function sendZoomEmail(email, firstName, cafeTitle, date, time, zoomLink){
    try{
        const response = await axios.post(`${url}/zoom/send`, {
            email: email, 
            firstName: firstName, 
            cafeTitle: cafeTitle,
            date: date,
            time: time,
            zoomLink: zoomLink
        })
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}
