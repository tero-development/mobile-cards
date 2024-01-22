

// // A companion function to the main one below it in the useEffect (orders an array of dates chronologically, for 
// better component display purposes)

// function compareDayNumber(a, b){
//     return parseInt(new Date(a.date).toString().slice(8,10)) -parseInt(new Date(b.date).toString().slice(8,10)) 
// }

// useEffect(()=>{
//     async function checkHBDealCapacity(){

//         try{

//             //the groupTargetId is the id of the main cafe which contains the list of offeredDates ids (which themselves
//             //represent cafe_date objects), all HB deals have a custom property that shares the same id of the parent
//             //cafe object in mongo. (ex: all 'Handling Question' deals have a groupDB_id that points to the original
//             //cafe object of Hanlding Questions found in mongo. GroupBD_id is a separate from the individual DB_ID 
//             // custom property that is unique to each HB deal). This gets all related HB deals grouped together as an
//             //array.
//             const groupedDeals = await getDealGroup(groupTargetId)
//             if(groupedDeals){

//                 //loops through and compares HBdeal num of associated contacts to the classLimit
//                 //its cafeDate counterpart for the given loop iteration.
//                 for(let i = 0; i < currentCafeOfferedSet.length; i++){
//                     const contactCount = groupedDeals.results[i].properties.num_associated_contacts

//                     if(contactCount < currentCafeOfferedSet[i].classLimit){

//                         setFilteredDealArray(prev => {
//                             const newArray = [...prev, currentCafeOfferedSet[i]]
//                             newArray.sort(compareDayNumber)

//                             return newArray
//                         })
//                     }

//                 }

//                 }
//             } catch(e){
//                 alert(e)
//             }
//         }

     
//             checkHBDealCapacity(groupTargetId)
        
//         return ()=>{}
        
        
// },[currentCafeOfferedSet])


// // Old version of the EditSchedule's submitYesHandler function, when it was based on contact-swapping 
// // with HB deals. Here for future reference if those are brought back after the error that prevented the 
// // app from completing the insert / delete async axiosbased functions is solved. At the time of writing
// // these calls hit HB's api, not the express server made for this app, becuase those HB api urls are 
// // the initial way to update deal associtions. This may come in handy if a custom node server version 
// // of those calls can be found to replace this errroing ones.

// async function submitYesHandler(){
//     if(shallowSnapshot !== undefined){
//         setIsLoading(true)

//         //you might want to stagger the ifs (example: if(newDeal){const [oldDeal, error2] = await simplePromise...etc.})
//         //it works without, but maybe this format would make the HubspotConext methods and state variales work 
//         //such as updateToDealId actually updating toDealId fast enought that it can be used in the 
//         //next simplePromise etc.

//         const [newDeal, error1] = await simplePromise(getDealByMongoId, solidSnapshot.id)
//         if(newDeal){

//             const [oldDeal, error2] = await simplePromise(getDealByMongoId, shallowSnapshot.id)
//             if(oldDeal){

//                 const [insertReply, error3] = await simplePromise(insertContactToDeal, newDeal.results[0].id, contactId)
//                 if(insertReply.fromObjectId === undefined){
//                     alert('Unable to complete date exchange, please try again later')
//                     setIsLoading(false)
//                     return
//                 } 
//                 if(insertReply){


//                     const [deleteReply, error4] = await simplePromise(deleteContactFromDeal, oldDeal.results[0].id, contactId)
//                     if(deleteReply.status !== 204){
//                         alert('Unable to complete date exchange, please try again later')
//                         setIsLoading(false)
//                         return
//                     }
//                     if(deleteReply){

//                         const [trackerReply, error5] = await simplePromise(updateTracker, {list: cafeTracker.list, employeeId: employeeId, seasonId: seasonId})
//                         if(trackerReply){
//                             setFilteredDealArray([])
//                             updateShallowTrackerAll(cafeTracker)
//                             setSolidSnapshot({})    
//                             setShallowSnapshot({})
//                             setIsLoading(false)
//                             closeModalHandler()
//                         } 
//                         if(error5){
//                             alert(error5)
//                             return
//                         }
//                     }  
//                     if(error4){
//                         alert(error4)
//                         setIsLoading(false)
//                         return
//                     }
//                 } 
//                 if(error3){
//                     alert(error3)
//                     setIsLoading(false)
//                     return
//                 }
//             } 
//             if(error2){
//                 alert(error2)
//                 setIsLoading(false)
//                 return
//             }
//         }  
        
//         if(error1){
//             alert(e)
//             setIsLoading(false)
//             return
//         }

        
//     } 
//     else{
//         setIsLoading(true)

//         //you might want to stagger the ifs (example: if(newDeal){const [oldDeal, error2] = await simplePromise...etc.})
//         //it works without, but maybe this format would make the HubspotConext methods and state variales work 
//         //such as updateToDealId actually updating toDealId fast enought that it can be used in the 
//         //next simplePromise etc.

//         const [newDeal, error1] = await simplePromise(getDealByMongoId, solidSnapshot.id)
//         if(newDeal){

//             const [insertReply, error2] = await simplePromise(insertContactToDeal, newDeal.results[0].id, contactId)
//             if(insertReply.fromObjectId === undefined){
//                 alert('Unable to complete date exchange, please try again later')
//                 setIsLoading(false)
//                 return
//             } 
//             if(insertReply){
             
//                 const [trackerReply, error3] = await simplePromise(updateTracker, {list: cafeTracker.list, employeeId: employeeId, seasonId: seasonId})
//                 if(trackerReply){
//                     setFilteredDealArray([])
//                     updateShallowTrackerAll(cafeTracker)
//                     setSolidSnapshot({})    
//                     setShallowSnapshot({})
//                     setIsLoading(false)
//                     closeModalHandler()
//                 } 
//                 if(error3){
//                     alert(error3)
//                     return
//                 }
//             } 
//             if(error2){
//                 alert(error2)
//                 setIsLoading(false)
//                 return
//             }

//         }  
        
//         if(error1){
//             alert(e)
//             setIsLoading(false)
//             return
//         }


        


        
//     }

   
        
// }