"use client"
import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import TopBar from '../UI/TopBar.jsx';
import Image from 'next/image';
import Calendar from '../UI/Calendar/Calendar'
import FriendsList from '../UI/FriendsList/FriendsList'
import dayjs from "dayjs";


import { UserAuth } from '../context/AuthContext.js';
import { useRouter } from 'next/navigation';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



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

  const friends = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

  const [selectedFriends, setSelectedFriends] = useState([]);

  return (
    <div className='app'>
      <TopBar />

      <div className='home-grid'>

        <div
          id='left-card'
          className='card'>
          <Accordion
            square="false"
            disableGutters
            defaultExpanded
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              border: 'none',
            }}
          >
            <div style={{ position: 'relative' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <span className='accordion-heading'>My Calendar</span>
              </AccordionSummary>
              <div className="accordion-underline"></div>
            </div>

            <AccordionDetails
              sx={{
                padding: '0'
              }}>
              <h4 className='calendar-selected-date'>{dayjs(selectedDate).format("MMMM D, YYYY")}</h4>
              <Calendar
                selectedDate={selectedDate}
                onDateChange={(newSelectedDate) => setSelectedDate(newSelectedDate)}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion
            square="false"
            disableGutters
            defaultExpanded
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              border: 'none',
              '&::before': {
                content: 'none',
              },
            }}
          >
            <div style={{ position: 'relative' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <span className='accordion-heading' style={{ fontSize: '1.5rem' }}>Friends</span>
              </AccordionSummary>
              <div className="accordion-underline"></div>
            </div>
            <AccordionDetails
              sx={{
                padding: '0'
              }}>
              <FriendsList
                friends={friends}
                selectedFriends={selectedFriends}
                setSelectedFriends={setSelectedFriends}
              ></FriendsList>
            </AccordionDetails>
          </Accordion>

        </div>


        <div
          id='right-card'
          className='placeholder-box'>
          {/* <span>{selectedDate.toString()}</span> */}
        </div>
      </div >
    </div >
  );
}

