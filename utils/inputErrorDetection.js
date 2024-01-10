import Colors from "./colors"

//Perhaps if you make this a context it might be easier to implement

//copy these states directly into the implimenting component
// const [isError, setIsError] = useState(false)
// const [errorType, setErrorType] = useState('')
// const [errorMessage, setErrorMessage] = useState('')

//*you made need a context to track whatever variables you need (like signin-context.js)


//the values afer 'valueType' should be the direct useState values that match the ones at the top of this file, written locally to 
//the implimenting component


//import this to go with the copied function above

export function updateCredentials( enteredText, errorType, errorMessage, setErrorType, setErrorMessage, updater){
    errorType && setErrorType('')
    errorMessage && setErrorMessage('')

    updater(enteredText)

}

//copy this function directly

function updateHandler(enteredText, updater){
    updateCredentials(enteredText, errorType, errorMessage, setErrorType, setErrorMessage, updater)
}


//this goes on a TextInput's style property (for it's color, and backgroundColor), if it's the LabeledInput custom
//component, this goes simly as it's color property: 
//color={colorHandler(errorType, ['email_invalid', 'email_mismatch'] (your write the targetList arg.), credentials.email)}
export function colorHandler(errorType, targetList, stateValue){
    if(errorType === targetList[0] || errorType === targetList [1] || (!stateValue && errorType === 'blank_entries') ){
        return Colors.errorColor
    } else{
        //this assumes you'll always want inputs to look like this color, change this function
        //to be more dynamic if you ever need it another color (make the color a parameter)
        return Colors.secondaryColor
    }
}

export function clearErrorHandler(setIsError){
    setIsError(false)
}
//this needs to be copied into the implimenting file, import the clearErrorHandler
// if(isError){
//     return <ErrorOverlay  message={errorMessage} onPress={()=>{clearErrorHandler(setIsError)}}/>
// }
//<ErrorOverlay/> is a custom component you'll need to import




  //this has to be custom written, based on the whatever state object you have with credentials as properties,
    //AND what it's called, eg: the useState object you wrote is called 'credz' and it has only 2 properties, 'pass' and confirm 'confirmPass'
    //your first check would look like {check: credz.pass === credz.confirmPass} or whatever conditional you want to use them in
    //try to stick to this naming format though for consistency. This should be referring to the credentials state object
    //you should've made as referenced at the top of this file

    // const validationGroup = [
    //     {check: credentials.password === credentials.confirmPassword, tag: 'password_mismatch', message: 'Passwords do not match'},
    //     {check: credentials.email === credentials.confirmEmail, tag: 'email_mismatch', message: 'Emails do not match'},
    //     {check: verifyPasswordHandler(credentials.password), tag: 'password_invalid', message: 'Invalid password format'},
    //     {check: verifyEmailHandler(credentials.email), tag: 'email_invalid', message: 'Invalid email format'},
    // ]




    //parameters: 
    //1. maybe a credentials object (which in the implementing function should be a state object like 'credentials' in this file)
    //2. for the blank entries if statement you can maybe loop through the NOT version of the credential properties
    //3. import any verifying help functions to the implementing file, and use them as need in the following step (see validationGroup)
    //4. a parameter called validationGroup, an array, that you have to write out in the format below (manually, not dynamic)
    //5. The last 3 parameter arguments should plugged in from the state objects of the same name at the top of this file,
    //written into the implementing component.
   export  function errorFormatHandler(credObj, validationArr, endFunction, setErrorType, setErrorMessage, setIsError){
        let killSwitch = false

        for(const credential in credObj){
            if(!credObj[credential]){
                setErrorType('blank_entries')
                setErrorMessage("Entries cannot be blank")
                setIsError(true)
                return
            }
        }

        if(killSwitch){
            return
        }

        
        validationArr.forEach(validator =>{
            if(!validator.check){
                setErrorType(validator.tag)
                setErrorMessage(validator.message)
                setIsError(true)
                killSwitch = true

                return
            }
        })
        
        if(killSwitch){
            return
        }
        
        endFunction()

    }



