import axios from 'axios'
import { url } from '../utils/urlReferences'

export async function unlockquiz(cafeDateId){
    try{
        const response = await axios.post(`${url}/producers/unlockquiz`, {id: cafeDateId})
        if(response){
            return response.data

        }
    }catch(e){
        return e
    }
}

export async function getMonths(companyId, seasonId){
    try{
        const response = await axios.get(`${url}/cafes/producerMonths/${companyId}&${seasonId}`)
        if(response){
            return response.data

        }
    }catch(e){
        return e
    }
}

export async function getDetailedRoster(cafeDateId){
    try{
        const response = await axios.post(`${url}/producers/detailedroster`, {cafeDateId: cafeDateId})
        if(response){
            return response.data

        }
    }catch(e){
        return e
    }
}

// export async function sendScore(currentMonth, participantArray, companyId, seasonId){
//     try{
//         const response = await axios.post(`${url}/producers/sendscore`, 
//         {
//            currentMonth:currentMonth,
//            participantArray: participantArray,
//            companyId: companyId,
//            seasonId: seasonId
//         })
//         if(response){
//             return response.data

//         }
//     }catch(e){
//         return e
//     }
// }



