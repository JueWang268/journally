"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from "../firebase/config.js";
import { useRouter } from 'next/navigation.js';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, authLoading] = useAuthState(auth);

  const router = useRouter();

  // Error codes: https://firebase.google.com/docs/auth/admin/errors
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "The email or password is incorrect.";
      case "auth/too-many-requests":
        return "Too many requests. Try again later. "
      default:
        return "An unknown error occurred. Please try again.";
    }
  };

  const userSignIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    }
    catch (e) {
      return { error: getErrorMessage(e.code) };
    }
  };

  const userSignUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    }
    catch (e) {
      return { error: getErrorMessage(e.code) };
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log('google auth did not go through, probably canceled');
    }
  };

  const userSignOut = () => {
    signOut(auth);
    router.push('../login');
  };

  return (
    <AuthContext.Provider value={{
      user, authLoading,
      userSignIn, userSignUp,
      googleSignIn,
      userSignOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};