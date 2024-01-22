import axios from "axios"
import { replaceReset } from "./resets"
import {emailUrl} from '../utils/urlReferences'

export async function sendResetEmail(email, code){
    try{
     
        const response = await axios.post(`${emailUrl}/reset/send`,{email: email, code: code})
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

export async function sendZoomEmail({email, firstName, cafeTitle, date, time, zoomLink, clinicLink}){
    try{
        const response = await axios.post(`${emailUrl}/zoom/send`, {
            email: email, 
            firstName: firstName, 
            cafeTitle: cafeTitle,
            date: date,
            time: time,
            zoomLink: zoomLink,
            clinicLink: clinicLink
        })
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}
