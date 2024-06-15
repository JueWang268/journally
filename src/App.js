import React, { useState } from 'react';
import './App.css';

const journals = [
  { id: 1, title: "Journal 1", entries: [{ id: 1, title: "Entry 1", date: "2024-01-01" }, { id: 2, title: "Entry 2", date: "2024-01-02" }] },
  { id: 2, title: "Journal 2", entries: [{ id: 3, title: "Entry 3", date: "2024-01-03" }] }
];

const App = () => {
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [view, setView] = useState("writingPad");


  const handleJournalClick = (journal) => {
    setSelectedJournal(journal);
  };

  return (
    <div className="app">
      <div className="navbar">
        <div>
          <img className="icon" src={require(".//icon.png")} alt="journal logo"/>
        </div>
        <div className="nav-item">New</div>
        <div className="nav-item">Calendar</div>
        <div className="nav-item">Graph</div>
        <div className="nav-item">Insert Media</div>
        <div className="user-icon" onClick={() => alert('User options')}>User</div>
      </div>
      <div className="sidebar">
        <h3>Journals</h3>
        <ul>
          {journals.map(journal => (
            <li key={journal.id} onClick={() => handleJournalClick(journal)}>
              {journal.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="entries-sidebar">
        <h3>Entries</h3>
        {selectedJournal ? (
          <ul>
            {selectedJournal.entries.map(entry => (
              <li key={entry.id}>
                <div className="entry-card">
                  <div className="entry-title">{entry.title}</div>
                  <div className="entry-date">{entry.date}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>Select a journal to view entries</div>
        )}
      </div>
      <div className="main-content">
        <div className="view-switch">
          <button onClick={() => setView("writingPad")}>Writing Pad</button>
          <button onClick={() => setView("dailyStats")}>Daily Stats</button>
        </div>
        {view === "writingPad" ? (
          <textarea className="rich-textarea" placeholder="RICHTEXT AREA"></textarea>
        ) : (
          <div>Daily Stats will be shown here</div>
        )}
      </div>
    </div>
  );
};

export default App;
