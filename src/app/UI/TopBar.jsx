import { React, useState } from 'react';
import Image from 'next/image';


export default function TopBar() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pills = ['Home', 'Services', 'Contact', 'About'];

  const handleClick = index => setSelectedIndex(index);

  return (
    <nav className="top-bar">
      <div className="logo">
        <Image src="/assets/Logo.svg" alt="icon" width="50" height="50"/>

        <span className='brand'> 
        Journally
        </span>
      </div>
      


      <ul className="nav-bar">
        {pills.map((pill, index) => (
          <li key={index}>
            <div
              className={`nav-pill`}
              onClick={() => handleClick(index)}
            >
              {pill}
            </div>
          </li>
        ))}
      </ul>

      
      {
      // <Image className="user-icon" src="/assets/UserProfile.png" height="50" width="50" alt='User Profile'/ >
      }

      <ul className="nav-bar"> 
        <li>
        <div className='nav-pill '>
          Log In
        </div>  
        </li>
        <li>
        <div className='nav-pill '>
          Sign Up
        </div>
        </li>
      </ul>


    </nav>
  );
}
