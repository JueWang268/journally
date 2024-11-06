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

    // sort journals by tags alphabetically (DL)
    const sortedJournals = journals.slice().sort((a, b) => {
      if (a.tag && b.tag) return a.tag.localeCompare(b.tag);
      if (a.tag) return -1;
      if (b.tag) return 1;
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