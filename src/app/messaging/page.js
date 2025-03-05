"use client";
import { useState, useEffect } from "react";
import "./messaging.css";
import { UserAuth } from '../context/AuthContext.js';
import { useRouter } from 'next/navigation';
import { saveMessagingDeviceToken } from '../firebase/messaging'
import { useNotifications } from '../hooks/useNotifications'
import { useTokens } from '../hooks/useTokens';

export default function Page() {
  const {
    user, authLoading,
    userSignIn, userSignUp,
    googleSignIn,
    userSignOut
  } = UserAuth();

  const USER_ID = user?.uid;

  const { saveToken, fetchToken } = useTokens();
  const { sendNotification } = useNotifications();
  const { notifPermission, setNotifPermission } = useState(false);

  const handleTestNotification = async () => {

    const permission = await saveMessagingDeviceToken(USER_ID);
    if (permission) {
      const token = await fetchToken(USER_ID);
      if (token) {
        sendNotification(token);
      }
    }

  };

  return (
    <div className="container">
      <button
        onClick={handleTestNotification}
        className="notification-button"
        disabled={!USER_ID}
      >
        Test Notification
      </button>
    </div>
  );
}