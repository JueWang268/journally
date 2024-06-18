import React, { useState } from 'react'
// import NewButton from './components/NewJournalButton'
import JournalSidebar from './components/JournalSidebar'
import './App.css'
import Journal from './Journal'
import Entry from './Entry'


const App = () => {
  const [journals, setJournals] = useState([      
    new Journal(1, "Personal Journal", Date(), []),
    new Journal(2, "OOP Journal 2", Date(), [
      new Entry(1, "Dear Diary", Date(), "Today is a great day!")
    ], true)
  ])
  // force journal selection
  const [selectedJournal, setSelectedJournal] = useState(journals[journals.length - 1])
  const [selectedEntries, setSelectedEntries] = useState(selectedJournal.entries)

  const [view, setView] = useState("writingPad")
  const [showJournalBar, setShowJournalBar] = useState(true)
  // const [renamingJournal, setRenamingJournal] = useState(false)

  const findJournal = (ID) => {
    const target = journals.filter(j => j.id === ID)
    if (target.length === 1) {
      return journals.filter(j => j.id === ID)[0]
    }
    else {
      // throw error
      return null
    }
  }
  
  const handleJournalClick = (journal) => {
    setSelectedJournal(journal)
    setSelectedEntries(journal.entries)
  }

  const toggleJournalBar = () => setShowJournalBar(!showJournalBar)

  const createNewJournal = (journals, setJournals) => {
    if (! journals[journals.length - 1].id) {
        return
    }
    const newId = journals[journals.length - 1].id + 1
    setJournals([...journals, 
        new Journal(newId, `New Journal ${newId}`, new Date(), [])
    ])
  }
  
  const createNewEntry = (jid) => {
    // creates a new entry in a journal with id jid
    const targetJournal = findJournal(jid)
    const newEntryID = selectedEntries.length > 0? selectedEntries[selectedEntries.length - 1].id + 1: 1
    const newEntry = new Entry(
      newEntryID,
      `Entry ${newEntryID}`, Date(), "{User Content}"
    )

    const otherJournals = journals.filter(
      j => j.id !== jid
    )
    // sorting everytime is not the fastest implementation
    setSelectedEntries([...selectedEntries, newEntry])
    
    setJournals([...otherJournals, 
        {...targetJournal, entries: [...selectedEntries, newEntry]}
    ].sort((a,b) => (a.id - b.id)))
  }

  const askForConfirmation = () => {
    // should make the user retype 
    // journal name to confirm deletion
  }

  const deleteJournal = (journalID) => {
    askForConfirmation()
    setJournals(journals.filter(
      j => j.id !== journalID
    ))
  }
  
  const renameJournal = (journalID, newName) => {

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
          selectedID={selectedJournal.id}
          handleNewJournal = {() => createNewJournal(journals, setJournals)}
          handleDeleteJournal = {deleteJournal}
          handleRenameJournal = {renameJournal}
          handleJournalClick={handleJournalClick} handleBackButton={toggleJournalBar}/>}
        
        <div className="entries-sidebar">
          <div className="flex-container">
            <h3>Entries</h3>
            <button className="new-entry-button" onClick={() => {createNewEntry(selectedJournal.id)}}>
            +
            </button>
          
          </div>
        {
          selectedEntries.length > 0 ? (
          <ul>
            {selectedEntries.map(entry => (
              <li key={entry.id}>
                <div className="entry-card">
                  <div className="entry-title">{entry.title}</div>
                  <div className="entry-date">{entry.date}</div>
                </div>
              </li>
            ))}
          </ul>) :
          (
            <div> No entries in this journal. 
            <button className="start-writing-button" 
            onClick={() => {createNewEntry(selectedJournal.id)}}>
            Start Writing
            </button> </div>
          )
        }
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
  )
}

export default App
