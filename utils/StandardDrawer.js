import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import LearnerSchedule from '../screens/LearnerSchedule';
import AssessmentScreen from '../screens/AssessmentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CafeListScreen from '../screens/CafeListScreen';

  const Drawer = createDrawerNavigator()
  
  const StandardDrawer = () =>{ 

    return(
        <>
            <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{title: "Home"}}/>
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{title: "Profile"}}/>
            <Drawer.Screen name="LearnerSchedule" component={LearnerSchedule} options={{title: 'My Schedule'}}/>
            <Drawer.Screen name="CompetencyScreen" component={AssessmentScreen}options={{title: 'Competency Cards'}}/>
            <Drawer.Screen name="CafeListScreen" component={CafeListScreen} options={{title: 'ExSellerator'}}/>
        </>
    )
  }



export default StandardDrawer