import * as SQLite from 'expo-sqlite'

const database = SQLite.openDatabase('localAssets.db')

//the tx object is provided automatically (implied)
export function init(){
    const promise = new Promise((resolve, reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(
            `
                CREATE TABLE IF NOT EXISTS localAssets (
                id INTEGER PRIMARY KEY NOT NULL,
                token TEXT NOT NULL
                )
            `,
            [], 
            //1st callback is for actions after a successful query
            ()=>{
                resolve()
            }, 
            //2nd call back is for error handling, the _ as the first arugment is a placeholder since we don't need it
            (_, error)=>{
                reject(error)
            })
       })
    })
  
    return promise
}