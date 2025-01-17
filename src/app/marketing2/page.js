"use client";
import React, { useState, useEffect, useRef } from "react";
import "../../styles/BgTopBar.css";
import '../../styles/Marketing2.css';
import TopBar from "../UI/TopBar.jsx";
import PhoneDemo from "./PhoneDemo2.jsx";
import Image from "next/image";

export default function Page() {
  const [posterHeadingOpacity, setPosterHeadingOpacity] = useState(0);
  const [mottoOpacity, setMottoOpacity] = useState(0);

  const posterHeadingRef = useRef(null);
  const mottoWrapperRef = useRef(null);

  const phoneDemoRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // const handlePhoneDemoScroll = (e) => {
  //   const container = phoneDemoRef.current;
  //   const { scrollTop, scrollHeight, clientHeight } = container;

  //   // Update the scroll position state
  //   setScrollY(scrollTop);

  //   console.log(`scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);

  //   // Allow scrolling only if the container is at the top or bottom
  //   if (scrollTop === 0 || scrollTop === scrollHeight - clientHeight) {
  //     return; // Allow normal scrolling
  //   }
  // };

  // useEffect(() => {
  //   const container = phoneDemoRef.current;

  //   // Initialize scroll position
  //   setScrollY(container.scrollTop);

  //   return () => {
  //     // Cleanup if necessary
  //   };
  // }, []);

  useEffect(() => {
    const topBar = document.querySelector(".top-bar-wrapper");

    const handleScroll = () => {
      setScrollY(phoneDemoRef.current.scrollTop); // Track the scrollY of the page

      if (window.scrollY === 0) {
        topBar.classList.add("transparent");
        topBar.classList.remove("opaque");
      } else {
        topBar.classList.add("opaque");
        topBar.classList.remove("transparent");
      }

      const posterHeading = posterHeadingRef.current;
      const mottoWrapper = mottoWrapperRef.current;

      if (posterHeading) {
        const posterHeadingRect = posterHeading.getBoundingClientRect();
        const posterHeadingCenter = posterHeadingRect.top + posterHeadingRect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distanceToCenter = 0.5 * Math.abs(viewportCenter - posterHeadingCenter);
        const maxDistance = window.innerHeight / 2; // Maximum distance to the center
        const visibilityRatio = Math.max(0, 1 - distanceToCenter / maxDistance); // Invert the ratio for closer = higher opacity

        setPosterHeadingOpacity(1.1 * visibilityRatio);
      }

      if (mottoWrapper) {
        const mottoWrapperRect = mottoWrapper.getBoundingClientRect();
        const mottoWrapperCenter = mottoWrapperRect.top + mottoWrapperRect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distanceToCenter = 0.5 * Math.abs(viewportCenter - mottoWrapperCenter);
        const maxDistance = window.innerHeight / 2; // Maximum distance to the center
        const visibilityRatio = Math.max(0, 1 - distanceToCenter / maxDistance); // Invert the ratio for closer = higher opacity

        setMottoOpacity(1.1 * visibilityRatio);
      }

    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="marketing-page">

      <div className="landing-screen">

        <div className="top-bar-wrapper transparent">
          <TopBar />
        </div>

        <div className="main-components">
          <div className="main-heading">
            A New Way to Track Your Goals
          </div>

          <Image
            className="main-image"
            width={1000}
            height={730}
            src="/assets/hand-removebg.png"
            alt="Hand Demonstration"
          />
        </div>

      </div>

      <div className="text-section">
        <div className="text-heading">Create, Track, and Improve</div>
        <div className="text-subheading">
          Dedicated to providing a new way to self-betterment and fulfillment
        </div>
      </div>

      <div className="long-gradient">

        <div ref={posterHeadingRef} className="poster-wrapper">

          <div className="poster">
            <div className="poster-heading" style={{ opacity: posterHeadingOpacity }} >
              It Feels Great to Work on Yourself
            </div>
            <Image
              className="poster-image"
              width={610 * 0.8}
              height={521 * 0.8}
              src="/assets/guyWorkingOut.png"
              alt="Guy Working Out"
            />
            <div className="poster-content">
              <div className="poster-subheading">Strengthen, Challenge, Evolve</div>
              <div className="poster-description">Log weight, time and record consistency</div>
            </div>
          </div>

          <div className="poster">
            <div className="poster-heading" style={{ opacity: posterHeadingOpacity }}>
              Monitor Habits, Elevate Your Reading
            </div>
            <Image
              className="poster-image"
              width={610}
              height={521 * 0.8}
              src="/assets/girlReading.png"
              alt="Girl Reading"
            />
            <div className="poster-content">
              <div className="poster-subheading">Expand Your Knowledge!</div>
              <div className="poster-description">Start with 15 min of reading to increase your knowledge</div>
            </div>
          </div>
        </div>

        <div className="text-section">
          <div className="text-heading">Journal Entries Catered to You</div>
          <div className="text-subheading">
            Create your own Personalized Journal
          </div>
        </div>

        <div className="motto-wrapper" ref={mottoWrapperRef} >
          <div className="motto-text" style={{ opacity: mottoOpacity }}>
            Create, Reflect, Achieve
          </div>
        </div>

        <div
          className="phone-demo-container"
          ref={phoneDemoRef}
          // onScroll={handlePhoneDemoScroll}
          style={{
            height: "1300px", // Limit visible area
            overflowY: "scroll", // Enable scrolling within the container
          }}
        >
          {/* <div className="demo-placeholder"></div> */}
          {/* <PhoneDemo scrollY={scrollY} scrollingDemo={scrollingDemo} /> */}
        </div>

      </div>
    </div>
  );
}
