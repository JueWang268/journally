import React, { useState } from 'react'
// import NewButton from './components/NewJournalButton'
import JournalSidebar from './components/JournalSidebar'
import './App.css'
import Journal from './Journal'
import Entry from './Entry'
import DeleteDialogue from './components/DeleteDialogue'
import EntryItem from './components/EntryItem'


const App = () => {
  const [journals, setJournals] = useState([
    new Journal(1, "Personal Journal", Date(), []),
    new Journal(2, "OOP Journal 2", Date(), [
      new Entry(1, "Dear Diary", new Date(), "Today is a great day!")
    ], true)
  ])
  // force journal selection
  const [selectedJournal, setSelectedJournal] = useState(journals[journals.length-1])
  const [selectedEntries, setSelectedEntries] = useState(selectedJournal.entries)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [retypeProps, setRetypeProps] = useState(null)
  const [view, setView] = useState("writingPad")
  const [showJournalBar, setShowJournalBar] = useState(true)

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

  const jids = journals.map(j => j.id)
  
  const handleJournalClick = (jid) => {
    const j = findJournal(jid)
    console.log(`journal reselected to: ${JSON.stringify(j)}`)
    setSelectedJournal(j)
    setSelectedEntries(j.entries)
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
      `${new Date().toDateString()}`, new Date(), "{User Content}", null, true
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

  const askForInput = (journalName) => {
    setIsDialogOpen(true)
    return new Promise((resolve) => {
      setRetypeProps({
        journalName,
        onConfirm: (result) => {
          // result is true when user types title right
          setIsDialogOpen(!result)
          resolve(result)
        },
        onCancel: () => {
          setIsDialogOpen(false)
          resolve(false) 
        },
      })
    })
  }

  const deleteJournal = async (journalID) => {
    const confirmed = await askForInput(findJournal(journalID).title)
    // const confirmed = true
    let nextJ = selectedJournal.id
    if (journalID === selectedJournal.id && journals.length > 1){
      if (jids.indexOf(journalID) + 1 < journals.length){
        nextJ = jids[jids.indexOf(journalID) + 1]
      }
      else{
        nextJ = jids[0]
      }
    }
    if (confirmed) {
      setJournals(journals.filter(
        j => j.id !== journalID
      ))
      // action buttons must stop event propagation
      handleJournalClick(nextJ)
    }
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

  const renameEntry = (entryID, newName) => {
    setJournals(journals.map(
      j => {
        if (j.id === selectedJournal.id){
          const newEntries = j.entries.map(
            n => {
              if (n.id === entryID){
                setSelectedEntry({...n, title: newName, renamingItem: false})
                return {...n, title: newName, renamingItem: false}
              }
              return n
            }
          )
          setSelectedEntries(newEntries)

          console.log(`now: ${ JSON.stringify({...j, entries: newEntries}.entries) }`)
          return {...j, entries: newEntries}
        }
        return j
      }
    ))
  }

  const turnOffRenamingItem = (nid) => {
    setJournals(journals.map(
      j => {
        if (j.id === selectedJournal.id){
          const newEntries = j.entries.map(
            n => {
              if (n.id === nid){
                return {...n, renamingItem: false}
              }
              return n
            }
          )
          setSelectedEntries(newEntries)
          return {...j, entries: newEntries}
        }
        return j
      }
    ))
  }
  
  const saveEntryContent = (nid, content) => {
    console.log(`entry ${nid} has content changed to ${content}`);
    setJournals(journals.map(
      j => {
        if (j.id === selectedJournal.id){
          const newEntries = j.entries.map(
            n => {
              if (n.id === nid){
                setSelectedEntry({...n, content: content})
                return {...n, content: content}
              }
              return n
            }
          )
          setSelectedEntries(newEntries)
          return {...j, entries: newEntries}
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
          selectedJournal ? 
            (selectedEntries.length > 0 ? (
            <ul>
              {selectedEntries.map(entry => (
                <EntryItem entry={entry}
                handleRenameEntry={renameEntry}
                handleDeleteEntry={() => {}}
                handleEntryClick={()=> {setSelectedEntry(entry)}}
                turnOffRenamingItem={turnOffRenamingItem}
                renamed={entry.renamingItem}  />
              ))}
            </ul>) :
            (
              <div> No entries in this journal. 
              <button className="start-writing-button" 
              onClick={() => {createNewEntry(selectedJournal.id)}}>
              Start Writing
              </button> </div>
            )
          ) : <div className="no-journal-message"> No journal selected </div>
        }
      </div>
    
        {
          selectedEntry &&
          <div className="main-content">
          <div className="view-switch">
            <button onClick={() => setView("writingPad")}>Writing Pad</button>
            <button onClick={() => setView("dailyStats")}>Daily Stats</button>
          </div>
          <div className="entry-title">
            {selectedEntry.title}
          </div>
          {view === "writingPad" ? (
            <textarea 
              className="rich-textarea" 
              value={selectedEntry.content}
              onChange={(e) => {saveEntryContent(selectedEntry.id, e.target.value)}}
            > 
              {selectedEntry.content}
            </textarea>
          ) : (
            <div>Daily Stats will be shown here</div>
          )}
          {isDialogOpen && (
            <DeleteDialogue
              journalName={retypeProps.journalName}
              onConfirm={retypeProps.onConfirm}
              onCancel={retypeProps.onCancel}
              />
            )}
          </div>
        }
      </div>
    </div>
  )
}

export default App
