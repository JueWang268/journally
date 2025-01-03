import "../../styles/phoneDemo.css"; // Import the CSS file here
import React from 'react';
import Image from 'next/image';

const getOpacity = (start, end, scrollY) => {
  if (scrollY < start) return 0;
  if (scrollY > end) return 0;
  // console.log(`opcacity is ${ 1 - Math.abs((scrollY - (start + end) / 2) / ((end - start) / 2))}`);
  
  return 1 - Math.abs((scrollY - (start + end) / 2) / ((end - start) / 2));

};

const decreasingOpacity = (start, end, scrollY) => {
  if (scrollY < start) return 0;
  if (scrollY > end) return 0;
  
  return Math.abs((-scrollY + (end-start) ) / ((end - start) ));

};

const PhoneDemo = ({ scrollY }) => {
  const containerHeight = 770;
  return (
    <div className="scroll-wrapper">
    <div className="slogan" 
      style={{color: 'black', opacity:decreasingOpacity(0, 520, scrollY), fontSize: 36, 
        fontWeight: '600', wordWrap: 'break-word', top: '17%'}}>
      Introducing
    </div>
    <div className="slogan" 
      style={{color: '#757575', opacity:decreasingOpacity(0, 520, scrollY), fontSize: 36, 
        fontWeight: '400', wordWrap: 'break-word', top: '22%'}}>
      Personalization
    </div>
      <section className="phone-container" style={{ opacity: decreasingOpacity(0, 520, scrollY) }}>
        <Image
          src="/assets/phone1.png"
          alt="Phone 1"
          width={242}
          height={520}
          className="phone"
        />
      </section>
      <div className="slogan" style={{
        fontSize: 36, fontWeight: '600',
        opacity: getOpacity(containerHeight, containerHeight*2, scrollY), 
        top:"8%"}}>
        Simply
      </div>
      <div className="slogan" style={{color: '#3765E2', fontSize: 150, 
        opacity: getOpacity(containerHeight, containerHeight*2, scrollY), fontWeight: '600', top:"11%"}}>
        Record
      </div>
      <div className="slogan" style={{width: 327, color: 'black', fontSize: 36, top:"50%", 
        opacity: getOpacity(containerHeight, containerHeight*2, scrollY)}}>
        Tracks Your Audio Entries in One Tap
      </div>
      <section className="phone-container" style={{ opacity: getOpacity(containerHeight, containerHeight*2, scrollY) }}>
        <Image
          src="/assets/phone2.png"
          alt="Phone 2"
          width={242}
          height={520}
          className="phone"
        />
      </section>

      <div className="slogan" style={{
        fontSize: 36, fontWeight: '600',
        opacity: getOpacity(containerHeight*2, containerHeight*3, scrollY), 
        top:"8%"}}>
        It's Seamless
      </div>
      <div className="slogan" style={{color: '#C1CBA5', fontSize: 150, 
        opacity: getOpacity(containerHeight*2, containerHeight*3, scrollY), fontWeight: '600', top:"11%"}}>
        Optimize
      </div>
      <div className="slogan" style={{width: 327, color: 'black', fontSize: 36, top:"50%", 
        opacity: getOpacity(containerHeight*2, containerHeight*3, scrollY)}}>
        Transforming How You Track Your Goals
      </div>
      <section className="phone-container" style={{ opacity: getOpacity(containerHeight*2, containerHeight*3, scrollY) }}>
        <Image
          src="/assets/phone3.png"
          alt="Phone 3"
          width={242}
          height={520}
          className="phone"
        />
      </section>

      <div className="slogan" style={{
        fontSize: 36, fontWeight: '600',
        opacity: getOpacity(containerHeight*3, containerHeight*4, scrollY), 
        top:"8%"}}>
        With Friends?
      </div>
      <div className="slogan" style={{color: '#8F95FB', fontSize: 150, 
        opacity: getOpacity(containerHeight*3, containerHeight*4, scrollY), fontWeight: '600', top:"11%"}}>
        Motivate
      </div>
      <div className="slogan" style={{width: 327, color: 'black', fontSize: 36, top:"50%", 
        opacity: getOpacity(containerHeight*3, containerHeight*4, scrollY)}}>
        Motivate One Another in a Fun Interactive Way!
      </div>
      <section className="phone-container" style={{ opacity: getOpacity(containerHeight*3, containerHeight*4, scrollY) }}>
        <Image
          src="/assets/phone4.png"
          alt="Phone 4"
          width={242}
          height={520}
          className="phone"
        />
      </section>


      <section className="phone-container" style={{ opacity: getOpacity(containerHeight*4, containerHeight*5.5, scrollY) }}>

        <Image
          src="/assets/phone5.png"
          alt="Phone 5"
          width={242}
          height={520}
          className="phone"
        />
      </section>
      <div className="slogan fancy" style={{fontSize: 200, fontWeight: '600',
        opacity: getOpacity(containerHeight*4, containerHeight*5.5, scrollY), top:"7%"}}>
        Journally
      </div>
    </div>
  );
};

export default PhoneDemo;
