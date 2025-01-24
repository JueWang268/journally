"use client"
import React, { useState, useEffect } from 'react';
import '../../styles/Dashboard.css';
import TopBar from '../UI/TopBar.jsx';
import '../../styles/BgTopBar.css';
import Card from "../UI/Card/CardDisplay.jsx";
import RecentActivity from '../components/RecentActivityCard.jsx';
import Image from 'next/image';
import Calendar from '../UI/Calendar/Calendar';
import FriendsList from '../UI/FriendsList/FriendsList';
import dayjs from "dayjs";
import useGoals from "../hooks/useGoals";

import { UserAuth } from '../context/AuthContext.js';
import { useRouter } from 'next/navigation';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PieChart } from '@mui/x-charts/PieChart';

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
  };
  const colorPalette = ["#C8EFB8","#E1E2FF","#F2C595"];
  const placeholder_goals = ["Goal 1", "Goal 2", "next goal", "yet another goal with a long name", "more goal", "this goal"];

  const friends = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

  const [selectedFriends, setSelectedFriends] = useState([]);

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
          <RecentActivity />

          <div className="flex-container">
              <Card
                title="Progress on {Goal Category}"
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
                <div>
                  <div className='progress-container'>
                    <div className='card-dates'>
                      <div>
                        <h2 className='date-title'>
                          From
                        </h2>
                        <p className='date'>
                          {selectedDate.subtract(1, "week").format("MMM DD")}
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
                      <PieChart className='progress-chart'
                      colors={["#E1E2FF", "#DDD"]}
                      slotProps= {{ legend: { hidden: true } }}
                      margin={{left: 0, right: 0}}
                      series={[
                        {arcLabel: 
                          (item) => 
                            `${item.label === 'Progress'? item.value + "%": ""}`,
                          arcLabelRadius: '0%',
                          innerRadius: 30,
                          data: [
                            { id: 2, value: 20, label: 'Progress' },
                            { id: 1, value: 15, label: 'Rest of goal' },]
                        }
                      ]}
                      width={300}
                      height={100}
                      />
                      <div className='progress-goal'>
                        <div className='progress-block'> ✔️ </div>
                        <div> recent datapoint completed or goal?</div>
                      </div>
                    </div>
                    <div className="goals-list">
                      {placeholder_goals.map(
                        (g, i) => 
                          <div className="progress-goal" 
                            >
                            <div className='progress-block' 
                            style= {{backgroundColor:colorPalette[i % 3]}}>
                            </div>
                            <div className='progress-name'> {g} </div>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
                }
                width = {"46vw"}
              />
              <Card
                title="New Entry"
                icons= {[
                  <Image
                    className='dropdown-icon' style={{cursor:"pointer"}}
                    src="/assets/icons/dropdown-icon.svg"
                    alt="dropdown-icon" width="54" height="54"
                  />
                ]}
                content={
                  <div>{JSON.stringify(goals)}</div>
                }
                width={"16vw"}
              />

          </div>
            
        </div>

      </div>
    </div>
  );
}

