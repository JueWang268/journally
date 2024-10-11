import React from 'react'
import "./JournalSideBar.css"
import NewJournalButton from './NewJournalButton'
import JournalItem from './JournalItem'


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
            // const journalNameSpan = <span className='journal-title'>{journal.title}</span>
            return (
              <div className={"journal-item" + (selectedID === journal.id? ' selected' : '')}
              onClick={() => {
                handleJournalClick(journal.id)}}
              >

                <JournalItem  key={journal.id}  journal={journal}
                handleRenameJournal={handleRenameJournal}
                handleDeleteJournal={handleDeleteJournal} />
                
              </div>
            )})}
        </ul>
      </div>

    </>
  )
}