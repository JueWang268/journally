import React, { useState } from 'react'
import './DataPointItem.css'

const DataPointItem = ({name, color}) => {
  const [isVisible, setIsVisible] = useState(true)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
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
        <button className="options-button">
          ⋮
        </button>
      </div>
    </div>
  )
}
export default DataPointItem
