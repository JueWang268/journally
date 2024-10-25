import React, { useState } from 'react'
import './DataPointItem.css'

const DataPointItem = ({name, color, timeline}) => {
  const [timelineVisible, setTimelineVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  return (
    <div className="data-point-and-timeline">
      <div className="data-point-item">

        <div className="left-section">
          <div className="color-box" 
          style={{"background-color": color}}></div>
          <button className="rename-button">
            🖊️
          </button>
        </div>

        <div className="center-section">
          <span className="data-point-name">{name}</span>
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

      {/* Collapsible Timeline Section */}
      {timelineVisible && (
        <div className="timeline-section">
          <div className="timeline-header">
            <span className='timeline-table-cell'>Date</span>
            <span className='timeline-table-cell'>Value</span>
          </div>
          {timeline.map(({ date, value }, index) => (
            <div className="timeline-row" key={index}>
              <span className='timeline-table-cell'>{date}</span>
              <span className='timeline-table-cell'>{value}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
export default DataPointItem;
