import { createDrawerNavigator } from '@react-navigation/drawer';
import ProducerScreen from '../screens/ProducerScreen'
import ProducerMonths from '../screens/ProducerMonths'
import ProducerClasses from '../screens/ProducerClasses';
import ScoreScreen from '../screens/ScoreScreen';
  
const Drawer = createDrawerNavigator()
  
  const ProducerDrawer = () =>{ 

    return(
        <>
            <Drawer.Screen name="ProducerScreen"  component={ProducerScreen} options={{title: "Home"}}/>
            <Drawer.Screen name="QuizMonths" initialParams={{designation: "quizzes"}} component={ProducerMonths} options={{title: "Quizzes"}}/>
            <Drawer.Screen name="AttendanceMonths" initialParams={{designation: "attendance"}} component={ProducerMonths} options={{title: "Attendance"}}/>
            <Drawer.Screen name="ScoreMonths" initialParams={{designation: "scores"}} component={ProducerMonths} options={{title: "Scores"}}/>
            <Drawer.Screen name="ScoreScreen" component={ScoreScreen}/>

            {/* <Drawer.Screen name="ProducerClasses" component={ProducerClasses}/>
            <Drawer.Screen name="ScoreScreen" component={ScoreScreen}/> */}
        </>
    )
  }



export default ProducerDrawer