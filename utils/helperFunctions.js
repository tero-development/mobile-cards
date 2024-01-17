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