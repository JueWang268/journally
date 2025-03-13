"use client"
import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
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

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

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

  // function numGoalsCompletedBetween(day1, day2) {
  //   const startDate = dayjs(day1);
  //   const endDate = dayjs(day2);
  
  //   let completedGoals = 0;
  
  //   goals.forEach((goal) => {
  //     let isCompleted = false;
  
  //     // Iterate through each day in the range [day1, day2]
  //     for (
  //       let currentDate = startDate;
  //       currentDate.isBefore(endDate) || currentDate.isSame(endDate);
  //       currentDate = currentDate.add(1, "day")
  //     ) {
  //       // Check if the goal is met for the current date
  //       if (isGoalMet( currentDate, goal )) {
  //         isCompleted = true;
  //         break;
  //       }
  //     }
  
  //     // If the goal is completed within the range, increment the count
  //     if (isCompleted) {
  //       completedGoals++;
  //     }
  //   });
  
  //   return completedGoals;
  // }

  return (
    <div className='app'>
      <TopBar loggedIn = {Boolean(user)} onProfileClick={userSignOut}/>

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
                <span className='accordion-heading'>Calendar</span>
              </AccordionSummary>
              <div className="accordion-underline"></div>
            </div>

            <AccordionDetails
              sx={{
                display: "flex",
                alignContent: "center",
                padding: "0",
                height: "38vh",
                // border: "red solid 1px"
              }}>

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
          <Card title="Recent activities"
          icons={[
            <Image 
              className='dropdown-icon' style={{cursor:"pointer"}} 
              src="/assets/icons/dropdown-icon.svg" 
              alt="dropdown-icon" width="30" height="30"
            />,
            <Image className='menu-icon' style={{cursor:"pointer"}}
              src="/assets/icons/menu-icon.svg" alt="menu-icon" width="30" height="30"/>
          ]}
          onClick={
            () => {
              router.push("/data_tracking");
            }
          }
          content={
            <div className='graph-container'>
            <div className='card-dates horizontal'>
              <div className='last-week'>
                <h2 className='date-title'>From</h2>
                <p className='date'>
                  {selectedDate.subtract(6, "day").format("ddd MMM D")}
                </p>
              </div>
                
              <div className='yesterday'>
                <h2 className='date-title'>To</h2>
                <p className='date'>
                  {selectedDate.format("ddd MMM D")}
                </p>
              </div>
            </div>
            
            <div style={{display: "flex", height: 100, paddingBottom: "5px"}}>
              <div>
                <Gauge 
                  value={
                    daysOfWeek.reduce(
                      (acc, day) => {
                        if (goals.some( g => isGoalMet(day, g))){
                          return acc + 1;
                        }
                        return acc;
                      },0
                    )
                  }
                  valueMax={7}
                  height={100}
                  width={100}
                  text={({ value, valueMax }) => `${(value/valueMax*100).toFixed(0)}%`}
                  margin="auto" />
              </div>
              <p style={{alignContent: "center"}}>days with any goal completed</p>
            </div>
            <div>
              <div className='top-graph'>
                <div className='y-axis'></div>
                <div className='checkbox-container'>
                  {daysOfWeek.map((day, index) => (
                    <div key={index}
                    style={{
                      // recent activity will be colored
                      // if any activity is done on the date
                      backgroundColor: 
                        isDateInActivities(datapoints, day.format("YYYY-MM-DD"))?
                        colorPalette[day.diff('1980-01-01', 'day') % 3] :
                        '#D9D9D9'
                    }}
                    className="progress-block-recent-activities">
                      {
                       goals.some( g => isGoalMet(day, g))? "✔️" : ""
                      }
                    </div>
                  ))}
                </div>
              </div>
              <div className='bottom-graph'>
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="day">{day.format("ddd")}</div>
                ))}
              </div>
            </div>
          </div>
          }
          />

          <div className="bottom-flex-container">
              <div className = "progress-card">
                <Card
                  title={`Progress on ${selectedGoal?.category}`}
                  icons={[
                    <Image className='menu-icon' style={{cursor:"pointer"}}
                    src="/assets/icons/menu-icon.svg" alt="menu-icon" width="30" height="30"/>
                  ]}
                  content={
                  <div>
                    <div className='progress-container'>
                      <div className='card-dates'>
                        <div>
                          <h2 className='date-title'>
                            From
                          </h2>
                          <p className='date'>
                            {periodStart?.format("MMM D")}
                          </p>
                        </div>
                        <div>
                          <h2 className='date-title'>
                            To
                          </h2>
                          <p className='date'>
                            {periodEnd?.subtract(1,"day").format("MMM D")}
                          </p>
                        </div>
                      </div>
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
                        <div className='progress-goal'>
                          <div className='progress-block'> 
                            {isGoalMet(selectedDate, selectedGoal)? "✔️": ""}
                          </div>
                          <div> {`${selectedGoal?.name} for ${selectedGoal?.value}
                            ${selectedGoal?.unit || "unit(s)"}
                            every ${selectedGoal?.frequency} day(s)`} </div>
                        </div>
                      </div>
                      <div className="goals-list">
                        {goalsIn("workout").map(
                          (g, i) => 
                            <div className="progress-goal" onClick={
                              () => {
                                setSelectedGoal(g);
                              }
                              }>
                              <div className='progress-block' 
                              style= {{backgroundColor:colorPalette[i % 3]}}>
                                {g.name === selectedGoal?.name ? "✔️" : ""}
                              </div>
                              <div className='progress-name'> {g.name} </div>
                            </div>
                        )}
                      </div>
                    </div>
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
                      alt="add-icon" width="30" height="30"
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

