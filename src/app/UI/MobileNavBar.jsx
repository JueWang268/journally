import { React, useState } from "react";
import Image from "next/image";

export default function MobileNavBar({ loggedIn, onProfileClick }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const pills = ["Home", "Services", "Contact", "About"];

  const handleClick = (index) => setSelectedIndex(index);

  return (
    <nav className="mobile-top-bar">
      <div className="mobile-logo">
        <Image src="/assets/Logo.svg" alt="icon" width={40} height={40} />
        <span className="brand">Journally</span>
      </div>

      <ul className="mobile-nav-bar">
        {pills.map((pill, index) => (
          <li key={index}>
            <div className="nav-pill" onClick={() => handleClick(index)}>
              {pill}
            </div>
          </li>
        ))}
      </ul>

      <div className="mobile-auth-container">
        {loggedIn ? (
          <Image
            className="user-icon"
            src="/assets/UserProfile.png"
            alt="User Profile"
            width={40}
            height={40}
            onClick={onProfileClick}
          />
        ) : (
          <ul className="mobile-auth">
            <li>
              <div className="nav-pill">Log In</div>
            </li>
            <li>
              <div className="nav-pill">Sign Up</div>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
