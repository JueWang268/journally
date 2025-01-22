"use client"
import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import TopBar from '../UI/TopBar.jsx';
import Card from "../UI/Card/CardDisplay";
import RecentActivity from '../components/RecentActivityCard.jsx';
import Image from 'next/image';
import Calendar from '../UI/Calendar/Calendar';
import FriendsList from '../UI/FriendsList/FriendsList';
import dayjs from "dayjs";
import useGoals from "../hooks/useGoals";

import { fetchGoals, updateGoal } from "../api/goalsAPI";
import { UserAuth } from '../context/AuthContext.js';
import { useRouter } from 'next/navigation';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const test_user_id = '410544b2-4001-4271-9855-fec4b6a6442a';

export default function Page() {


  const {
    user, authLoading, authError,
    userSignIn, userSignUp,
    googleSignIn,
    userSignOut
  } = UserAuth();
  const router = useRouter();

  const USER_ID = user?.uid;
  const {
    goals, 
    loading, 
    error,
    setNewGoal,
    editGoal,
    removeGoal,
    setGoals
    } = useGoals(USER_ID);
    
    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

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

        <div className='contents-container'>
          <RecentActivity />

          <Card 
            title="Progress on Workout"
            icons= {[
              <Image 
                className='dropdown-icon' style={{cursor:"pointer"}} 
                src="/assets/icons/dropdown-icon.svg" 
                alt="dropdown-icon" width="54" height="54"
              />, 
              <Image className='menu-icon' style={{cursor:"pointer"}}
              src="/assets/icons/menu-icon.svg" alt="menu-icon" width="40" height="40"/>
            ]}
            content={
              <div>{/*JSON.stringify(goals)*/}</div>
            }
              
          />
            
        </div>

      </div>
    </div>
  );
}

