import { Text } from "react-native"


// export function verifyFullPasswordHandler(password){
//     const trimmed = password.trim()
//     const lowerCheck = /[a-z]+/
//     const capitalCheck = /[A-Z]+/
//     const numericCheck = /[0-9]+/
//     const specialCheck = /[!@#$%^&*()]+/
//     const lengthCheck = /.{8,}/

//     if(
//         lowerCheck.test(trimmed) &&
//         capitalCheck.test(trimmed) &&
//         numericCheck.test(trimmed) &&
//         specialCheck.test(trimmed) &&
//         lengthCheck.test(trimmed) 
//     ){
//         return true
//     }

//     return false
// }

export function verifyPasswordHandler(password){
    const trimmed = password.trim()
    // const lowerCheck = /[a-z]+/
    const capitalCheck = /[A-Z]+/
    const numericCheck = /[0-9]+/
    // const specialCheck = /[!@#$%^&*()]+/
    const lengthCheck = /.{8,}/

    if(
        // lowerCheck.test(trimmed) &&
        capitalCheck.test(trimmed) &&
        numericCheck.test(trimmed) &&
        // specialCheck.test(trimmed) &&
        lengthCheck.test(trimmed) 
    ){
        return true
    }

    return false
}


export function verifyEmailHandler(email){
    const trimmed = email.trim().toLowerCase()

    const arr = trimmed.split("")
    
    const atIndex = arr.findIndex((entry => entry === '@')) + 1

    const endIndex = arr.length

    afterAt = arr.slice(atIndex, endIndex)

    const atCheck = /[@]+/
    const periodCheck = /[.]+/
    const spaceCheck = /\s/g

    if(
        atCheck.test(trimmed) &&
        periodCheck.test(afterAt) &&
        !spaceCheck.test(trimmed) 
    ){
        return true
    }

    return false

}

//Used for sitautions where you want to bypass word wrapping (you want words of a title each on their row)
export function wordSplitter(string){
    return string.split(' ').map(u => u.trim())
}

export function wordStacker(string, textStyle){
    const separatedStr = wordSplitter(string)
        
            return separatedStr.map(word =>{
                return(
                    <Text style={textStyle && textStyle} key={separatedStr[separatedStr.indexOf(word)]}>{word}</Text>
                )
            })
        
    
}

