import React, { useState } from 'react';
import "../../styles/NewGoalModal.css";

const NewGoalModal = ({ userId, isOpen, onClose, onCreateGoal, categories }) => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState(1);
  const [value, setValue] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [unit, setUnit] = useState('units');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name) {
      alert("Name is required");
      return;
    }

    const endDate = frequency === 1 ? startDate : null; // could auto-calculate for one-time goals

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

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Goal</h2>

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
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        <label>Unit (optional)</label>
        <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />

        <div className="modal-buttons">
          <button onClick={handleSubmit}>Create</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NewGoalModal;
