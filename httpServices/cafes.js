import axios from 'axios'
import { url } from '../utils/urlReferences'

export async function getSelectedCafeIds(idArray){
    try{
        const response = await axios.post(`${url}/cafes/selectedCafes`, {idArray: idArray})
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}

export async function getAllCafes(companyId){
    try{
        const response = await axios.get(`${url}/cafes/allcafes/${companyId}`)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}

export async function getCafeDates(idArray){
    try{
        const response = await axios.post(`${url}/cafes/cafedates`, {idArray: idArray})
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}

export async function getCafeSingularDates(idArray){
    try{
        const response = await axios.post(`${url}/cafes/cafesingulardates`, {idArray: idArray})
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}



export async function getCafeTracker(employeeId, seasonId){
    try{
        const response = await axios.post(`${url}/cafes/cafetracker`, {employeeId: employeeId, seasonId: seasonId})
        if(response){
            return response.data
        }
    } catch(e){
        return e
    }
}

export async function updateTracker(obj){
    const {list, employeeId, seasonId} = obj
    try{
        const response = await axios.put(`${url}/cafes/cafetracker`, {list: list, employeeId: employeeId, seasonId: seasonId})
        if(response){
            return response.data
        }
    } catch(e){
        return e
    }
}

//takes the strings 'add' or 'remove' as the type argument
export async function updateRoster({employeeId, cafeDateId, type}){
    try{
        const response = await axios.put(`${url}/cafes/updatedateroster`, {
            employeeId: employeeId, 
            cafeDateId: cafeDateId, 
            type: type}
        )
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}

export async function getCafeDatesGroupedBySkill(paretnId){
    try{
        const response = await axios.get(`${url}/cafes/groupedbyskill/${paretnId}`)
        if(response){
            return response.data
        }
    }catch(e){
        return e
    }
}