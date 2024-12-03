import React from 'react';
import './Card.css';

const Card = ({ title, goals }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <ul className="card-goals">
        {goals.map((goal, index) => (
          <li key={index} className="card-goal">
            {goal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;