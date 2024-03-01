import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  // Platform,
  // UIManager,
  // LayoutAnimation,
} from 'react-native'
// import { updateLeader } from '../httpServices/employees';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


// if (
//   Platform.OS === 'android' &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

const App = ({navigation}) => {
  // const [boxPosition, setBoxPosition] = useState('left');

  // const toggleBox = () => {
  //   LayoutAnimation.configureNext({
  //     duration: 500,
  //     update: {type: 'spring', springDamping: 0.4}
  //   });
  //   setBoxPosition(boxPosition === 'left' ? 'right' : 'left');
  // };


// async function update(){
//   for(let i = 0; i < arr.length ; i++){
//       let response = await updateLeader(arr[i])
//     if(response){
//       console.log(response)
//     }
//   }
// }
const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(()=>{
    // console.log("Registering for push notifications")
    // registerForPushNotificationsAsync().then(token =>{
    //   console.log("token: ", token)
    //   setExpoPushToken(token)
    // })
    // .catch(e => console.log(e))

    console.log("FIRST TIME PRINTOUT")

  },[])

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: '3dd4f5c3-4b29-45aa-ae82-895b43e64251' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

  async function sendNotification(){
    console.log("Sending push notification...")

    //notification message

    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification!",
      body: "This is my first push notification made with an Expo RN app"
    }
    
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers:{
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json"
      },
      body: JSON.stringify(message)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* <Button title="Toggle Layout" onPress={toggleBox} /> */}
        <Text>Expo RN Push notifications</Text>
        {/* <Button title="Send notification" onPress={sendNotification}/> */}
        <Button title="go back" onPress={()=> navigation.navigate("CompetencyScreen")}/>

      </View>
      {/* <View
        style={[styles.box, boxPosition === 'left' ? null : styles.moveRight]}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'plum'
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: 'blue',
  },
  moveRight: {
    alignSelf: 'flex-end',
    height: 200,
    width: 200,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
});

export default App;