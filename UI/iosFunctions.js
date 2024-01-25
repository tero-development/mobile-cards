import * as Notifications from 'expo-notifications'


export async function allowsIosNotificationsAsync() {
    const settings = await Notifications.getPermissionsAsync();
    return (
      settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  }
  
  export async function requestPermissionsAsync() { 
    return await Notifications.requestPermissionsAsync({ 
        ios: { 
            allowAlert: true, 
            allowBadge: true, 
            allowSound: true, 
            allowAnnouncements: true
        }}); 
  } 