import {View, Text, Button} from 'react-native'
import * as Notifications from 'expo-notifications';
import Title from '../UI/Title'
import { useEffect } from 'react';

const AssessmentScreen =({navigation, message, url}) =>{
  useEffect(()=>{
    if(url){
      navigation.navigate(url)
    }
  },[url])

    //This is all you need for local notifications, apparently
    async function scheduleLocalNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "You've got mail! 📬",
            body: "Here's a new message!",
            data: { data: 'goes here', url: 'SplashScreen' },
          },
          trigger: null,
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
          onPress={async () => {await scheduleLocalNotification();}}
        />
        <Text style={{marginTop: 24}}>Your notification message: </Text>
        {message && <Text style={{color: 'white', backgroundColor: 'dodgerblue', padding: 10, marginTop: 12}}>{message}</Text>}
      </View>
    )
}

export default AssessmentScreen