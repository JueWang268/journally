"use client"
import { React, useState } from 'react';


export default function TimelineRow({id, name, date, value, onEdit, onDelete, index}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="timeline-row" key={index}>
      {isEditing ? (
        <>
          <input
            type='date'
            placeholder={date}
            onKeyDown={
            (e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
                onEdit(id, name,  value, e.target.value,);
              }
              else if (e.key === "Escape"){
                setIsEditing(false);
              }
            }
            }
            onBlur={ (e) =>
              {
                setIsEditing(false);
                onEdit(id, name,  value, e.target.value,);
              }
            }
            className='timeline-input'
          />

          <input
            className='timeline-input'
            type='number'
            placeholder={value}
            onBlur={ (e) =>
              {
                setIsEditing(false);
                onEdit(id, name,  e.target.value,date);
              }
            }
            onKeyDown={
            (e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
                onEdit(id, name,  e.target.value,date);
              }
              else if (e.key === "Escape"){
                setIsEditing(false);
              }
            }
            }
          />
        </>
       ) : (
        <>
         <span className='timeline-table-cell'>{date}</span>
         <span className='timeline-table-cell'>{value}</span>
        </>
       )}


      <button className="timeline-action-button" onClick={()=>{setIsEditing(!isEditing)}} >
        {
          isEditing?
          "back":"..." 
        }
      </button>
      {
        isEditing && <button className="delete-timeline-button" onClick={() => {onDelete(id)}}>🗑️</button>
      }
    </div>
  );
}