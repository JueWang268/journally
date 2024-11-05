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
    const [newTag, setNewTag] = useState('')

    return (
      <li key={key} style={{display: "flex", width: "100%", flexDirection: "column"}}>
        {/* added a div */}
        {/* <div style={{display: "flex", alignItems: "center", width: "100%"}}> */}
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
        {/* </div> */}

        {/* Tag Display */}
        <div className="tags-container">
          {journal.tags && journal.tags.length > 0? (
            journal.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button
                  classname="remove-tag-button"
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

        {/* tag input */}
        <div className="tag-input-container">
          <input
            type="text"
            placeholder="Add a tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter" && newTag.trim()){
                handleAddTag(journal.id, newTag);
                setNewTag('');
              }
            }}
            className="tag-input"
          />
          <button
            onClick={() => {
              if (newTag.trim()){
                handleAddTag(journal.id, newTag);
                setNewTag('');
              }
            }}
            className="add-tag-button"
          >
            ➕
          </button>
        </div>
    </li>
  )
}

