import {View, Text, Button} from 'react-native'
import * as Notifications from 'expo-notifications';
import Title from '../UI/Title'
import { useEffect } from 'react';
import { unlockquiz, searchEmployee } from '../httpServices/producers'

const AssessmentScreen =({navigation, message, url, urlClear}) =>{

    // useEffect(()=>{
    //   async function trial(){
    //     try{
    //       const response = await searchEmployee("rroseborne@tero.com")
    //       if(response){
    //         console.log(response)
    //       }
    //     }catch(e){
    //       alert(e)
    //     }
    //   }

    //   trial()
    // },[])

    //This is all you need for local notifications, apparently
    async function scheduleLocalNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Reroute 📬",
            body: "Routing to link screen...",
            data: { data: 'goes here', url: 'tlApp://links' },
          },
          trigger: {seconds: 1},
        });
      }

    

    return(
        // <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
        //     <Title>Assessment Screen</Title>
        // </View>

        

        <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{marginBottom: 24, fontSize: 24, fontWeight: 'bold'}}>Nofication Home Screen</Text>
        <Button
          title="Press to schedule a notification"
          onPress={async()=>{
            try{
              const response = await unlockquiz("65bb2df8b2fcebc227314420")
              if(response.modifiedCount){
                const roster = response.roster
                const title = response.title
              }else{
                console.log("unable to complete request")
              }
            } catch(e){
              alert(e)
            }
          }}
        />
        <Text style={{marginTop: 24}}>Your notification message: </Text>
        {message && <Text style={{color: 'white', backgroundColor: 'dodgerblue', padding: 10, marginTop: 12}}>{message}</Text>}
      </View>
    )
}

export default AssessmentScreen