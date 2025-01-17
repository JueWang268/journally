"use client"
import React from 'react';
import '../../styles/RecentActivity.css';
import Image from 'next/image';

export default function page() {

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className='card-container'>
        <div className='card-content'>
        
            <div className='card-header'>
              <h1 className='title'>Recent Activity</h1>
              
              <div className='icons'>
                {/* dropdown */}
                <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 15.5455C9 11.9305 11.9305 9 15.5455 9H38.4545C42.0695 9 45 11.9305 45 15.5455V38.4545C45 42.0695 42.0695 45 38.4545 45H15.5455C11.9305 45 9 42.0695 9 38.4545V15.5455Z" fill="black" fillOpacity="0.15"/>
                  <path d="M15.75 22.5L27 33.75L38.25 22.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                {/* menu */}
                <svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 18.5C0 8.28273 8.28273 0 18.5 0H19.5C29.7173 0 38 8.28273 38 18.5C38 28.7173 29.7173 37 19.5 37H18.5C8.28273 37 0 28.7173 0 18.5Z" fill="#D9D9D9"/>
                    
                    <svg x="7" y="6.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 9V7H21V9H7ZM7 13V11H21V13H7ZM7 17V15H21V17H7ZM4 9C3.71667 9 3.47917 8.90417 3.2875 8.7125C3.09583 8.52083 3 8.28333 3 8C3 7.71667 3.09583 7.47917 3.2875 7.2875C3.47917 7.09583 3.71667 7 4 7C4.28333 7 4.52083 7.09583 4.7125 7.2875C4.90417 7.47917 5 7.71667 5 8C5 8.28333 4.90417 8.52083 4.7125 8.7125C4.52083 8.90417 4.28333 9 4 9ZM4 13C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11C4.28333 11 4.52083 11.0958 4.7125 11.2875C4.90417 11.4792 5 11.7167 5 12C5 12.2833 4.90417 12.5208 4.7125 12.7125C4.52083 12.9042 4.28333 13 4 13ZM4 17C3.71667 17 3.47917 16.9042 3.2875 16.7125C3.09583 16.5208 3 16.2833 3 16C3 15.7167 3.09583 15.4792 3.2875 15.2875C3.47917 15.0958 3.71667 15 4 15C4.28333 15 4.52083 15.0958 4.7125 15.2875C4.90417 15.4792 5 15.7167 5 16C5 16.2833 4.90417 16.5208 4.7125 16.7125C4.52083 16.9042 4.28333 17 4 17Z" fill="#1D1B20"/>
                    </svg>
                </svg>
              </div>
              
            </div>

            <div className='card-dates'>
              <div className='last-week'>
                <h2 className='date-title'>Last Week</h2>
                {/* Place holder date */}
                <p className='date'>Nov 4th 2024</p>
              </div>

              <div className='yesterday'>
                <h2 className='date-title'>Yesterday</h2>
                {/* Place holder date */}
                <p className='date'>Nov 9th 2024</p>
              </div>
            </div>

            <div className='goal-container'>
              <p>Goal Completed</p>
            </div>


            <div className='graph-container'>
              <div className='top-graph'>
                <div className='y-axis'></div>
                <div className='checkbox-container'>
                  {daysOfWeek.map((day, index) => (
                    <div key={index} className="graph-item">
                      <input type="checkbox" className="checkbox" />
                    </div>
                  ))}
                </div>
              </div>
              <div className='bottom-graph'>
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="graph-item">
                    <div className="day">{day}</div>
                  </div>
                ))}
              </div>
            </div>

        </div>
    </div>
  );
}