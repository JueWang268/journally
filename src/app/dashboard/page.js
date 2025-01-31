"use client"
import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import TopBar from '../UI/TopBar.jsx';
import '../../styles/BgTopBar.css';
import Card from "../UI/Card/CardDisplay.jsx";
import RecentActivity from './RecentActivityCard.jsx';
import Image from 'next/image';
import Calendar from '../UI/Calendar/Calendar';
import FriendsList from '../UI/FriendsList/FriendsList';
import dayjs from "dayjs";
import useGoals from "../hooks/useGoals";
import useDatapoints from "../hooks/useDataPoints";
import dayAbbreviationToNumber from "../utils/daysNums";

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
  const [selectedGoal, setSelectedGoal] = useState({name:"1"});

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

  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    selectedDate?.subtract(6 - index, 'day')
  );

  const goalsIn = (cat) => {
    return goals.filter(g => g.category === cat);
  }

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
          <Card title="Recent Acvitities" 
          icons={[
            [
              <Image 
                className='dropdown-icon' style={{cursor:"pointer"}} 
                src="/assets/icons/dropdown-icon.svg" 
                alt="dropdown-icon" width="54" height="54"
              />,
              <Image className='menu-icon' style={{cursor:"pointer"}}
                src="/assets/icons/menu-icon.svg" alt="menu-icon" width="40" height="40"/>
            ]
          ]} 
          content={
            <div className='graph-container'>
            <div className='card-dates horizontal'>
              <div className='last-week'>
                <h2 className='date-title'>From</h2>
                <p className='date'>
                  {selectedDate.subtract(1, "week").format("ddd MMM DD")}
                </p>
              </div>
                
              <div className='yesterday'>
                <h2 className='date-title'>To</h2>
                <p className='date'>
                  {selectedDate.format("ddd MMM DD")}
                </p>
              </div>
            </div>
            
            <div style={{display: "flex", height: 100, paddingBottom: "5px"}}>
              <div>
                <Gauge value={20} height={100} width={100} margin="auto" />
              </div>
              <p style={{alignContent: "center"}}>Goal Completed</p>
            </div>
            <div>
              <div className='top-graph'>
                <div className='y-axis'></div>
                <div className='checkbox-container'>
                  {daysOfWeek.map((day, index) => (
                    <div key={index}
                    style={{backgroundColor: colorPalette[day.diff('1980-01-01', 'day') % 3]}}
                    className="progress-block-recent-activities">
                      {index % 2 === 1? "✔️": ""}
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
                    src="/assets/icons/menu-icon.svg" alt="menu-icon" width="40" height="40"/>
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
                            {selectedDate.subtract(selectedGoal?.frequency, "day").format("MMM DD")}
                          </p>
                        </div>
                        <div>
                          <h2 className='date-title'>
                            To
                          </h2>
                          <p className='date'>
                            {selectedDate.format("MMM DD")}
                          </p>
                        </div>
                      </div>
                      <div className='progress-container-center'>
                        <Gauge
                        value={
                          datapoints[selectedGoal?.name]?.reduce(
                            (accumulator, currentItem) => {
                              if (
                                selectedDate.subtract(selectedGoal?.frequency + 1, "day")
                                  .isBefore(
                                    dayjs(currentItem.date)) &&
                                dayjs(currentItem.date).isBefore(
                                  selectedDate + 1
                                )
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
                          <div className='progress-block'> ✔️ </div>
                          <div> {`${selectedGoal?.name} for ${selectedGoal?.value}
                            ${selectedGoal?.unit || "units"}
                            every ${selectedGoal?.frequency} days`} </div>
                        </div>
                      </div>
                      <div className="goals-list">
                        {goalsIn("workout").map(
                          (g, i) => 
                            <div className="progress-goal" onClick={
                              () => {
                                console.log(g);
                                setSelectedGoal(g);
                              }
                              }>
                              <div className='progress-block' 
                              style= {{backgroundColor:colorPalette[i % 3]}}>
                                {g.name === selectedGoal.name ? "✔️" : ""}
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
                      className='dropdown-icon' style={{cursor:"pointer"}}
                      src="/assets/icons/dropdown-icon.svg"
                      alt="dropdown-icon" width="34" height="34"
                    />
                  ]}
                  content={
                    <div style={{height: "30vh", 
                      width: "200px",
                      wordWrap: "break-word",
                      overflow:"scroll", 
                      fontFamily:"monospace"}}>
                      {/*JSON.stringify(goals)*/}
                      {
                        JSON.stringify(goals)
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

