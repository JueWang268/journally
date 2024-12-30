"use client";
import React, { useState, useEffect } from 'react';
import CardUI from "../UI/Card/CardUI.js";
import Card from "../../models/Card.js";
import Journal from "../../models/Journal.js";
import '../../styles/Dashboard.css';
import useJournals from '../hooks/useJournals.js';
import dayjs from "dayjs";

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
    new Card(
      1,
      "Test Card 1",
      [new Journal("id", "title", "2024-12-03", [], false, "user_id")],
      "user_id"),
    new Card(
      2,
      "Test Card 2",
      [new Journal("id", "title", "2024-12-03", [], false, "user_id")],
      "user_id"),
  ]);

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [selectedJournals, setSelectedJournals] = useState([]);

  const filterJournalsByDate = () => {
    const filteredJournals = journals_.filter((journal) =>
      dayjs(journal.date).isSame(selectedDate, "day")
    );
    setSelectedJournals(filteredJournals);
  };

  const handlePageJSClick = () => {
    router.push('../');
  }

  const handleDateCalendarChange = (newSelectedDate) => {
    setSelectedDate(newSelectedDate);
    filterJournalsByDate();
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
              <CardUI key={card.id} title={card.title} journals={card.journals} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;