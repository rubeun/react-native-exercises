import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'MobileFlashcards:DailyNotification'

// ### NOTIFICATIONS ###

// clear local notifications
export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

// returns an object representing notification
function createNotification () {
  return {
    title: 'Do a Quiz!',
    body: "👋 You haven't done a quiz today yet, don't forget to do a quiz today!",
    ios: {
      sound: true,
    }
  }
}

// check if notification has already been set, if not set it
export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) { // no notification set
        Permissions.askAsync(Permissions.NOTIFICATIONS) // ask permission to set notification
          .then(({ status }) => {
            if (status === 'granted') { 
              Notifications.cancelAllScheduledNotificationsAsync() // clears any prior notification just in case

              // dummy data for 8pm tomorrow
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate())
              tomorrow.setHours(7)
              tomorrow.setMinutes(48)

              // create notification for tomorrow and repeat daily
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              // set notification with key to local storage
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}