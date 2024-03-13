import { useWindowDimensions, Platform, Linking  } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Colors from './utils/colors';
import { converterSetup, useStyles } from './utils/dimensions';
import DismissKeyboard from './UI/DismissKeyboard';
import SignInContextProvider from './store/signin-context';
import SplashScreen from './screens/SplashScreen';
import SignIn from './screens/SignIn';
import CreateAccount from './screens/CreateAccount';
import HomeScreen from './screens/HomeScreen';
import LearnerSchedule from './screens/LearnerSchedule';
import AssessmentScreen from './screens/AssessmentScreen';
import ProfileScreen from './screens/ProfileScreen';
import QuizScreen from './screens/QuizScreen';
import ConfirmAccount from './screens/ConfirmAccount';
import ContactInfoScreen from './screens/ContactInfoScreen';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import CompanyContextProvider from './store/company-context';
import SeasonContextProvider from './store/season-context';
import AssessmentContextProvider from './store/assessment-context';
import CafeContextProvider from './store/cafe-context';
import QuizContextProvider from './store/quiz-context';
import HubspotContextProvider from './store/hubspot-context';
import CafeListScreen from './screens/CafeListScreen';
import CafeScreen from './screens/CafeScreen';
import AdminScreen from './screens/AdminScreen';
import QuizAdminScreen from './screens/QuizAdminScreen';
import LinkScreen from './screens/LinksScreen';
import DateSchedulingScreen from './screens/DateSchedulingScreen';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import StandardDrawer from './utils/StandardDrawer';
import AdminDrawer from './utils/AdminDrawer';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

