"use client"
import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import '../../styles/DataTracking.css';
import TopBar from '../UI/TopBar.jsx';
import '../../styles/BgTopBar.css';
import Card from "../UI/Card/CardDisplay.jsx";
import Image from 'next/image';
import Calendar from '../UI/Calendar/Calendar';
import FriendsList from '../UI/FriendsList/FriendsList';
import dayjs from "dayjs";
import useGoals from "../hooks/useGoals";
import useDatapoints from "../hooks/useDataPoints";

import { UserAuth } from '../context/AuthContext.js';
import { useRouter } from 'next/navigation';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Gauge, PieChart } from '@mui/x-charts/';

const test_user_id = '410544b2-4001-4271-9855-fec4b6a6442a';

export default function Page() {
  const {
    user, authLoading, authError,
    userSignIn, userSignUp,
    googleSignIn,
    userSignOut
  } = UserAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [user, router]);

  const USER_ID = user?.uid;
  const {datapoints, 
    loading_d, 
    error_d,
    createDatapoint,
    editDp,
    removeDp,
    setDatapoints } = useDatapoints(USER_ID);
  const {
    goals, 
    loading_g, 
    error_g,
    setNewGoal,
    editGoal,
    removeGoal,
    setGoals
    } = useGoals(USER_ID);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const [periodStart, setPeriodStart] = useState(null);
  const [periodEnd, setPeriodEnd] = useState(null);

  // Monitor loading states
  useEffect(() => {
    if (!loading_g && !loading_d) {
      setIsLoading(false); // Both hooks have finished loading
      // Set selectedGoal only if goals is not empty
      // setGoals(goals);
      if (goals && goals.length > 0) {
        setSelectedGoal(goals[0]);
      }
    } else {
      setIsLoading(true);
    }
  }, [loading_g, loading_d, goals, setGoals]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedFriends, setSelectedFriends] = useState([]);

    // useEffect to update periodStart and periodEnd when selectedGoal changes
    useEffect(() => {
      if (selectedGoal) {
        const startDate = dayjs(selectedGoal.start_date);
        const currentDate = selectedDate; 
  
        // Calculate the current period based on the goal's frequency
        const daysSinceStart = currentDate.diff(startDate, "day");
        const periodNumber = Math.floor(daysSinceStart / selectedGoal.frequency);
        const newPeriodStart = startDate.add(periodNumber * selectedGoal.frequency, "day");
        const newPeriodEnd = newPeriodStart.add(selectedGoal.frequency, "day");
  
        // Update periodStart and periodEnd
        setPeriodStart(newPeriodStart);
        setPeriodEnd(newPeriodEnd);
      } else {
        // If no goal is selected, reset periodStart and periodEnd
        setPeriodStart(null);
        setPeriodEnd(null);
      }
    }, [selectedGoal, selectedDate]);
  
  // Show loading spinner or message
  if (isLoading) {
    return <div>LOADING</div>;
  }

  // Handle errors
  if (error_g || error_d) {
    return (
      <div>
        <p>Error loading data:</p>
        {error_g && <p>{error_g}</p>}
        {error_d && <p>{error_d}</p>}
      </div>
    );
  }
  
  const colorPalette = ["#C8EFB8","#E1E2FF","#F2C595"];
  const friends = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

  // functions
  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    selectedDate?.subtract(6 - index, 'day')
  );

  const goalsIn = (cat) => {
    return goals.filter(g => g.category === cat);
  }

  const isDateInActivities = (activities, targetDate) => {
    // activities is object in datapoints format
    for (const activityType in activities) {
      if (Array.isArray(activities[activityType])) {
        for (const entry of activities[activityType]) {
          if (entry.date === targetDate) {
            return true; // Date found
          }
        }
      }
    }
    return false; // Date not found
  }

  const isGoalMet = (targetDate, goal) => {
    // day is dayjs object
    // Calculate the current period start and end dates
    const startDate = dayjs(goal?.start_date);

    const daysSinceStart = targetDate.diff(startDate, "day");
    const periodNumber = Math.floor(daysSinceStart / goal?.frequency);
    const periodStart = startDate.add(periodNumber * goal?.frequency, "day");
    const periodEnd = periodStart.add(goal?.frequency, "day");

    // Filter datapoints within the current period and matching the goal name
    const relevantDatapoints = datapoints[goal?.name]?.filter((dp) => {
      const dpDate = dayjs(dp.date);
      return (
        (dpDate.isAfter(periodStart) || dpDate.isSame(periodStart)) &&
        dpDate.isBefore(periodEnd)
      );
    });

    // Calculate the cumulative value of the filtered datapoints
    const cumulativeValue = relevantDatapoints?.reduce(
      (sum, dp) => sum + dp.value,
      0
    );
    console.log(`${cumulativeValue} for ${targetDate}. 
      period: ${periodStart.format("MMM D")} - ${periodEnd.format("MMM D")}`);
    return cumulativeValue >= goal?.value;
  }

  return (
    <div className='app'>
      <TopBar loggedIn = {Boolean(user)} onProfileClick={userSignOut}/>

      <div className='home-grid'>
        <div
          id='left-card'
          className='left-container'
        >
          <Card 
            title="Calendar"
            icons={[]}
            content={<div></div>}
            height={"20vh"}
          />
          <Card 
            title="Monthly View"
            icons={[]}
            content={<div></div>}
            fontSize={"10pt"}
            height={"20vh"}
          />
          <Card 
            title="New Goal"
            icons={[]}
            content={<div></div>}
            height={"20vh"}
          />

        </div>

        <div className='contents-container'>

          <div className="top-flex-container">
            {
              Array.from({ length: 3 }, (_, index) => 
                <Card
                  title={"Placeholder"}
                  icons={[]}
                  content={
                    <div>
                      graph goes here
                    </div>
                  }

                />
              )
            }
          </div>

          <div className="bottom-flex-container">
              <div className = "progress-card">
                <Card
                  title={`Daily Data Overview`}
                  icons={[
                    <Image className='menu-icon' style={{cursor:"pointer"}}
                    src="/assets/icons/menu-icon.svg" alt="menu-icon" width="40" height="40"/>
                  ]}
                  content={
                  <div>
                  * GRAPH GOES HERE*
                  </div>
                  }

                />
              </div>
              <div className = "new-entry-card">
                <Card
                  title="New Entry"
                  icons= {[
                    <Image
                      className='add-icon' style={{cursor:"pointer"}}
                      src="/assets/icons/add-icon.svg"
                      alt="add-icon" width="34" height="34"
                    />
                  ]}
                  content={
                    <div style={{height: "30vh", 
                      width: "200px",
                      wordWrap: "break-word",
                      overflow:"scroll", 
                      fontFamily:"monospace"}}>
                      {JSON.stringify(goals)}
                      {
                        /*
                        JSON.stringify(datapoints)
                        */
                      }
                    </div>
                  }

                />
              </div>

          </div>
            
        </div>

      </div>
    </div>
  );
}

