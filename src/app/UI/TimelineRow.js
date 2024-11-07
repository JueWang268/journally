"use client"
import { React, useState } from 'react';
import { useDataPointsContext } from '../context/DatapointsContext';

export default function TimelineRow({id, name, date, value, onEdit, onDelete, index}) {
  const [isEditing, setIsEditing] = useState(false);
  // const { datapoints, loading, error, createDatapoint, onEdit, removeDp, setDatapoints } = useDataPointsContext();

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
                onEdit(id, name, value, e.target.value);
              }
              else if (e.key === "Escape"){
                setIsEditing(false);
              }
            }
            }
            onBlur={ (e) =>
              {
                setIsEditing(false);
                onEdit(id, name,  value, e.target.value);
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
                onEdit(id, name, e.target.value, date);
              }
            }
            onKeyDown={
            (e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
                const updatedDp = onEdit(id, name, e.target.value, date);
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
        isEditing && <button className="delete-timeline-button" onClick={() => {
          setIsEditing(false);
          onDelete(id);
        }}>🗑️</button>
      }
    </div>
  );
}