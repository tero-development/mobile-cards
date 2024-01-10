import axios from 'axios'

url = 'http://10.0.2.2:4002'

export async function getActiveSeason(companyId){
    try{
        const resposne = await axios.get(`${url}/seasons/${companyId}`)
        if(resposne){
            return resposne.data
        }
    } catch(e){
        return e
    }
}