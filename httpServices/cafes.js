import axios from 'axios'

const url = 'http://10.0.2.2:4002'

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