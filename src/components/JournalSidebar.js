import React from 'react'
import "./JournalSideBar.css"
import NewJournalButton from './NewJournalButton'


export default function JournalSidebar( {
  journals, 
  selectedID,
  handleNewJournal, 
  handleDeleteJournal, 
  handleRenameJournal,
  handleJournalClick, 
  handleBackButton} ) {
  return (
    <>
      <div className="sidebar">
        <div className="flex-container">
          <button className="back-button" onClick={handleBackButton}>⬅️ </button>
          <h3> Journals </h3>
          <NewJournalButton handleNewJ={handleNewJournal}/>
        </div>
        <ul>
        {
          journals.map(journal => {
            const journalNameSpan = <span className='journal-title'>{journal.title}</span>
            return (
            <li className= {selectedID === journal.id? 'journal-item selected' : 'journal-item'}
            key={journal.id} onClick={() => handleJournalClick(journal)}>
            {journalNameSpan}
            <div className="action-buttons">
                <button className="edit-button" onClick={
                  () => {
                    // todo: make new name a user input
                    
                    handleRenameJournal(journal.id, "{UserInput}")
                  }
                }>
                🖊️
                </button>
                <button className="edit-button" onClick={() => handleDeleteJournal(journal.id)}>
                🗑️
                </button>
            </div>
            </li>
          )})}
        </ul>
      </div>

      {/* <div className="resizer">
         <button className="resize-button"> ↔️ </button>
       </div>  */}

    </>
  )
}