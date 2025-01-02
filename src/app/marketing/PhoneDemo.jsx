import "../../styles/phoneDemo.css"; // Import the CSS file here
import React from 'react';
import Image from 'next/image';

const getOpacity = (start, end, scrollY) => {
  if (scrollY < start) return 0;
  if (scrollY > end) return 0;
  console.log(`opcacity is ${ 1 - Math.abs((scrollY - (start + end) / 2) / ((end - start) / 2))}`);
  
  return 1 - Math.abs((scrollY - (start + end) / 2) / ((end - start) / 2));

};

const PhoneDemo = ({ scrollY }) => {
  return (
    <div className="scroll-wrapper">
      <section className="phone-container" style={{ opacity: getOpacity(0, 743, scrollY) }}>
        <Image
          src="/assets/phone1.png"
          alt="Phone 1"
          width={347}
          height={743}
          className="phone"
        />
      </section>
      <section className="phone-container" style={{ opacity: getOpacity(743, 1486, scrollY) }}>
        <Image
          src="/assets/phone2.png"
          alt="Phone 2"
          width={347}
          height={743}
          className="phone"
        />
      </section>
      <section className="phone-container" style={{ opacity: getOpacity(1486, 2229, scrollY) }}>
        <Image
          src="/assets/phone3.png"
          alt="Phone 3"
          width={347}
          height={743}
          className="phone"
        />
      </section>
      <section className="phone-container" style={{ opacity: getOpacity(2229, 2972, scrollY) }}>
        <Image
          src="/assets/phone4.png"
          alt="Phone 4"
          width={347}
          height={743}
          className="phone"
        />
      </section>
      <section className="phone-container" style={{ opacity: getOpacity(2972, 3715, scrollY) }}>
        <Image
          src="/assets/phone5.png"
          alt="Phone 5"
          width={347}
          height={743}
          className="phone"
        />
      </section>
    </div>
  );
};

export default PhoneDemo;
