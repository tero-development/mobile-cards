import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminScreen from '../screens/AdminScreen';
import QuizProducerScreen from '../screens/QuizProducerScreen'
import DateSchedulingScreen from '../screens/DateSchedulingScreen';
import ProducerScreen from '../screens/ProducerScreen'

  const Drawer = createDrawerNavigator()
  
  const ProducerDrawer = () =>{ 

    return(
        <>
            <Drawer.Screen name="ProducerScreen" component={ProducerScreen} options={{title: "Home"}}/>
            <Drawer.Screen name="QuizManagement" component={QuizProducerScreen} options={{title: 'Quiz Management'}}/>
        </>
    )
  }



export default ProducerDrawer