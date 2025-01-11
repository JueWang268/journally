'use client'
import { React, useState, useEffect, useRef } from 'react';
import '../../styles/Marketing.css';
import Image from 'next/image';

export default function BottomPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleSignUp = () => {
    // Simple email validation (you can adjust the regex as needed)
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (isValid) {
      setMessage("Thank you for signing up! Look out for exciting updates in your inbox.");
      setIsEmailValid(true);
      setEmail('');
    } else {
      setMessage("Please enter a valid email address.");
      setIsEmailValid(false);
    }
  };

  return (
    <div className='bottom-page'>
      <div style={{
        display: 'flex',
        margin: '0.4em auto',
        width: 443, 
        color: 'white', 
        fontSize: 65, 
        fontFamily: 'SF Pro, Arial', 
        fontWeight: '700', 
        wordWrap: 'break-word'}}>
          Stay Updated
      </div>

      <div className="testimonials-emailbox-wrapper">
        <div style={{
          width: 375,
          height: 344, 
          margin: "auto 1vw",
          background: '#9DB8BE',
          borderRadius: 20}}>
          <div className="side-text">
            Sign up to be the first to learn about
            updates. We respect your privacy and will
            never share your information with any third-party
            vendors.
          </div>
          <div className='side-text' 
            style={{
              display: 'flex', 
              alignItems:'center',
              justifyContent: 'center',
              margin: "4em auto 0 auto",
              gap: 8
            }}>
            <Image src="/assets/Logo.svg" alt="icon" width="40" height="40"/>
            <span>- The Team</span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: 375, 
          flex: 1,
          background: "linear-gradient(180deg, #507EEF 0%, #C2CF98 50%, #9298F7 100%)",
          height: 344, 
          margin: "auto 1vw",
          borderRadius: 20}}>

          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={
              e => {
                if (e.key === 'Enter') {
                  handleSignUp();
                }
              }
            }
            style={{
              width: "70%",
              padding: '0 1em',
              margin:"1em auto",
              fontSize: '23pt',
              lineHeight: '28pt',
              height: '28pt',
              textAlign: 'center',
              borderRadius: '16px', 
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25);',
              border: `1px solid ${isEmailValid ? '#ccc' : 'red'}`
            }}
          />

          {message && (
            <div style={{
              color: isEmailValid ? 'white' : 'red',
              fontSize: '16pt',
              textAlign: 'center',
              marginBottom: '1em',
            }}>
              {message}
            </div>
          )}

          <button 
            onClick={handleSignUp}
            style={{
            margin: 'auto auto 1em auto',
            width: '9em', 
            height: '2em', 
            fontSize: '20pt',
            color: 'white',
            background: '#8E94FD', 
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
            borderRadius: 25,
            cursor: 'pointer',
            border: 'none',
            transition: 'box-shadow 0.1s ease'
            }} 
            onMouseDown={
              (e) => 
                e.target.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.05)'
            }
            onMouseUp={
              (e) => 
                e.target.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)'
            }
            >

            Sign Up
          </button>


        </div>
        <div style={{
          width: 375, 
          height: 344, 
          margin: "auto 1vw",
          background: '#9DB8BE',
          borderRadius: 20}}>
            <div  className='side-text'>
              Our platform helps you track your 
              fitness, reading, and personal growth by 
              recording key metrics and progress. Join a supportive 
              community where you can share achievements, stay 
              motivated, and grow together.
            </div>
        </div>
      </div>

      <div className="logo">
        <Image src="/assets/Logo.svg" alt="icon" width="50" height="50"/>
        <span className='brand'> 
        Journally
        </span>
      </div>

      <footer
        style={{
          width: "100vw",
          height: 100, 
          paddingTop: 32, 
          paddingBottom: 160,
          paddingLeft: 32, 
          paddingRight: 32, 
          background: 'linear-gradient(0deg, rgba(127, 127, 127, 0.40) 100%, rgba(61, 61, 61, 0.50) 100%)', 
          borderTop: '1px #D9D9D9 solid', 
          justifyContent: 'flex-start', 
          alignItems: 'flex-start', 
          gap: 16, 
          display: 'inline-flex'
        }}
      >

      <div className='footer-column'
        style ={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
        
        <div style={{display: "flex"}}>
          <Image className='social-media-icon' style={{cursor:"pointer"}} src="/assets/XLogo.svg" alt="twitter-icon" width="20" height="20"/>

          <Image className='social-media-icon' style={{cursor:"pointer"}} src="/assets/logo-instagram.svg" alt="instagram-icon" width="20" height="20"/>

          <Image className='social-media-icon' style={{cursor:"pointer"}} src="/assets/logo-you-tube.svg" alt="youtube-icon" width="20" height="20"/>

          <Image className='social-media-icon' style={{cursor:"pointer"}} src="/assets/linked-in.svg" alt="linkedin-icon" width="20" height="20"/>
        </div>

        <div>© 2024 Journally</div>

        <div>All rights reserved</div>

        <div 
          style={{cursor:"pointer"}}>
          <u>Privacy Policy</u>
        </div>

        <div>
          Do Not Share My Personal
          Information
        </div>
      </div>
      <div className='footer-column'>

          <div><b>Menu</b></div>
          <div>Support</div>
      </div>
      <div className='footer-column'>

          <div><b>Contact</b></div>
          <div>About</div>
          <div>Stories</div>

      </div>
      <div className='footer-column'>

        <div><b>Follow</b></div>
        <div>Facebook</div>
        <div>Instagram</div>

      </div>

      </footer>

    </div>
  )
}
