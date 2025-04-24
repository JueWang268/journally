import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import "../../styles/NewGoalModal.css";

// also deals with editing and removing goal, serves as a unified interface

const NewGoalModal = ({ userId, isOpen, onClose, onCreateGoal, onEditGoal, categories, defaultName,
  goalData, mode }) => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState(defaultName);
  const [gd, setGd] = useState(goalData); // goad data


  const [frequency, setFrequency] = useState(
    mode === "Edit"? gd?.frequency : 1
  );
  const [value, setValue] = useState(
    mode === "Edit"? gd?.value : 1
  );
  const [startDate, setStartDate] = useState(
    mode === "Edit" ? gd?.startDate :
    dayjs().format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState(
    dayjs().add(100, 'day').format('YYYY-MM-DD')
  );
  const [unit, setUnit] = useState('units');
  
  useEffect(() => {
    setName(defaultName);
    setGd(gd);

  }, [defaultName, gd]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name) {
      alert("Name is required");
      return;
    }
    if (mode === "Edit"){
      onEditGoal(
        
      );
    }
    else{
      onCreateGoal(
        userId,
        name,
        category,
        frequency,
        value,
        startDate,
        endDate,
        unit
      );
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{mode === "Create" ? "Create New": "Edit"} Goal</h2>

        <label>Category (optional)</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="None">None</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <label>Name *</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Frequency (days) *</label>
        <input type="number" min="1" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
        
        <label>Value *</label>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />

        <label>Start Date *</label>
        <input type="date" value={startDate || ""} onChange={(e) => setStartDate(e.target.value || null)} />
        
        <label>End Date </label>
        <input
          type="date"
          value={endDate || ""} onChange = {(e) => setEndDate(e.target.value || null)} />

        <label>Unit (optional)</label>
        <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />

        <div className="modal-buttons">
          <button onClick={handleSubmit}>{mode === "Create" ? "Create": "Confirm"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NewGoalModal;
