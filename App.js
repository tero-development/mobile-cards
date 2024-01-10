import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Colors from './utils/colors';
import DismissKeyboard from './UI/DismissKeyboard';
import SignInContextProvider from './store/signin-context';
import SplashScreen from './screens/SplashScreen';
import SignIn from './screens/SignIn';
import CreateAccount from './screens/CreateAccount';
import HomeScreen from './screens/HomeScreen';
import LearnerSchedule from './screens/LearnerSchedule';
import AssessmentScreen from './screens/AssessmentScreen';
import ProfileScreenMotion from './screens/ProfileScreenMotion';
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


export default function App() {

  
  const Stack = createNativeStackNavigator()
  const Drawer = createDrawerNavigator()

  const DrawerGroup = () =>{
    return(
      <DismissKeyboard> 
          <Drawer.Navigator screenOptions={{
          headerShown: false,
          headerBackground: Colors.secondaryColor300
        }}>
              <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{title: "Home"}}/>
            <Drawer.Screen name="ProfileScreenMotion" component={ProfileScreenMotion} options={{title: "Profile"}}/>
            <Drawer.Screen name="LearnerSchedule" component={LearnerSchedule} options={{title: 'My Schedule'}}/>
            <Drawer.Screen name="CompetencyScreen" component={AssessmentScreen}options={{title: 'Competency Cards'}}/>
            <Drawer.Screen name="QuizScreen" component={QuizScreen} options={{title: 'Quiz'}}/>
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


