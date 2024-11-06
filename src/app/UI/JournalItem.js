import React, {useState} from 'react'
import '../../styles/Tags.css';

export default function JournalItem(
    { key,
    journal, 
    handleRenameJournal, 
    handleDeleteJournal,
    handleAddTag,
    handleRemoveTag }
    ) {
    const [isBeingRenamed, setIsBeingRenamed] = useState(false)
    // const [newTag, setNewTag] = useState('')
    const [isTagRenamed, setIsTagRenamed] = useState(false)

    return (
      <li key={key} style={{display: "flex", width: "100%", flexDirection: "column"}}>
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


        {/* display tag */}
        <div className="tags-container">
          {journal.tags && journal.tags.length > 0? (
            journal.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button
                  className="remove-tag-button"
                  onClick={() => handleRemoveTag(journal.id, tag)}
                >
                  ❌
                </button>
              </span>
            ))
          ) : (
            <span className="no-tags">No tags available</span>
          )}
        </div>
        
        {/* input tag */}
        <div className="tag-input-container">
          {isTagRenamed ? (
            <input
              type="text"
              defaultValue="Add a tag"
              className="tag-input"
              autoFocus={true}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => {
                console.log("Key pressed:", e.key); // Log key presses
                if (e.key === "Enter") {
                  setIsTagRenamed(false);
                  handleAddTag(journal.id, e.target.value);
                } else if (e.key === "Escape") {
                  setIsTagRenamed(false);
                }
              }}
            />
          ) : (
            <span onClick={() => setIsTagRenamed(true)}>➕</span>
          )}
        </div>
    </li>
  )
}

