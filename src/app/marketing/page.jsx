'use client'
import { React, useState, useEffect, useRef } from 'react';
import '../../styles/BgTopBar.css';
import '../../styles/Marketing.css';
import TopBar from '../UI/TopBar.jsx';
import PhoneDemo from './PhoneDemo.jsx';
import Image from 'next/image';
import BottomPage from './BottomPage.jsx';


export default function Page() {
  // dynamic transparency
  const [transparency, setTransparency] = useState(0); // Initial transparency value
  const [scrollPosition, setScrollPosition] = useState(0);
  const demoRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false); // for phone demo page
  const [scrollY, setScrollY] = useState(0); // scroll position for phone demo
  const phoneDemoScrollUnlockPosition = 2000;

  const handlePhoneDemoScroll = (e) => {
    if (!canScroll) {
      e.preventDefault(); // Block the scroll event
      e.stopPropagation(); // Prevent propagation to parent elements
    }

    if (demoRef.current) {
      setScrollY(demoRef.current.scrollTop); // Get scroll position from the wrapper
    }
  }

  useEffect(() => {
    // observe phone demo interaction
    const demoRefCurr = demoRef.current;

    if (demoRefCurr) {
      demoRefCurr.addEventListener('scroll', handlePhoneDemoScroll);
    }

    // handles dynamic transparency
    const handleScroll = () => {
      
      const elements = document.querySelectorAll('[class^=dynamic-transparency-]');
      setScrollPosition(window.scrollY);
      setCanScroll(window.scrollY >= phoneDemoScrollUnlockPosition);
      // console.log(window.scrollY);
      

      const viewportHeight = window.innerHeight;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const scrollPosition = rect.top;

        const transparencyValue = Math.min((1 - scrollPosition / (viewportHeight) + 0.1 ), 1);
        
        const classParts = element.className.split(' ').find(a => a.includes("dynamic-transparency")).split('-');

        // Set the transparency (opacity) between 0 and 1
        setTransparency(transparencyValue);
        
        element.style.color = `rgba(
          ${classParts[classParts.length - 3]}, 
          ${classParts[classParts.length - 2]}, 
          ${classParts[classParts.length - 1]}, 
          ${transparencyValue})`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Cleanup on component unmount
    return () => {
      if (demoRefCurr) {
        demoRefCurr.removeEventListener('scroll', handlePhoneDemoScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  });
  
  return (
    <div className='app' style={{ display: 'flex', flexDirection:'column', height: '3000px' }}>

      <div className='top-bar-wrapper' style={{zIndex: 20}}>
        <TopBar className='dynamic-transparency-255-0-0' />
      </div>

      <div className="page gradient">
  
        <div style=
          {{position:"absolute",
            zIndex: 1,
            width: 686,
            height: 192,
            color: 'white',
            fontSize: 96,
            fontFamily:['SF Pro', 'Arial'],
            fontWeight: '860',
            bottom: '2em',
            margin:"auto auto auto 3%",
            wordWrap: 'break-word'}}>
          A New Way to Track Your Goals
        </div>
  
        <Image style={{
          display: "block",
          position: "flex",
          margin:"auto 0 0 auto",
          paddingRight: "0",
          color: "transparent"}} 
          width={1000} height={730} src="/assets/hand-removebg.png" />
      
      </div>

      <div style={{
        display: 'flex',
        width: '100vw',
        height:"100px",
        padding: "2vh 10vw",
        background: 'white',
        flexDirection: 'column',
        justifyContent:'center',
        gap: 5
        }}>

        <div style={{
          color: '#1E1E1E',
          fontSize: 24,
          fontFamily: ['Inter', 'Arial'],
          fontWeight: '600',
          wordWrap: 'break-word'}}>
          Create, Track, and Improve
        </div>

        <div style={{
          color: '#757575',
          fontSize: 20,
          fontFamily: ['Inter', 'Arial'],
          fontWeight: '400',
          wordWrap: 'break-word'}}>
          Dedicated to providing a new way to self betterment and fulfillment
        </div>

      </div>

      <div className="page" style={{
        height: "1200vh",
        background: 'linear-gradient(180deg, #3F72FC 0%, #C9D9A1 50%, #B3E8FE 100%)',
        border: 'red dashed 2px'
      }}>

      <div className="poster-wrapper">
        <div className="poster">
          <div className="dynamic-transparency-255-255-255" style={{
            fontSize: 55,
            fontFamily: 'SF Pro',
            fontWeight: '700',
            wordWrap: 'break-word'}}>
            It Feels Great to Work on Yourself
          </div>
          <Image style={{alignSelf:"auto"}} width={610*0.8} height={521*0.8} src="/assets/guyWorkingOut.png"></Image>
          <div className="text-content-heading">
            <div style={{color: 'white', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>
              Strengthen, Challenge, Evolve
            </div>
            <div style={{color: '#090909', fontSize: 20, fontFamily: 'Inter', fontWeight: '400',wordWrap: 'break-word'}}>
              Log weight, time and record consistency
            </div>
          </div>
        </div>
          
        <div className="poster">
          <div className="dynamic-transparency-255-255-255" style={{
            fontSize: 55,
            fontFamily: 'SF Pro',
            fontWeight: '700',
            wordWrap: 'break-word'}}>
            Monitor Habits, Elevate Your Reading
          </div>
          <Image style={{alignSelf:"auto"}} width={610} height={521*0.8} src="/assets/girlReading.png"></Image>
          <div className="text-content-heading">
            <div style={{color: 'white', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>
            Expand Your Knowledge!
            </div>
            <div style={{color: '#090909', fontSize: 20, fontFamily: 'Inter', fontWeight: '400',wordWrap: 'break-word'}}>
            Start with 15 min of reading to increase your knowledge
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        width: '100vw',
        height: '100px',
        padding: "2vh 10vw",
        background: 'white',
        flexDirection: 'column',
        justifyContent:'center',
        gap: 5
        }}>

        <div style={{
          color: '#1E1E1E',
          fontSize: 24,
          fontFamily: ['Inter', 'Arial'],
          fontWeight: '600',
          wordWrap: 'break-word'}}>
          Journal Entries Catered to You
        </div>

        <div style={{
          color: '#757575',
          fontSize: 20,
          fontFamily: ['Inter', 'Arial'],
          fontWeight: '400',
          wordWrap: 'break-word'}}>
          Create your own Personalized Journal
        </div>
      </div>

      <div className="motto-wrapper">
        <div className='dynamic-transparency-255-255-255' style={{
          width: "100%",
          height: "2em",
          fontSize: 96,
          fontFamily: ['SF Pro', 'Arial'],
          fontWeight: '860',
          alignContent:"center",
          wordWrap: 'break-word'}}>
          Create, Reflect, Achieve
        </div>
      </div>

      <div
        ref={demoRef}
        onScroll = {handlePhoneDemoScroll}
        style={{
          overflowY: canScroll ? 'auto' : 'hidden',
          pointerEvents: canScroll ? 'auto' : 'none',
          height: '110vh'
        }}
      >

        <PhoneDemo scrollY = {scrollY} />
      </div>

      

      {/*page ends*/}
      </div>
      
      <BottomPage />

      
    </div>
  );
}

