"use client"
import React from 'react';
import '../../styles/Dashboard.css';
import NavBar from './NavBar.jsx';
import RecentActivity from '../components/RecentActivityCard.jsx';
import Image from 'next/image';

export default function page() {


  return (
  <div className='app'>
    <nav className="top-bar">
      <div className="logo">
        <Image src="/assets/Logo.svg" alt="icon" width="50" height="50"/>

        <span className='brand'> 
        Journally
        </span>
      </div>

      <NavBar />
      
      <Image className="user-icon" src="/assets/UserProfile.png" height="50" width="50" alt='User Profile'/ >


    </nav>

    <div className='contents-container'>
      <RecentActivity/>
    </div>
    
  </div>
  );
}


