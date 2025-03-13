import { messaging, firebaseMessagingUrl } from "./firebase";
import { onMessage, getToken } from 'firebase/messaging';
import { useTokens } from '../hooks/useTokens';

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY;

const { saveToken, fetchToken } = useTokens();

async function requestNotificationsPermissions() {
  // const permission = await Notification.requestPermission();
  // if (permission === 'granted') {
  //   console.log('Notification permission granted.');
  // } else {
  //   console.log('Unable to get permission to notify.');
  // }
}


export async function saveMessagingDeviceToken(user_id) {
  try {
    const msg = await messaging();
    const registration = await navigator.serviceWorker.register(firebaseMessagingUrl());
    const fcmToken = await getToken(msg, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    if (fcmToken) {
      console.log('Got FCM device token:', fcmToken);
      await saveToken(user_id, fcmToken); // Save device token in DB
      // firebase-messaging-sw.js will receive the message if app is in background
      onMessage(msg, (message) => {
        console.log(
          'New foreground notification from Firebase Messaging!',
          message.notification
        );
        new Notification(message.notification.title, { body: message.notification.body });
      });
      return true;
    } else {
      console.log('Need to request notification permissions');
      requestNotificationsPermissions();
      return false;
    }
  } catch (error) {
    console.error('Unable to get messaging token.', error);
  };
}