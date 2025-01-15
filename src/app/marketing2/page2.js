
"use client";
import React, { useState, useEffect, useRef } from "react";
import "../../styles/BgTopBar.css";
import '../../styles/Marketing2.css';
import TopBar from "../UI/TopBar.jsx";
import PhoneDemo from "./PhoneDemo2.jsx";
import Image from "next/image";

export default function Page() {
  const [transparency, setTransparency] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const demoRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const phoneDemoScrollUnlockPosition = 2000;

  const handlePhoneDemoScroll = (e) => {
    if (!canScroll) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (demoRef.current) {
      setScrollY(demoRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const demoRefCurr = demoRef.current;
    const topBar = document.querySelector(".top-bar-wrapper");

    if (demoRefCurr) {
      demoRefCurr.addEventListener("scroll", handlePhoneDemoScroll);
    }

    const handleScroll = () => {
      if (window.scrollY === 0) {
        topBar.classList.add("transparent");
        topBar.classList.remove("opaque");
      } else {
        topBar.classList.add("opaque");
        topBar.classList.remove("transparent");
      }

      const elements = document.querySelectorAll(
        "[class^=dynamic-transparency-]"
      );
      setScrollPosition(window.scrollY);
      setCanScroll(window.scrollY >= phoneDemoScrollUnlockPosition);

      const viewportHeight = window.innerHeight;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const scrollPosition = rect.top;

        const transparencyValue = Math.min(
          1 - scrollPosition / viewportHeight + 0.1,
          1
        );

        const classParts = element.className
          .split(" ")
          .find((a) => a.includes("dynamic-transparency"))
          .split("-");

        setTransparency(transparencyValue);

        element.style.color = `rgba(
          ${classParts[classParts.length - 3]}, 
          ${classParts[classParts.length - 2]}, 
          ${classParts[classParts.length - 1]}, 
          ${transparencyValue})`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      if (demoRefCurr) {
        demoRefCurr.removeEventListener("scroll", handlePhoneDemoScroll);
      }
      window.removeEventListener("scroll", handleScroll);
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
          Dedicated to providing a new way to self betterment and fulfillment
        </div>
      </div>

      <div className="long-gradient">

        <div className="poster-wrapper">

          <div className="poster">
            <div className="poster-heading dynamic-transparency-255-255-255">
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
            <div className="poster-heading dynamic-transparency-255-255-255">
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

        <div className="motto-wrapper">
          <div className="motto-text dynamic-transparency-255-255-255">
            Create, Reflect, Achieve
          </div>
        </div>

        <div
          ref={demoRef}
          onScroll={handlePhoneDemoScroll}
          className="phone-demo-container"
        >
          <PhoneDemo scrollY={scrollY} />
        </div>

        <div style={{
          height: '500px',
          background: 'white'
        }}></div>


      </div>

    </div>
  );
}

