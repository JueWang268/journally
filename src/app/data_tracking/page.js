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
import NewGoalModal from './NewGoalModal';

import { UserAuth } from '../context/AuthContext.js';
import { useRouter } from 'next/navigation';


import { Gauge, PieChart } from '@mui/x-charts/';
import { LineChart } from '@mui/x-charts/LineChart';


export default function Page() {
  const {
    user, authLoading, authError,
    userSignIn, userSignUp,
    googleSignIn,
    userSignOut
  } = UserAuth();
  const router = useRouter();
  let newNameCounter = 0;

  const USER_ID = user?.uid;
  const {datapoints, 
    loading_d, 
    error_d,
    createDatapoint,
    editDp,
    editDpGroupName,
    removeDp,
    removeCategory,
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
  // const [selectedGoal, setSelectedGoal] = useState(null);

  // Monitor loading states
  useEffect(() => {
    if (!loading_g && !loading_d) {
      setIsLoading(false); // Both hooks have finished loading
      // Set selectedGoal only if goals is not empty
      // setGoals(goals);
    } else {
      setIsLoading(true);
    }
  }, [loading_g, loading_d, goals, setGoals]);

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [editingDate, setEditingDate] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showGoalModal, setShowGoalModal] = useState(false);
  
  const getChartData = (categories) => {
    
    const last7Days = Array.from({ length: 7 }, (_, i) => selectedDate.subtract(6, "day").add(i, "day"));
    const y = [];
    for (let category of categories) {
      const categoryData = datapoints[category] || [];
      const dataMap = categoryData.reduce((acc, dp) => {
        acc[dp.date] = dp.value;
        return acc;
      }, {});
      y.push({label: category, data: last7Days.map(date => dataMap[date.format("YYYY-MM-DD")] || 0)});
    }
  
    return {
      xAxisData: last7Days,
      yAxisData: y
    };
  };
  
  const { xAxisData, yAxisData } = getChartData(Object.keys(datapoints));
  
  const handleEdit = (day, goalname, prefill) => {
    setEditingDate(day.format("YYYY-MM-DD"));
    setEditingGoal(goalname);
    setInputValue(prefill); // Prefill with current value
  };

  const handleSubmitEdit = (day, dpname, dps) => {
    const existingDp = dps.find(d => d.date === day.format("YYYY-MM-DD"));

    if (!existingDp || isNaN(inputValue)) return;

    if (parseFloat(inputValue) <= 0) {
      removeDp(existingDp.id);
    }
    else {
      editDp(existingDp.id, dpname, parseFloat(inputValue), day.format("YYYY-MM-DD"));
    }
    setEditingDate(null); // Exit edit mode
    setInputValue(""); // Reset input
  };

  
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

  const getGoalPeriod = (targetDate, goal) => {
    if (!goal || !goal.start_date || !goal.frequency) return [null, null];
    const startDate = dayjs(goal.start_date);
    const daysSinceStart = targetDate.diff(startDate, "day");
    const periodNumber = Math.floor(daysSinceStart / goal.frequency);
    const periodStart = startDate.add(periodNumber * goal.frequency, "day");
    const periodEnd = periodStart.add(goal.frequency, "day");
    return [periodStart, periodEnd];
  };
  
  const isGoalMetForDate = (targetDate, goal) => {
    if (!goal || !goal.name || !datapoints[goal.name])
      return false;
  
    const targetDataPoint = datapoints[goal.name].find(dp => dp.date === targetDate);

    return targetDataPoint?.value >= goal.value/goal.frequency;
  };

    // Functions to navigate weeks
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
            height={"15vh"}
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
            icons={[
              <Image
                onClick={() => setShowGoalModal(true)}
                className='add-icon'
                src="/assets/icons/add-icon.svg"
                alt="add-icon" width="34" height="34"
              />
            ]}
            fontSize={"15pt"}
            content={
              <div className='card-cont goal-list'>
                {
                  goals ? 
                  goals.map(g =>
                    <div style={{padding: "1em"}}>
                      {g.name}: {g.value} {g.unit || "units"} every {g.frequency === 1? "day": g.frequency + " days"}
                    <button style={{float: "right"}}>
                     Edit
                    </button>
                    </div>
                  ) :
                  <div>
                    No goals set yet.
                    <div>
                      <button>
                        Start one now!
                      </button>
                    </div>
                  </div>
                }
              </div>
            }
          />
        </div>

        <div className='contents-container'>
        <div className="card-wrapper">
        {Object.entries(datapoints).map(([name, dps]) => (
          <Card
            title={name}
            icons={[
              <div className='graph-view-switch'>➖</div>,
              <div className='graph-view-switch'>➕</div>,
              <div className='graph-view-switch' onClick={() => removeCategory(name)}>🗑️</div>
            ]}
            content={
              <div>
                <div className='progress-container-center'>
                  {
                    goals.find(g => g.name === name)? 
                      <div className='card-goal-display'>
                        <div style={{flex: 1}}>
                        <Gauge
                          value={
                            dps.reduce(
                              (accumulator, currentItem) => {
                                if (
                                  (dayjs(currentItem.date).isAfter(getGoalPeriod(selectedDate, goals.find(g => g.name === name))[0])
                                  || dayjs(currentItem.date).isSame(getGoalPeriod(selectedDate, goals.find(g => g.name === name))[0])) &&
                                  dayjs(currentItem.date).isBefore(getGoalPeriod(selectedDate, goals.find(g => g.name === name))[1])
                                ){
                                  return accumulator + Number(currentItem.value);
                                }
                                return accumulator;
                              }, 0)
                          }
                          valueMax={goals.find(g => g.name === name)?.value}
                          height={120}
                          text={
                            ({ value, valueMax }) => `${value} / ${valueMax}`
                          }
                        />
                        </div>
                        <div style={{alignContent: "center", flex: 2}}>
                          <div>
                            Goal: {goals.find(g => g.name === name).value} {goals.find(g => g.name === name).unit || "units"} every {goals.find(g=>g.name === name).frequency === 1? "day": goals.find(g=>g.name === name).frequency + " days"}
                          </div>
                          <div>
                            From {
                              getGoalPeriod(selectedDate, goals.find(g => g.name === name))[0]
                                .format("ddd MMM DD")} to {
                              getGoalPeriod(selectedDate, goals.find(g => g.name === name))[1].subtract(1, "day").format("ddd MMM DD")
                            }
                          </div>
                        </div>
                      
                      </div>: 
                      <div style={{height: 120}}>
                        No goals set yet. 
                        <div>
                          <button>
                            Start one now!
                          </button>
                        </div>
                      </div>
                  }
                  
                  </div>
      
                <div className='day-graph'>
                  <div className='checkbox-container'>
                    {
                      daysOfWeek.map((day, index) => (
                        <div key={index}
                          onClick={() => {
                            if (!goals.find(g => g.name === name)){
                              if (!isDayActive(dps, day.format("YYYY-MM-DD"))){
                                createDatapoint(USER_ID, name, 0, day.format("YYYY-MM-DD"));
                              }
                              handleEdit(day, name, dps.find(d => d.date === day.format("YYYY-MM-DD"))?.value || "");
                            }
                            else if (isDayActive(dps, day.format("YYYY-MM-DD"))){
                              if (isGoalMetForDate(day.format("YYYY-MM-DD"), goals.find(g => g.name === name))){
                                handleEdit(day, name, dps.find(d => d.date === day.format("YYYY-MM-DD"))?.value || "");
                              }
                              else{
                                editDp(dps.find(d => d.date === day.format("YYYY-MM-DD")).id,name, 
                                goals.find(g => g.name === name).value / goals.find(g => g.name === name).frequency, day.format("YYYY-MM-DD"));
                              }
                            }
                            else {
                              createDatapoint(USER_ID, name, goals.find(g => g.name === name).value / goals.find(g => g.name === name).frequency, day.format("YYYY-MM-DD"));
                            }
                          }}
                          style={{
                            backgroundColor: 
                              isDayActive(dps, day.format("YYYY-MM-DD"))?
                              colorPalette[day.diff('1980-01-01', 'day') % 3] :
                              '#D9D9D9',
                          }}
                          className="progress-block-recent-activities">
                            {(editingDate === day.format("YYYY-MM-DD") & editingGoal === name) ? (
                              <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onBlur={() => handleSubmitEdit(day, name, dps)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleSubmitEdit(day, name, dps);
                                }}
                                autoFocus
                              />
                            ) : isGoalMetForDate(day.format("YYYY-MM-DD"), goals.find(g => g.name === name)) ? (
                              "✔️"
                            ) : (
                              ""
                            )}
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
              Object.entries(datapoints).length <= 3
                ? { flex: 1, minWidth: 0, maxWidth: "40%" }
                : { width: "calc(100% / 3)", flexShrink: 0 }
            }

            onTitleClick={editDpGroupName}
          />
        ))}
      
        <div
          className='add-activity-button'
          onClick={() => {
            createDatapoint(
              USER_ID,
              (() => {
                let i = 0, base = "New Category";
                while (Object.keys(datapoints).includes(i ? `${base} ${i}` : base)) i++;
                return i ? `${base} ${i}` : base;
              })(),
              0,
              dayjs().format("YYYY-MM-DD")
            );
          }}
        >
          <Image
            className='add-icon'
            src="/assets/icons/add-icon.svg"
            alt="add-icon"
            width="34"
            height="34"
          />
        </div>
      </div>
          <div className="bottom-flex-container">
              <div className = "progress-card">
                <Card
                  title={`Daily Data Overview`}
                  icons={[
                    <div className='graph-view-switch'>📈</div>
                    ,
                    <Image className='menu-icon' style={{cursor:"pointer"}}
                    src="/assets/icons/menu-icon.svg" alt="menu-icon" width="40" height="40"/>
                  ]}
                  content={
                    <div style={ {height:"30vh"} }>
                      <LineChart
                        xAxis={[{ data: xAxisData, valueFormatter: d => dayjs(d).format("MMM DD"),scaleType: "point" }]}
                        series={yAxisData}
                      />
                    </div>
                  }
                />
              </div>
              <div className = "new-entry-card">
                <Card
                  title="New Entry"
                  icons= {[
                    <Image
                      className='add-icon' style={ {cursor:"pointer"} }
                      src="/assets/icons/add-icon.svg"
                      alt="add-icon" width="34" height="34"
                    />
                  ]}
                  content={
                    <div style={{height: "30vh",
                      width: "240px",
                      wordWrap: "break-word",
                      overflow:"scroll", 
                      fontFamily:"monospace"}}>
                      {
                        JSON.stringify(goals)
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

      <NewGoalModal
        userId = {USER_ID}
        isOpen={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        onCreateGoal={setNewGoal}
        categories={[...new Set(goals.map(goal => goal.category).filter(Boolean))]}
      />
    </div>
  );
}

