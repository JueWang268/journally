"use client"
import React, { useState, useEffect } from 'react';
import '../../styles/BgTopBar.css';
import '../../styles/DataTracking.css';
import TopBar from '../UI/TopBar.jsx';
import Card from "../UI/Card/CardDisplay.jsx";
import Image from 'next/image';
import WeekCalendar from '../UI/Calendar/WeekCalendar';
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
import { WrapText } from '@mui/icons-material';

export default function Page() {
  const {
    user, authLoading, authError,
    userSignIn, userSignUp,
    googleSignIn,
    userSignOut
  } = UserAuth();
  const router = useRouter();

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

  // functions
  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    selectedDate?.subtract(6 - index, 'day')
  );

  const goalsIn = (cat) => {
    return goals.filter(g => g.category === cat);
  }

  const isDayActive = (activity, targetDate) => {
    // activity is object in datapoints format
      if (Array.isArray(activity)) {
        for (const entry of activity) {
          if (entry.date === targetDate) {
            return true;
          }
        }
      }
    return false;
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
      (sum, dp) => sum + dp.value, 0);
    // console.log(`${cumulativeValue} for ${targetDate}. 
    //   period: ${periodStart.format("MMM D")} - ${periodEnd.format("MMM D")}`);
    return cumulativeValue >= goal?.value;
  }

  const isGoalMetForDate = (targetDate, goal) => {
    if (!goal || !goal.name || !datapoints[goal.name])
      return false;
  
    const startDate = dayjs(goal.start_date);
    const daysSinceStart = targetDate.diff(startDate, "day");
    const periodNumber = Math.floor(daysSinceStart / goal.frequency);
    const periodStart = startDate.add(periodNumber * goal.frequency, "day");
    const periodEnd = periodStart.add(goal.frequency, "day");
  
    // Get all datapoints within the current goal period
    const relevantDatapoints = datapoints[goal.name]?.filter((dp) => {
      const dpDate = dayjs(dp.date);
      return (
        (dpDate.isAfter(periodStart) || dpDate.isSame(periodStart)) &&
        dpDate.isBefore(periodEnd)
      );
    }) || [];
  
    // Compute the cumulative value from relevant datapoints
    const cumulativeValue = relevantDatapoints.reduce((sum, dp) => sum + dp.value, 0);
  
    // Calculate remaining days including targetDate but excluding periodEnd
    const remainingDays = periodEnd.diff(targetDate, "day");
  
    // Find the datapoint for the exact targetDate
    const targetDataPoint = relevantDatapoints.find(dp => dayjs(dp.date).isSame(targetDate));

    if (remainingDays <= 0) {
      return targetDataPoint?.value >= goal.value - cumulativeValue;
    }
  
    // Compute the required amount needed for targetDate
    const requiredAmount = (goal.value - cumulativeValue) / remainingDays;

    return targetDataPoint?.value >= requiredAmount;
  };

  // const cards = Array.from({length: 3}, (i, k) => (
  //   <Card
  //     title={""}
  //     icons={[]}
  //     content={
  //       <div className='checkbox-container'>
  //       </div>
  //     }
  //     width={
  //       "100%"
  //     }
  //   />
  // ));

  const cards = Object.entries(datapoints).map(([name, dps]) => 
    <Card
      title={name}
      icons={[
        <div className='graph-view-switch'>
        📈
        </div>
      ]}
      content={
        <div>

           <div className='progress-container-center'>
              <Gauge
              value={
                datapoints[selectedGoal?.name]?.reduce(
                  (accumulator, currentItem) => {
                    if (
                      (dayjs(currentItem.date).isAfter(periodStart)
                      || dayjs(currentItem.date).isSame(periodStart)) &&
                      dayjs(currentItem.date).isBefore(periodEnd)
                    ){
                      return accumulator + currentItem.value;
                    }
                    return accumulator;
                  }, 0)
              }
              valueMax={selectedGoal?.value}
              width={130}
              height={130}
              text={
                ({ value, valueMax }) => `${value} / ${valueMax}`
                }
              />
          </div>

          <div className='top-graph'>
            <div className='checkbox-container'>
              {
                daysOfWeek.map((day, index) => (
                  <div key={index}
                  style={{
                    backgroundColor: 
                      isDayActive(dps, day.format("YYYY-MM-DD"))?
                      colorPalette[day.diff('1980-01-01', 'day') % 3] :
                      '#D9D9D9'
                  }}
                  className="progress-block-recent-activities">
                    {
                      isGoalMetForDate(day, goals.find(g => g.name === name))? "✔️" : ""
                    }
                  </div>
                ))
              }
            </div>
          </div>
          <div className='bottom-graph'>
            {daysOfWeek.map((day, index) => (
              <div key={index} className="day"> {day.format("ddd")} </div>
            ))}
          </div>
        </div>
      }

      sx={
        Object.entries(datapoints).length <= 3 ? { flex: 1, minWidth: 0 } : { width: "calc(100% / 3)", flexShrink: 0 }
      }
    />
  );

    // Function to navigate weeks
    const handlePrevWeek = () => setSelectedDate(selectedDate.subtract(1, "week"));
    const handleNextWeek = () => setSelectedDate(selectedDate.add(1, "week"));

  return (
    <div className='app gradient'>
      <TopBar loggedIn = {Boolean(user)} onProfileClick={userSignOut}/>
      <div className='home-grid'>
        <div
          id='left-card'
          className='left-container'
        >
          <Card 
            title={selectedDate.format('MMM YYYY').toString()}
            icons={[
              <div onClick={handlePrevWeek}>⬅️</div>,
              <div onClick={handleNextWeek}>➡️</div>
            ]}
            content={
              <div className='card-cont week-cal'>
                <WeekCalendar
                  chosenDate={selectedDate}
                  onDateChange={(newSelectedDate) => setSelectedDate(newSelectedDate)}
                />
              </div>
            }
            fontSize={"15pt"}
            />
            <Card 
            title="Monthly View"
            icons={[]}
            content={
              <div className='card-cont'>
              </div>
            }
            fontSize={"15pt"}
            />
            <Card 
            title="Current Goals"
            icons={[]}
            fontSize={"15pt"}
            content={
              <div className='card-cont goal-list'>

              </div>
            }
          />
        </div>

        <div className='contents-container'>
          <div className="top-flex-container">
    
            {
              cards.map((card, index) => (
                {...card, index:index}
              ))
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
                      {
                        /*
                        JSON.stringify(goals)
                        */
                      }
                      {
                        JSON.stringify(datapoints)
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

