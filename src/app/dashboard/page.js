"use client";
import React, { useState, useEffect } from 'react';
import Card from "../UI/Card/Card";
import '../../styles/Dashboard.css';
import useJournals from '../hooks/useJournals.js';

// import useCards from "../hooks/useCards";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { UserAuth } from '../context/AuthContext.js';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
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

  const {
    journals_,
    loading: journalsLoading,
    error,
    selectedJournal,
    setSelectedJournal,
    getJournal,
    addJournal,
    editJournal,
    removeJournal,
    createTag,
    removeTag,
  } = useJournals(USER_ID);

  // placeholder cards
  const [cards, setCards] = useState([
    { id: 1, title: "Card 1", goal_ids: ["Goal A", "Goal B"] },
    { id: 2, title: "Card 2", goal_ids: ["Goal C"] },
    { id: 3, title: "Card 3", goal_ids: ["Goal D", "Goal E", "Goal F"] },
    { id: 4, title: "Card 4", goal_ids: ["Goal D", "Goal E", "Goal F"] },
    { id: 5, title: "Card 5", goal_ids: ["Goal D", "Goal E", "Goal F"] },
    { id: 6, title: "Card 6", goal_ids: ["Goal D", "Goal E", "Goal F"] },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);

  const handlePageJSClick = () => {
    router.push('../');
  }

  const handleDateCalendarChange = (newSelectedDate) => {
    setSelectedDate(newSelectedDate);
  };


  return (
    <div className='dashboard-page'>
      <div className="dashboard-container">
        <div className="calendar-section">
          <button onClick={handlePageJSClick}>back to page.js</button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={handleDateCalendarChange}
            />
          </LocalizationProvider>
        </div>
        <div className="cards-section">
          <div className="cards-grid">
            {cards.map((card) => (
              <Card key={card.id} title={card.title} goals={card.goal_ids} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;