async function sendPushNotification(expoPushToken){
  //notification message

  const message = {
    to: expoPushToken,
    sound: "default",
    title: "My first push notification!",
    body: "This is my first push notification made with an Expo RN app",
    data: {someDate: 'goes here'}
  }
  
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers:{
      host: "exp.host",
      accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-type": "application/json"
    },
    body: JSON.stringify(message)
  })
}

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: Colors.primaryColor,
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     // Learn more about projectId:
//     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: Constants.expoConfig.extra.eas.projectId,
//     });    console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token.data?;
// }

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [url, setUrl] = useState(false)
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(()=>{
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      setUrl(notification.request.content.data?.url)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("response listener log: ")
      console.log(response)
    })


    return () =>{
      if(notificationListener.current){
        Notifications.removeNotificationSubscription(notificationListener.current)
      }
      if(responseListener.current){
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  function urlClear(){
    setUrl(false)
  }

  // received notification format
  // {"date": 1709153301.552504, 
  // "request": 
  //   {
  //     "content": 
  //     {
  //       "attachments": [Array], "badge": null, "body": "Here is the notification body", "categoryIdentifier": "", "data": [Object], "launchImageName": "", "sound": null, "subtitle": null, "summaryArgument": "", "summaryArgumentCount": 0, "targetContentIdentifier": null, "threadIdentifier": "", "title": "You've got mail! 📬"
  //     }, 
  //     "identifier": "871bfca2-78bd-4226-ba85-e0073f6c4caa", 
  //     "trigger": {"class": "UNTimeIntervalNotificationTrigger", "repeats": false, "seconds": 2, "type": "timeInterval"}
  //   }
  // }


  //response 
  // {
  //   "actionIdentifier": "expo.modules.notifications.actions.DEFAULT", 
  //   "notification": 
  //     {
  //       "date": 1709154049.918837, 
  //       "request": {"content": [Object], "identifier": "75dac3cf-edf7-466e-b042-7f1af3820dad", "trigger": [Object]}
  //     }
  // }

 if(notification.request !== undefined){
  console.log("received notification: ")
  console.log(notification.request.content)
  console.log("")
 }

 if(responseListener.current !== undefined ){
    if(responseListener.current.notification !== undefined){
      console.log("received response: ")
      console.log(responseListener.current)
      console.log("")
    }
 }

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: Colors.primaryColor,
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
      console.log("token: "+token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
    
    return token;
  }

  const Stack = createNativeStackNavigator()
  const Drawer = createDrawerNavigator()

  const admin = 1
  
  const DrawerGroup = () =>{

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)

    let drawerFormat

    switch(admin){
      case 1: drawerFormat = AdminDrawer()
      break
      default: drawerFormat = StandardDrawer()
    }

    return(
      <DismissKeyboard> 
          <Drawer.Navigator screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: Colors.primaryColor200,
          drawerActiveTintColor: Colors.secondaryColor400,
          drawerInactiveTintColor: Colors.secondaryColor300,
          drawerStyle:{backgroundColor: Colors.primaryColor100},
          drawerLabelStyle:{fontSize: converter(width/25, width/25, width/35, width/35)}
        }}>
            {/* <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{title: "Home"}}/>
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{title: "Profile"}}/>
            <Drawer.Screen name="LearnerSchedule" component={LearnerSchedule} options={{title: 'My Schedule'}}/>
            <Drawer.Screen name="CompetencyScreen" component={AssessmentScreen}options={{title: 'Competency Cards'}}/>
            <Drawer.Screen name="CafeListScreen" component={CafeListScreen} options={{title: 'ExSellerator'}}/> */}
            {/* <Drawer.Screen name="AdminScreen" component={AdminScreen} options={{title: "Home"}}/> */}
            {/* <Drawer.Screen name="QuizAdminScreen" component={QuizAdminScreen} options={{title: 'Quiz Builder'}}/> */}
            {/* <Drawer.Screen name="DateSchedulingScreen" component={DateSchedulingScreen} options={{title: 'Date Scheduling'}}/> */}
            {/* <Drawer.Screen name="LinkScreen" component={LinkScreen} options={{title: 'Links'}}/> */}
            {drawerFormat}
        </Drawer.Navigator>
      </DismissKeyboard>
      
    )
  }

  return (
    <>
    <StatusBar style='dark'/>
    <DismissKeyboard>
      <NavigationContainer
            linking={{
              prefixes:['tlApp://'],
              config: {
                screens:{
                  LinkScreen: "links"
                }
              },
              async getInitialURL() {
                // First, you may want to do the default deep link handling
                // Check if app was opened from a deep link
                const url = await Linking.getInitialURL();
      
                if (url != null) {
                  return url;
                }
      
                // Handle URL from expo push notifications
                const response = await Notifications.getLastNotificationResponseAsync();
      
                return response?.notification.request.content.data?.url;
              },
              subscribe(listener) {
                const onReceiveURL = ({ url }) => listener(url);
      
                // Listen to incoming links from deep linking
                const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);
      
                // Listen to expo push notifications
                const subscription = Notifications.addNotificationResponseReceivedListener(response => {
                  const url = response.notification.request.content.data?.url;
      
                  // Any custom logic to see whether the URL needs to be handled
                  //...
      
                  // Let React Navigation handle the URL
                  listener(url);
                });
      
                return () => {
                  // Clean up the event listeners
                  eventListenerSubscription.remove();
                  subscription.remove();
                };
              },
            }}
      >
        <SignInContextProvider>
        <CompanyContextProvider>
          <SeasonContextProvider>
            <AssessmentContextProvider>
              <CafeContextProvider>
                <HubspotContextProvider>
                  <QuizContextProvider>
              <Stack.Navigator screenOptions={{
                headerShown: false
              }}>
                {/* <Stack.Screen name='CompetencyScreen' options={{ title: 'Competency Cards' }}>
                  {({navigation})=>  <AssessmentScreen navigation={navigation}  message = {notification.request?.content.body} url = {url} urlClear={urlClear}/>}
                </Stack.Screen> */}
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="LinkScreen" component={LinkScreen}options={{title: 'Links'}}/>
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="CreateAccount" component={CreateAccount} />
                    <Stack.Screen name="ConfirmAccount" component={ConfirmAccount} />
                    <Stack.Screen name="ContactInfo" component={ContactInfoScreen}/>
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                    <Stack.Screen name="ResetPassword" component={ResetPassword}/>
                    <Stack.Screen name="QuizScreen" component={QuizScreen} />
                    <Stack.Screen name="CafeScreen" component={CafeScreen} />
                    <Stack.Screen name="DrawerGroup" component={DrawerGroup} />
              </Stack.Navigator>
                </QuizContextProvider>
              </HubspotContextProvider>  
            </CafeContextProvider>
          </AssessmentContextProvider>
          </SeasonContextProvider>
        </CompanyContextProvider>
        </SignInContextProvider>
      </NavigationContainer>
    </DismissKeyboard>
    </>
  );
}


