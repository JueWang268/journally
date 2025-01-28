"use client";
import { useState, useEffect } from "react";
import "./messaging.css";
import { UserAuth } from '../context/AuthContext.js';
import { useRouter } from 'next/navigation';
import { saveMessagingDeviceToken } from '../firebase/messaging'

export default function Page() {
  const {
    user, authLoading,
    userSignIn, userSignUp,
    googleSignIn,
    userSignOut
  } = UserAuth();

  const USER_ID = user?.uid;

  const handleTestNotification = () => {
    // FIXME: Temporary fix for redirect to login if use router
    if (USER_ID) {
      saveMessagingDeviceToken(USER_ID);
    }
    // TODO: add send notification function
  };

  return (
    <div className="container">
      <button onClick={handleTestNotification} className="notification-button">
        Test Notification
      </button>
    </div>
  );
}