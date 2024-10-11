import React, { useState } from 'react'
import "./DeleteDialogue.css"

export default function DeleteDialogue ({ journalName, onConfirm, onCancel }) {
  const [inputValue, setInputValue] = useState("")
  const [isInputWrong, setIsInputWrong] = useState(false)

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleConfirm = () => {
    if (inputValue === journalName) {
      onConfirm(true)
    } else {
      setIsInputWrong(true)
      onConfirm(false)
    }
  }

  return (
    <div className="dialog">
      <h2>Confirm Deletion</h2>
      <p>Please retype the name of the journal to confirm deletion:</p>
      <input type="text" value={inputValue} onChange={handleChange} />
      {isInputWrong && <div className="alert-message"> ! Journal name does not match. Please try again. </div>}
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}