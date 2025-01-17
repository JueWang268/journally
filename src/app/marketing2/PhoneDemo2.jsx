import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "../../styles/PhoneDemo2.css";

const PhoneDemo = ({ scrollY, scrollingDemo }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const containerRef = useRef(null);
  const images = [
    "/assets/phone-demo/1.png",
    "/assets/phone-demo/2.png",
    "/assets/phone-demo/3.png",
    "/assets/phone-demo/4.png",
    "/assets/phone-demo/5.png",
  ];

  const handleWheel = (e) => {
    if (!scrollingDemo) return;

    let newStage = currentStage;

    if (e.deltaY > 0) {
      // Scroll down (next stage)
      newStage = Math.min(currentStage + 1, images.length - 1);
    } else {
      // Scroll up (previous stage)
      newStage = Math.max(currentStage - 1, 0);
    }

    setCurrentStage(newStage);
    containerRef.current.scrollTop = newStage * 400; // Adjust scroll position for the demo
    e.preventDefault();
  };

  useEffect(() => {
    if (scrollingDemo) {
      window.addEventListener("wheel", handleWheel, { passive: false });
    } else {
      window.removeEventListener("wheel", handleWheel);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [scrollingDemo, currentStage]);

  useEffect(() => {
    // Calculate the current image based on scrollY value
    const stage = Math.floor(scrollY / 1300); // 1300 is the height of each image
    setCurrentStage(Math.min(stage, images.length - 1));
  }, [scrollY]);

  return (
    <div className="phone-demo" ref={containerRef}>
      <div className="image-wrapper">
        <div className={`demo-image demo-image-${currentStage}`}>
          <Image
            className="phone-demo-img"
            src={images[currentStage]}
            alt={`Phone Demo Stage ${currentStage + 1}`}
            width={1440}
            height={1300}
          />
        </div>

        {/* Optionally add the next image for fade effect */}
        <div className={`demo-image demo-image-${currentStage + 1}`}>
          {currentStage + 1 < images.length && (
            <Image
              className="phone-demo-img"
              src={images[currentStage + 1]}
              alt={`Phone Demo Stage ${currentStage + 2}`}
              width={1440}
              height={1300}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneDemo;
