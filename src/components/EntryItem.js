import React, {useState} from 'react'
import './JournalSideBar.css'

export default function EntryItem(
    {entry, 
    handleRenameEntry, 
    handleDeleteEntry, 
    handleEntryClick,
    turnOffRenamingItem,
    renamed }
    ) {
    const [isBeingRenamed, setIsBeingRenamed] = useState(renamed)

    const doneRenaming = (nid) => {
        setIsBeingRenamed(false)
        turnOffRenamingItem(nid)
    }

    return (
      <li key={entry.id} className='entry-card' onClick={handleEntryClick}>
        {isBeingRenamed ? 
          <input type="text" defaultValue={entry.title} className="entry-title" 
          autoFocus={true} onFocus={e=>e.target.select()} onKeyDown={
            (e) => {
              if (e.key === "Enter") {
                setIsBeingRenamed(false)
                handleRenameEntry(entry.id, e.target.value)
                // setEntryTitle(e.target.value)
              }
              else if (e.key === "Escape"){
                doneRenaming(entry.id)
              }
            }
          } onBlur={()=>doneRenaming(entry.id)}/> :
          <div className='entry-title'> {entry.title} </div>
        }
        {/*<div className="entry-date">{entry.getDate()}</div>*/}
        
        <div className="action-button-container">
            <button className="edit-button" onClick={
                () => {setIsBeingRenamed(true)}
            } >
            🖊️
            </button>
            <button className="edit-button" onClick={() => handleDeleteEntry(entry.id)}>
            🗑️
            </button>
        </div>
    </li>
  )
}

