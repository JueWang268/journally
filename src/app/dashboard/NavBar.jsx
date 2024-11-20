import React, { useState } from 'react';

export default function NavBar() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pills = ['Home', 'About', 'Services', 'Contact'];

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul className="nav-bar">
      {pills.map((pill, index) => (
        <li key={index}>
          <div
            className={`nav-pill ${selectedIndex === index ? 'selected' : ''}`}
            onClick={() => handleClick(index)}
          >
            {pill}
          </div>
        </li>
      ))}
    </ul>
  );
}
