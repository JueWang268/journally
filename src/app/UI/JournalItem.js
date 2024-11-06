import React, {useState} from 'react'
// import '../../styles/Tags.css';

export default function JournalItem(
    { key,
    journal, 
    handleRenameJournal, 
    handleDeleteJournal,
    handleAddTag,
    handleRemoveTag }
    ) {
    const [isBeingRenamed, setIsBeingRenamed] = useState(false)
    const [isTagRenamed, setIsTagRenamed] = useState(false)

    return (
      <li key={key} style={{display: "flex", width: "100%", flexDirection: "column"}}>
        {/* DL */}
        <div className="journal-title-container">
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
        </div>
        
        
        {/* Tags */}
        <div className='tag-container'>
          {isTagRenamed ? 
            <input type="text" defaultValue={journal.tag} className="journal-tag" 
            autoFocus={true} onFocus={e=>e.target.select()} onKeyDown={
              (e) => {
                if (e.key === "Enter") {
                  setIsTagRenamed(false)
                  handleAddTag(journal.id, e.target.value)
                }
                else if (e.key === "Escape"){
                  setIsTagRenamed(false)
                }
              }
            } onBlur={()=>setIsTagRenamed(false)}/> :
            (journal.tag ? (
              <span className="journal-tag">{journal.tag}</span>
            ): null)
          }

          <div className="action-button-container">
              <button className="edit-button" onClick={
                e => {
                  e.stopPropagation()
                  setIsTagRenamed(true)}
              } >
              ➕
              </button>
              <button className="edit-button" onClick={(e) => {
                e.stopPropagation()
                handleRemoveTag(journal.id)
              }
              }>
              ❌
              </button>
          </div>
        </div>
        
    </li>
  )
}

