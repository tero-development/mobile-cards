import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminScreen from '../screens/AdminScreen';
import QuizAdminScreen from '../screens/QuizAdminScreen';
import LinkScreen from '../screens/LinksScreen';
import DateSchedulingScreen from '../screens/DateSchedulingScreen';



  const Drawer = createDrawerNavigator()
  
  const AdminDrawer = () =>{ 
 
    return(
        <>
            <Drawer.Screen name="AdminScreen" component={AdminScreen} options={{title: "Home"}}/>
            <Drawer.Screen name="QuizAdminScreen" component={QuizAdminScreen} options={{title: 'Quiz Builder'}}/>
            <Drawer.Screen name="DateSchedulingScreen" component={DateSchedulingScreen} options={{title: 'Date Scheduling'}}/>
            <Drawer.Screen name="LinkScreen" component={LinkScreen} options={{title: 'Links'}}/>
        </>
    )
  }



export default AdminDrawer