import { createDrawerNavigator } from '@react-navigation/drawer';
import ProducerScreen from '../screens/ProducerScreen'
// import ProducerMonths from '../screens/ProducerMonths'

  const Drawer = createDrawerNavigator()
  
  const ProducerDrawer = () =>{ 

    return(
        <>
            <Drawer.Screen name="ProducerScreen" component={ProducerScreen} options={{title: "Home"}}/>
            {/* <Drawer.Screen name="Quiz" component={ProducerMonths} options={{title: "Quiz"}}/>
            <Drawer.Screen name="Attendance" component={ProducerMonths} options={{title: "Attedance"}}/>
            <Drawer.Screen name="Scoring" component={ProducerMonths} options={{title: 'Scoring'}}/> */}
        </>
    )
  }



export default ProducerDrawer