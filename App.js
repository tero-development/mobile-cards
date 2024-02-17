import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
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
import HubspotContextProvider from './store/hubspot-context';
import AdminScreen from './screens/AdminScreen';
import QuizAdminScreen from './screens/QuizAdminScreen';
import LinkScreen from './screens/LinksScreen';
import DateSchedulingScreen from './screens/DateSchedulingScreen';
import CafeScreen from './screens/CafeScreen';
import * as Notifications from 'expo-notifications'
// import { requestPermissionsAsync } from 'expo-notifications';



// Notifications.setNotificationHandler({
//   handleNotification: async()=>{
//     return{
//       shouldPlaySound: false,
//       shouldSetBadge: false,
//       shouldShowAlert: true
//     }
//   }
// })


// requestPermissionsAsync()

export default function App() {
  
  const Stack = createNativeStackNavigator()
  const Drawer = createDrawerNavigator()

      
  
  const DrawerGroup = () =>{

    const {width, height} = useWindowDimensions()

    const converter = converterSetup(width, height)


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
            <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{title: "Home"}}/>
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{title: "Profile"}}/>
            <Drawer.Screen name="LearnerSchedule" component={LearnerSchedule} options={{title: 'My Schedule'}}/>
            <Drawer.Screen name="CompetencyScreen" component={AssessmentScreen}options={{title: 'Competency Cards'}}/>
            <Drawer.Screen name="CafeScreen" component={CafeScreen} options={{title: 'ExSellerator'}}/>
            {/* <Drawer.Screen name="AdminScreen" component={AdminScreen} options={{title: "Home"}}/> */}
            {/* <Drawer.Screen name="QuizAdminScreen" component={QuizAdminScreen} options={{title: 'Quiz Builder'}}/> */}
            {/* <Drawer.Screen name="DateSchedulingScreen" component={DateSchedulingScreen} options={{title: 'Date Scheduling'}}/> */}
            {/* <Drawer.Screen name="LinkScreen" component={LinkScreen} options={{title: 'Links'}}/> */}
        </Drawer.Navigator>
      </DismissKeyboard>
      
    )
  }

  return (
    <>
    <StatusBar style='dark'/>
    <DismissKeyboard>
      <NavigationContainer>
        <SignInContextProvider>
        <CompanyContextProvider>
          <SeasonContextProvider>
            <AssessmentContextProvider>
              <CafeContextProvider>
                <HubspotContextProvider>
              <Stack.Navigator screenOptions={{
                headerShown: false
              }}>
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="CreateAccount" component={CreateAccount} />
                    <Stack.Screen name="ConfirmAccount" component={ConfirmAccount} />
                    <Stack.Screen name="ContactInfo" component={ContactInfoScreen}/>
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                    <Stack.Screen name="ResetPassword" component={ResetPassword}/>
                    <Stack.Screen name="DrawerGroup" component={DrawerGroup} />
              </Stack.Navigator>
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


