"use client"
import React from 'react';
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
              <Image 
                className='dropdown-icon' style={{cursor:"pointer"}} 
                src="/assets/icons/dropdown-icon.svg" 
                alt="dropdown-icon" width="54" height="54"
              />

              {/* menu */}
              <Image className='menu-icon' style={{cursor:"pointer"}}
                src="/assets/icons/menu-icon.svg" alt="menu-icon" width="40" height="40"/>
            </div>
            
          </div>

        {/*  <div className='card-dates'>
            <div className='last-week'>
              <h2 className='date-title'>Last Week</h2>

              <p className='date'>
                Nov 4th 2024
              </p>
            </div>

            <div className='yesterday'>
              <h2 className='date-title'>Yesterday</h2>
              <p className='date'>
                Nov 9th 2024
              </p>
            </div>
          </div> */}

          <div className='goal-container'>
            <p>Past Week</p>
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