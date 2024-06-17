import React, { useState } from 'react';
// import NewButton from './components/NewJournalButton';
import JournalSidebar from './components/JournalSidebar';
import './App.css';
import Journal from './Journal';
import Entry from './Entry';


const App = () => {

  const [selectedJournal, setSelectedJournal] = useState(null);
  const [view, setView] = useState("writingPad");
  const [showJournalBar, setShowJournalBar] = useState(true);

  const [journals, setJournals] = useState([      
    new Journal(1, "Personal Journal", new Date(), []),
    new Journal(2, "OOP Journal 2", new Date(), [
      new Entry(1, "Dear Diary", (new Date()).toString(), "Today is a great day!")
    ], true)
  ]);
  
  const handleJournalClick = (journal) => {
    setSelectedJournal(journal);
  };

  const toggleJournalBar = () => setShowJournalBar(!showJournalBar);

  const createNewJournal = (journals, setJournals) => {
    if (! journals[journals.length - 1].id) {
        return
    }
    const newId = journals[journals.length - 1].id + 1
    setJournals([...journals, 
        new Journal(newId, `New Journal ${newId}`, new Date(), [])
    ])
  };

  const askForConfirmation = () => {
    // should make the user retype 
    // journal name to confirm deletion
  }

  const deleteJournal = (journalID) => {
    askForConfirmation();
    setJournals(journals.filter(
      j => j.id !== journalID
    ))
  }
  
  const renameJournal = (journalID, newName) => {
    // todo: make new name a user input
    setJournals(journals.map(
      j => {
        if (j.id === journalID){
          return {...j, title: newName}
        }
        return j
      }
    ))
    
  }

  return (
    <div className="app">
      <div className="navbar">
        <div>
          <img className="icon" src={require(".//icon.png")} alt="journal logo"/>
        </div>
        <div className="nav-item" onClick={toggleJournalBar}>Journals</div>
        <div className="nav-item">Calendar</div>
        <div className="nav-item">Graph</div>
        <div className="nav-item">Insert Media</div>
        <div className="nav-item">🌏</div>
        <div className="user-icon" onClick={() => alert('User options')}>👤</div>
      </div>

      <div className="main-layout">
        
        {showJournalBar &&
          <JournalSidebar journals={journals}
          handleNewJournal = {() => createNewJournal(journals, setJournals)}
          handleDeleteJournal = {deleteJournal}
          handleRenameJournal = {renameJournal}
          handleJournalClick={handleJournalClick} handleBackButton={toggleJournalBar}/>}
        
        <div className="entries-sidebar">
        <h3>Entries</h3>
        {selectedJournal ? (
          selectedJournal.entries.length > 0 ? (
          <ul>
            {selectedJournal.entries.map(entry => (
              <li key={entry.id}>
                <div className="entry-card">
                  <div className="entry-title">{entry.title}</div>
                  <div className="entry-date">{entry.date}</div>
                </div>
              </li>
            ))}
          </ul>) :
          (
            <div> No entries in this journal </div>
          )
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
    </div>
  );
};

export default App;
