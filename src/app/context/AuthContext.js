"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { useAuthState, useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/config.js";
import { useRouter } from 'next/navigation.js';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, authLoading, authError] = useAuthState(auth);
  const router = useRouter();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const userSignIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(email, password);
      return result;
    }
    catch {
      console.log(e);
    }
  };

  const userSignUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(email, password);
      return result;
    }
    catch (e) {
      console.log(e);
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
      user, authLoading, authError,
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