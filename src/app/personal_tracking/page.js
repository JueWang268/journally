"use client";
import React, { useState, useEffect } from 'react';
import '../../styles/personalTracking.css';
import TopBar from '../UI/TopBar.jsx';
import { DataPointsProvider } from '../context/DatapointsContext';
import DataPointGraph from '../UI/DataPointGraph';
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import Image from 'next/image';
import { UserAuth } from '../context/AuthContext';
dayjs.extend(weekday);

export default function PersonalTrackingPage() {
  const { user } = UserAuth();
  const userId = user?.uid; 

  const [selectedDate, setSelectedDate] = useState(dayjs());
  
  // Get the start and end of the current week
  const startOfWeek = selectedDate.startOf('week');
  const endOfWeek = selectedDate.endOf('week');
  
  // Generate the days for the current week
  const weekDays = [];
  for (let day = startOfWeek; day.isBefore(endOfWeek, 'day'); day = day.add(1, 'day')) {
    weekDays.push(day);
  }

  // Format current date
  const currentDate = selectedDate.format('MMMM D, YYYY');

  const defaultDataPoints = {
    dataset1: [
      { date: new Date('2025-01-20'), value: 1},
      { date: new Date('2025-01-21'), value: 0.98},
      { date: new Date('2025-01-22'), value: 0.96},
    ],
  };

  return (
    <div className='app'>
      <TopBar />

      <div className='home-grid'>
        <div className='left-side'>

          {/* calendar */}
          <div className='content-box'>
            <div className="header">
              <p>My Week</p>
            </div>
            <h4 className='calendar-selected-date'>{currentDate}</h4>
            <div className="calendar-days">
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${selectedDate.isSame(day, 'day') ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <p>{day.format('ddd')}</p>
                  <p>{day.format('MM/DD')}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* progress */}
          <div className='content-box'>
            <div className="header">
              <p>My Progress</p>
            </div>
            
          </div>
          
          {/* goal */}
          <div className='content-box'>
            <div className="header">
              <p>Goal Tracking</p>
            </div>
          </div>
        </div>

        <div className='right-side'>
          <div className='graph-container'>
            <div className='graph-box'>
              <div className='graph-content'>
                <div className="header">
                  <p>Daily Data</p>
                  <Image src="/assets/plusButton.svg" alt="icon" width="38" height="37"/>
                  <Image src="/assets/chevron-down.svg" alt="icon" width="54" height="54"/>
                  <Image src="/assets/menuButton.svg" alt="icon" width="38" height="37"/>
                </div>
                <div className='graph'>
                  <DataPointsProvider userId={userId}>
                    <DataPointGraph />
                  </DataPointsProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
