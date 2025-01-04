"use client"
import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import NavBar from './NavBar.jsx';
import Image from 'next/image';
import Calendar from '../UI/Calendar/Calendar'
import dayjs from "dayjs";


import { UserAuth } from '../context/AuthContext.js';
import { useRouter } from 'next/navigation';

export default function page() {

  const {
    user, authLoading, authError,
    userSignIn, userSignUp,
    googleSignIn,
    userSignOut
  } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const USER_ID = user?.uid;

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleLogoClick = () => {
    router.push('../');
  }

  return (
    <div className='app'>
      <nav className="top-bar">
        <div className="logo" onClick={handleLogoClick}>
          <Image src="/assets/Logo.svg" alt="icon" width="50" height="50" />
          <span className='brand'>
            Journally
          </span>
        </div>

        <NavBar />

        <Image className="user-icon" src="/assets/UserProfile.png" height="50" width="50" alt='User Profile' />

      </nav>

      <div className='home-grid'>
        <Calendar
          selectedDate={selectedDate}
          onDateChange={(newSelectedDate) => setSelectedDate(newSelectedDate)}
        />
        <div className='placeholder-box'>
          <span>{selectedDate.toString()}</span>

        </div>
      </div>
    </div>
  );
}

