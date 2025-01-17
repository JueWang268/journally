import React from 'react';
import './CardUI.css';

const CardUI = ({ title, journals }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <ul className="card-journals">
        {/* {journals.map((journal, index) => (
          <li key={index} className="card-journal">
            {journal}
          </li>
        ))} */}
        {journals.map((journal) => (
          <li key={journal.id}>
            <strong>{journal.title}</strong> (Date: {journal.date}, Favorite: {journal.favorite ? "Yes" : "No"})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardUI;