import React, {useState} from 'react';
import {
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  StyleSheet,
  Button,
} from 'react-native'
import { updateLeader } from '../httpServices/employees';
import * as Notifications from 'expo-notifications'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [boxPosition, setBoxPosition] = useState('left');

  const toggleBox = () => {
    LayoutAnimation.configureNext({
      duration: 500,
    //   create: {type: 'linear', property: 'opacity'},
      update: {type: 'spring', springDamping: 0.4}
    //   delete: {type: 'linear', property: 'opacity'},
    });
    setBoxPosition(boxPosition === 'left' ? 'right' : 'left');
  };


async function update(){
  for(let i = 0; i < arr.length ; i++){
      let response = await updateLeader(arr[i])
    if(response){
      console.log(response)
    }
  }
}

async function scheduleNotificationHandler() {

  Notifications.iosNotificationPermissionGranted({
    allowsIosNotificationsAsync: true
  })
  
  if(iosNotificationPermissionGranted){
   await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 }
    });
  
  }
   
}




  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* <Button title="Toggle Layout" onPress={toggleBox} /> */}
        <Button title="schedule notification" onPress={scheduleNotificationHandler}

        />

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
    backgroundColor: 'grey'
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