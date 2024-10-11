import React, {useState} from 'react'

export default function JournalItem(
    { key,
    journal, 
    handleRenameJournal, 
    handleDeleteJournal }
    ) {
    const [isBeingRenamed, setIsBeingRenamed] = useState(false)

    return (
      <li key={key} style={{display: "flex", width: "100%"}}>
        {isBeingRenamed ? 
          <input type="text" defaultValue={journal.title} className="journal-title" 
          autoFocus={true} onFocus={e=>e.target.select()} onKeyDown={
            (e) => {
              if (e.key === "Enter") {
                setIsBeingRenamed(false)
                handleRenameJournal(journal.id, e.target.value)
              }
              else if (e.key === "Escape"){
                setIsBeingRenamed(false)
              }
            }
          } onBlur={()=>setIsBeingRenamed(false)}/> :
          <span className='journal-title'> {journal.title} </span>
        }

        <div className="action-button-container">
            <button className="edit-button" onClick={
                e => {
                  e.stopPropagation()
                  setIsBeingRenamed(true)}
            } >
            🖊️
            </button>
            <button className="edit-button" onClick={(e) => {
              e.stopPropagation()
              handleDeleteJournal(journal.id)
            }
            }>
            🗑️
            </button>
        </div>
    </li>
  )
}

