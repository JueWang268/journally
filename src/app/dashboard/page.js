"use client"
import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import TopBar from '../UI/TopBar.jsx';
import Image from 'next/image';
import Calendar from '../UI/Calendar/Calendar'
import dayjs from "dayjs";

import { fetchGoals } from "../api/goalsAPI";
import { UserAuth } from '../context/AuthContext.js';
import { useRouter } from 'next/navigation';

export default function Page() {

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
      <TopBar />

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

