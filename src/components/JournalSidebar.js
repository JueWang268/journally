import React from 'react'
import "./JournalSideBar.css"
import NewJournalButton from './NewJournalButton'


export default function JournalSidebar( {journals, handleNewJournal,handleDeleteJournal, handleJournalClick, handleBackButton} ) {
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
          journals.map(journal => (
          <li className='journal-item' key={journal.id} onClick={() => handleJournalClick(journal)}>
          <span className='journal-title'>{journal.title}</span>
          <div className="action-buttons">
              <button className="edit-button">
              🖊️
              </button>
              <button className="edit-button" onClick={() => handleDeleteJournal(journal.id)}>
              🗑️
              </button>
          </div>
          </li>
        ))}
        </ul>
      </div>

      {/* <div className="resizer">
         <button className="resize-button"> ↔️ </button>
       </div>  */}

    </>
  )
}