"use client";
import React, { useState, useEffect } from 'react';
import '../../styles/journalsLoading.css';
import TopBar from '../UI/TopBar.jsx';
import '../../styles/BgTopBar.css';
import Image from 'next/image';
import { UserAuth } from '../context/AuthContext';


export default function Loading() {
  const {
        user, authLoading, authError,
        userSignIn, userSignUp,
        googleSignIn,
        userSignOut
      } = UserAuth();
  const userId = user?.uid; 
  

  return (
    <div className='app'>
      <TopBar loggedIn = {Boolean(user)} onProfileClick={userSignOut}/>
      
      <div className='app-grid'>
        <div className='title-container'>
            <div className='title'>
                <p>Welcome<br></br>Reading Journal</p>
            </div>
        </div>
        <div className='content-container'>
          <div className='main-icon'>
            <Image 
              className='book-icon' 
              src="/assets/book.svg" 
              alt="book-icon" width="105" height="105"
            />
          </div>
          
          <div className='loading-dots'>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

    </div>
  );
}
