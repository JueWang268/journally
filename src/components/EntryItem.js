import React, {useState} from 'react'
import './JournalSideBar.css'

export default function EntryItem(
    {entry, 
    handleRenameEntry, 
    handleDeleteEntry }
    ) {
    const [isBeingRenamed, setIsBeingRenamed] = useState(true)
    // const [entryTitle, setEntryTitle] = useState(entry.title)
    // console.log(entry.date)
    return (
      <li key={entry.id} className='entry-card'>
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
                setIsBeingRenamed(false)
              }
            }
          } onBlur={()=>setIsBeingRenamed(false)}/> :
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

