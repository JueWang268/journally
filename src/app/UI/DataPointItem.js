import React, { useState } from 'react';
import './DataPointItem.css';
import TimelineRow from './TimelineRow.js';
import { useDataPointsContext } from '../context/DatapointsContext';


const DataPointItem = ({name, color, timeline, onEdit, onDelete}) => {
  const { datapoints, loading, error, createDatapoint, editDp, removeDp, setDatapoints } = useDataPointsContext();
  // timeline is a group of datapoints
  const [timelineVisible, setTimelineVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  const toggleHidden = () => {
    setHidden(!hidden);
  }

  return (
    <div className="data-point-and-timeline">
      <div className="data-point-item">

        <div className="left-section">
          <div className="color-box" 
          style={{"background-color": color}}></div>

          <button 
            className="rename-button"
            onClick={() => {
              setIsEditing(true);
            }}
            >
            🖊️
          </button>
        </div>

        <div className="center-section">
            {
              (!isEditing)? 
              <span className="data-point-name">{name}</span>
              :
              <input type="text"
              defaultValue={name}
              onKeyDown={
                (e) => {
                  if (e.key === "Enter") {
                    // dp group rename
                    setIsEditing(false);
                    timeline?.map(
                      (dp => onEdit(dp.id, e.target.value, dp.value, dp.date))
                    );
                    setDatapoints(prev => {
                      const updatedDps = {...prev};
                      if (updatedDps[name]){
                        updatedDps[e.target.value] = updatedDps[name];
                        delete updatedDps[name];
                      }
                      return updatedDps;
                    });
                  }
                  else if (e.key === "Escape"){
                    setIsEditing(false);
                  }
                }
              }

              onBlur={() => setIsEditing(false)}
              />
            }
        </div>

        <div className="right-section">
          <button className="eye-button" onClick={toggleVisibility}>
            {isVisible ? '👁️' : '🙈'}
          </button>
          <button className="options-button" onClick={()=>{setTimelineVisible(!timelineVisible)}}>
            ⋮
          </button>
        </div>
      </div>

      {timelineVisible && (
        <div className="timeline-section">
          <div className="timeline-header">
            <span className='timeline-table-cell'>Date</span>
            <span className='timeline-table-cell'>Value</span>
            <button className="timeline-action-button" onClick={toggleHidden} >
            {
              hidden? 
              "..." : "back"
            }
            </button>
          </div>

          {            // <div className="timeline-row" key={index}>
            //   <span className='timeline-table-cell'>{date}</span>
            //   <span className='timeline-table-cell'>{value}</span>

            //   {(
            //     !hidden && 
            //       <div>
            //       <button className="edit-timeline-button">🖋️</button>
            //       <button className="delete-timeline-button" onClick={() => {onDelete(id)}}>🗑️</button>
            //       </div>
            //   )}
              
            // </div>
          }

          {timeline?.map(({ date, value, id }, index) => 
            <TimelineRow 
              id={id} 
              name={name}
              date={date}
              value={value}
              onEdit={onEdit}
              onDelete={onDelete}
              index={index} />
          )}
        </div>
      )}

    </div>
  )
}
export default DataPointItem;
