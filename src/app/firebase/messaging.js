import { messaging, firebaseMessagingUrl } from "./firebase";
import { getToken, onMessage } from 'firebase/messaging';
import { upsertToken } from "../api/tokensAPI";

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY;

async function requestNotificationsPermissions(uid) {
  console.log('Requesting notifications permission...');
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('Notification permission granted.');
    await saveMessagingDeviceToken(uid);
  } else {
    console.log('Unable to get permission to notify.');
  }
}

export async function saveMessagingDeviceToken(uid) {
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
      const result = await upsertToken(uid, fcmToken); // Save device token in DB
      if (result.success) {
        console.log('upsert success')
        console.log('inserted token\n', fcmToken, '\ninto user_id', uid);
      } else {
        console.log('upsert failed')
      }
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
      requestNotificationsPermissions(uid);
    }
  } catch (error) {
    console.error('Unable to get messaging token.', error);
  };
}