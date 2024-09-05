import React, {useState} from 'react'
import './JournalSideBar.css'
import dateFormat from '../config/dateFormat'

export default function EntryItem(
    {entry, 
    handleRenameEntry, 
    handleDeleteEntry, 
    handleEntryClick,
    turnOffRenamingItem,
    renamed,
    selected }
    ) {
    const [isBeingRenamed, setIsBeingRenamed] = useState(renamed)
    const [isBeingDeleted, setIsBeingDeleted] = useState(false)

    const doneRenaming = (nid) => {
        setIsBeingRenamed(false)
        turnOffRenamingItem(nid)
    }

    return (
      <li key={entry.id} 
        className={'entry-card' + (selected? " selected": "")} 
        onClick={handleEntryClick}
        onMouseLeave={e => {setIsBeingDeleted(false)}}
      >
        {
          isBeingRenamed ? 
          <input type="text" defaultValue={entry.title} className="entry-title" 
          autoFocus={true} onFocus={e=>e.target.select()} onKeyDown={
            (e) => {
              if (e.key === "Enter") {
                setIsBeingRenamed(false)
                handleRenameEntry(entry.id, e.target.value)
              }
              else if (e.key === "Escape"){
                doneRenaming(entry.id)
              }
            }
          } onBlur={()=>doneRenaming(entry.id)}/> :
          <div className='entry-title'> {entry.title} </div>
        }
        

          
        <div className="entry-date">
          {dateFormat.format( entry.dateModified )}
        </div>
        


        <div className="action-button-container">
            <button className="edit-button" onClick={
                (e) => {
                  e.stopPropagation()
                  setIsBeingRenamed(true)}
            } >
            🖊️
            </button>
            <button className="edit-button" onClick={
              (e) => {
                  e.stopPropagation()
                  setIsBeingDeleted(true)
                }
              } >
            🗑️
            </button>

            {
              isBeingDeleted && 
              <div className="confirm-dialogue" style={{display: "flex"}}>
                <button className="edit-button confirm-delete-button"
                onClick={ (e) => {
                e.stopPropagation()
                handleDeleteEntry(entry.id)
                setIsBeingDeleted(false)
              } 
                }
                >
                ✅
                </button>
                
                <button className="edit-button cancel-delete-button"
                onClick={ (e) => {
                  e.stopPropagation()
                  setIsBeingDeleted(false)}
                }
                >
                ❎ 
                </button>
              </div>
              
            }
            
        </div>
    </li>
  )
}

