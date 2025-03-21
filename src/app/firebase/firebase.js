// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getMessaging, isSupported } from "firebase/messaging";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBANEXT_PUBLIC_FIREBASE_STORAGE_BUCKETSE_API_KEY,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
// const messaging = getMessaging(app);

export function firebaseMessagingUrl() {
  let url = '/firebase-messaging-sw.js';
  Object.entries(firebaseConfig).forEach(([key, value], index) => {
    url += `${index === 0 ? '?' : '&'}${key}=${value}`;
  });
  return url;
}

const messaging = async () => await isSupported() && getMessaging(app);

export { app, auth, messaging }