export function nameFormatter(string) {
    const trimmed = string.trim().toLowerCase()

    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function emailFormatter(string) {
    return string.trim().toLowerCase()
}

export const phoneFormatter = (val) =>{
    if(!val) return val
    const phoneNumber = val.replace(/[^\d]/g, "")
    const phoneNumberLength = phoneNumber.length
    if(phoneNumberLength <4) return phoneNumber
    if(phoneNumberLength < 7){
        return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0,3)})-${phoneNumber.slice(
        3,
        6
        )}-${phoneNumber.slice(6,10)}`
}


export function verifyPhoneHandler(phone){
    // const trimmed = phone.trim()
    const lowerCheck = /[^a-z]+/
    const capitalCheck = /[^A-Z]+/
    // const numericCheck = /[0-9]+/
    // const specialCheck = /[!@#$%^&*()]+/
    const lengthCheck = /.{14,}/

    if(
        lowerCheck.test(phone) &&
        capitalCheck.test(phone) &&
        // numericCheck.test(phone) &&
        // specialCheck.test(phone) &&
        lengthCheck.test(phone) 
    ){
        return true
    }

    return false
}

export async function simplePromise(promise, arg1, arg2){
    try{
        const data = await promise(arg1, arg2)
        return [data, null]
    } catch(e){
        return [null, e]
    }
}

//you can use this for mass amount of dates to be converted into JS Date notation
const baseDates = [
"5/3/2024",
"5/6/2024",
"5/10/2024",
"5/13/2024",
"5/20/2024",
"5/20/2024",
"5/20/2024",
"5/24/2024",
"5/31/2024",
"5/6/2024",
"5/17/2024",
"5/31/2024",
"11/1/2024",
"11/4/2024",
"11/11/2024",
"11/15/2024",
"11/18/2024",
"11/22/2024",
"11/25/2024",
"11/1/2024",
"11/11/2024",
"11/18/2024",
"3/1/2024",
"3/4/2024",
"3/8/2024",
"3/15/2024",
"3/18/2024",
"3/25/2024",
"3/25/2024",
"3/29/2024",
"9/9/2024",
"9/13/2024",
"9/16/2024",
"9/16/2024",
"9/20/2024",
"9/23/2024",
"9/27/2024",
"9/30/2024",
"9/30/2024",
"7/8/2024",
"7/19/2024",
"7/26/2024",
"7/29/2024",
"7/29/2024",
"5/3/2024",
"5/6/2024",
"5/10/2024",
"5/13/2024",
"5/13/2024",
"5/17/2024",
"9/9/2024",
"9/9/2024",
"9/16/2024",
"9/20/2024",
"9/23/2024",
"9/27/2024",
"9/30/2024",
"7/8/2024",
"7/12/2024",
"7/15/2024",
"7/22/2024",
"7/26/2024",
"9/13/2024",
"9/23/2024",
"9/30/2024",
"7/8/2024",
"7/12/2024",
"7/15/2024",
"7/15/2024",
"7/19/2024",
"7/22/2024",
"7/22/2024",
"7/29/2024",
"11/4/2024",
"11/4/2024",
"11/8/2024",
"11/8/2024",
"11/11/2024",
"11/15/2024",
"11/18/2024",
"11/22/2024",
"11/25/2024",
"3/1/2024",
"3/4/2024",
"3/8/2024",
"3/18/2024",
"3/22/2024",
"3/25/2024",
"3/29/2024",
"3/4/2024",
"3/15/2024",
"3/18/2024",
"3/22/2024"

]
const baseTimes = [
    9,
    10,
    11,
    12,
    10,
    12,
    2,
    9,
    11,
    2,
    9,
    9,
    11,
    12,
    12,
    11,
    10,
    9,
    9,
    9,
    2,
    12,
    9,
    12,
    9,
    11,
    2,
    10,
    12,
    9,
    12,
    11,
    12,
    2,
    11,
    10,
    9,
    10,
    2,
    2,
    9,
    9,
    12,
    2,
    11,
    12,
    9,
    10,
    2,
    11,
    10,
    2,
    10,
    9,
    12,
    11,
    2,
    10,
    9,
    12,
    12,
    11,
    9,
    2,
    12,
    12,
    11,
    10,
    2,
    11,
    10,
    2,
    10,
    10,
    2,
    9,
    11,
    10,
    9,
    2,
    11,
    11,
    11,
    10,
    11,
    12,
    9,
    2,
    11,
    2,
    9,
    10,
    11
]

const convertedTimes = baseTimes.map(entry => entry+5)

// console.log(baseTimes.length)
// console.log(convertedTimes.length)

    function dateConversion(date){
    
        const modified = date.split('')
        if(modified[1] === '/'){
            modified.unshift('0')
            if(modified[4] === '/'){
                modified.splice(3, 0, 0)
            }
        } if(modified[4] === '/'){
            modified.splice(3, 0, 0)
        }
    
        modified.splice(2, 1, '-')
        modified.splice(5, 1, '-')

        
        let newArray = []
        newArray.push(modified.slice(modified.length-4, modified.length).join(''))
        newArray.push(modified.slice(0, 2).join(''))
        newArray.push(modified.slice(3, 5).join(''))
        
        let numbers = newArray.map(entry => parseInt(entry))

        return numbers
    }
    
    // for(let i = 0; i < baseDates.length ; i++){
    // //    new Date(dateConversion(baseDates[i]))
    //     let result = dateConversion(baseDates[i])
    //     result.push(convertedTimes[i])
    //     console.log(new Date(Date.UTC(result[0], result[1]-1, result[2], result[3])))
    // }
    

//store it in UTC like this, it will make an ISOString
//account for the timezone, EST is like 5 hours behind
//CST is like 6 hours behind from UTC.
const utcDate1 = new Date(Date.UTC(2024, 1, 2, 9))


//Then Display like this, should convert ISOString
// console.log(new Date("2024-05-03T14:00:00.000Z").toString())



const finalDates = [
   "2024-05-03T14:00:00.000Z",
   "2024-05-06T15:00:00.000Z",
   "2024-05-10T16:00:00.000Z",
   "2024-05-13T17:00:00.000Z",
   "2024-05-20T15:00:00.000Z",
   "2024-05-20T17:00:00.000Z",
   "2024-05-20T07:00:00.000Z",
   "2024-05-24T14:00:00.000Z",
   "2024-05-31T16:00:00.000Z",
   "2024-05-06T07:00:00.000Z",
   "2024-05-17T14:00:00.000Z",
   "2024-05-31T14:00:00.000Z",
   "2024-11-01T16:00:00.000Z",
   "2024-11-04T17:00:00.000Z",
   "2024-11-11T17:00:00.000Z",
   "2024-11-15T16:00:00.000Z",
   "2024-11-18T15:00:00.000Z",
   "2024-11-22T14:00:00.000Z",
   "2024-11-25T14:00:00.000Z",
   "2024-11-01T14:00:00.000Z",
   "2024-11-11T07:00:00.000Z",
   "2024-11-18T17:00:00.000Z",
   "2024-03-01T14:00:00.000Z",
   "2024-03-04T17:00:00.000Z",
   "2024-03-08T14:00:00.000Z",
   "2024-03-15T16:00:00.000Z",
   "2024-03-18T07:00:00.000Z",
   "2024-03-25T15:00:00.000Z",
   "2024-03-25T17:00:00.000Z",
   "2024-03-29T14:00:00.000Z",
   "2024-09-09T17:00:00.000Z",
   "2024-09-13T16:00:00.000Z",
   "2024-09-16T17:00:00.000Z",
   "2024-09-16T07:00:00.000Z",
   "2024-09-20T16:00:00.000Z",
   "2024-09-23T15:00:00.000Z",
   "2024-09-27T14:00:00.000Z",
   "2024-09-30T15:00:00.000Z",
   "2024-09-30T07:00:00.000Z",
   "2024-07-08T07:00:00.000Z",
   "2024-07-19T14:00:00.000Z",
   "2024-07-26T14:00:00.000Z",
   "2024-07-29T17:00:00.000Z",
   "2024-07-29T07:00:00.000Z",
   "2024-05-03T16:00:00.000Z",
   "2024-05-06T17:00:00.000Z",
   "2024-05-10T14:00:00.000Z",
   "2024-05-13T15:00:00.000Z",
   "2024-05-13T07:00:00.000Z",
   "2024-05-17T16:00:00.000Z",
   "2024-09-09T15:00:00.000Z",
   "2024-09-09T07:00:00.000Z",
   "2024-09-16T15:00:00.000Z",
   "2024-09-20T14:00:00.000Z",
   "2024-09-23T17:00:00.000Z",
   "2024-09-27T16:00:00.000Z",
   "2024-09-30T07:00:00.000Z",
   "2024-07-08T15:00:00.000Z",
   "2024-07-12T14:00:00.000Z",
   "2024-07-15T17:00:00.000Z",
   "2024-07-22T17:00:00.000Z",
   "2024-07-26T16:00:00.000Z",
   "2024-09-13T14:00:00.000Z",
   "2024-09-23T07:00:00.000Z",
   "2024-09-30T17:00:00.000Z",
   "2024-07-08T17:00:00.000Z",
   "2024-07-12T16:00:00.000Z",
   "2024-07-15T15:00:00.000Z",
   "2024-07-15T07:00:00.000Z",
   "2024-07-19T16:00:00.000Z",
   "2024-07-22T15:00:00.000Z",
   "2024-07-22T07:00:00.000Z",
   "2024-07-29T15:00:00.000Z",
   "2024-11-04T15:00:00.000Z",
   "2024-11-04T07:00:00.000Z",
   "2024-11-08T14:00:00.000Z",
   "2024-11-08T16:00:00.000Z",
   "2024-11-11T15:00:00.000Z",
   "2024-11-15T14:00:00.000Z",
   "2024-11-18T07:00:00.000Z",
   "2024-11-22T16:00:00.000Z",
   "2024-11-25T16:00:00.000Z",
   "2024-03-01T16:00:00.000Z",
   "2024-03-04T15:00:00.000Z",
   "2024-03-08T16:00:00.000Z",
   "2024-03-18T17:00:00.000Z",
   "2024-03-22T14:00:00.000Z",
   "2024-03-25T07:00:00.000Z",
   "2024-03-29T16:00:00.000Z",
   "2024-03-04T07:00:00.000Z",
   "2024-03-15T14:00:00.000Z",
   "2024-03-18T15:00:00.000Z",
   "2024-03-22T16:00:00.000Z"
]

// for(let i = 0; i < finalDates.length ; i++){
//     console.log(new Date(finalDates[i]).toString())
// }

// console.log('')
// console.log('')
// console.log(new Date("2024-05-03T14:00:00.000Z").toLocaleDateString('default', {day: 'numeric'}))
// console.log(new Date("2024-05-03T14:00:00.000Z").toLocaleDateString('default', {year: 'numeric'}))
// console.log('')
// console.log(parseInt(new Date("2024-05-17T14:00:00.000Z").toString().slice(8,10)))
// console.log(new Date("2024-05-17T14:00:00.000Z"))