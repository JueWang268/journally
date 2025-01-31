import { messaging, firebaseMessagingUrl } from "./firebase";
import { getToken, onMessage } from 'firebase/messaging';
import { useTokens } from '../hooks/useTokens';

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY;

const { saveToken } = useTokens();

async function requestNotificationsPermissions(user_id) {
  console.log('Requesting notifications permission...');
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('Notification permission granted.');
    await saveMessagingDeviceToken(user_id);
  } else {
    console.log('Unable to get permission to notify.');
  }
}

export async function saveMessagingDeviceToken(user_id) {
  console.log('running saveMessagingDeviceToken');
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
      console.log('inserted token');
      console.log(fcmToken);
      console.log('into user_id');
      console.log(user_id);
      // firebase-messaging-sw.js will receive the message if app is in background
      onMessage(msg, (message) => {
        console.log(
          'New foreground notification from Firebase Messaging!',
          message.notification
        );
        new Notification(message.notification.title, { body: message.notification.body });
      });
    } else {
      console.log('need to request notification permissions')
      requestNotificationsPermissions(user_id);
    }
  } catch (error) {
    console.error('Unable to get messaging token.', error);
  };
}