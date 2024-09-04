import React, {useState} from 'react'
import './JournalSideBar.css'

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
      <li key={entry.id} className={'entry-card' + (selected? " selected": "")} onClick={handleEntryClick}>
        {isBeingRenamed ? 
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
        {/*<div className="entry-date">{entry.getDate()}</div>*/}
        
        <div className="action-button-container">
            <button className="edit-button" onClick={
                (e) => {
                  e.stopPropagation()
                  setIsBeingRenamed(true)}
            } >
            🖊️
            </button>
            <button className="edit-button" onClick={
              (e) =>{
                  e.stopPropagation()
                  setIsBeingDeleted(true)
                }
              }
            >
            🗑️
            </button>

            {
              isBeingDeleted && 
              <div className="confirm-dialogue">
                <button className="confirm-delete-button"
                onClick={ (e) => {
                e.stopPropagation()
                handleDeleteEntry(entry.id)
                setIsBeingDeleted(false)
              } 
                }
                >
                ✅
                </button>
                
                <button className="cancel-delete-button"
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

