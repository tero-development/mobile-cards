import {View, Text, Button} from 'react-native'
import * as Notifications from 'expo-notifications';
import Title from '../UI/Title'
import { useEffect } from 'react';

const AssessmentScreen =({navigation, message, url, urlClear}) =>{

    // useEffect(()=>{
    //   if(url){
    //     navigation.navigate(url)
    //     urlClear()
    //   }

    //   return ()=>{}
    // },[url])

    //This is all you need for local notifications, apparently
    async function scheduleLocalNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Reroute 📬",
            body: "Routing to link screen...",
            data: { data: 'goes here', url: 'myApp://links' },
          },
          trigger: {seconds: 10},
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
          onPress={async () => {await scheduleLocalNotification()}}
        />
        <Text style={{marginTop: 24}}>Your notification message: </Text>
        {message && <Text style={{color: 'white', backgroundColor: 'dodgerblue', padding: 10, marginTop: 12}}>{message}</Text>}
      </View>
    )
}

export default AssessmentScreen