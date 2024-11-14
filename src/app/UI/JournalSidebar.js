import React from 'react'
import "./JournalSideBar.css"
import NewJournalButton from './NewJournalButton'
import JournalItem from './JournalItem'
// import { fetchJournals, fetchUsers } from '../lib/data.ts'


export default function JournalSidebar( {
  journals,
  selectedID,
  handleNewJournal, 
  handleDeleteJournal,
  handleRenameJournal,
  handleJournalClick, 
  handleBackButton,
  // DL
  handleAddTag,
  handleRemoveTag} ) {

    // sort journals by date (DL)
    const sortedJournals = journals.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Compare dates in descending order
      if (dateA && dateB) return dateB - dateA;
      if (dateA) return -1;
      if (dateB) return 1;
      return 0;
    });
    
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
        sortedJournals.map(journal => {
          
          return (
            <div className={"journal-item" + (selectedID === journal.id? ' selected' : '')}
            onClick={() => {
              handleJournalClick(journal.id)}}
            >

              <JournalItem  key={journal.id}  journal={journal}
              handleRenameJournal={handleRenameJournal}
              handleDeleteJournal={handleDeleteJournal}
              // DL
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag} />
              
            </div>
          )})}
        </ul>
      </div>

    </>
  )
}