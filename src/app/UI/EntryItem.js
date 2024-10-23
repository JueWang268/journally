import React, {useState} from 'react'
import './JournalSideBar.css'
import dateFormat from '../../config/dateFormat'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default function EntryItem(
    {entry, 
    handleRenameEntry, 
    handleDeleteEntry, 
    handleEntryClick,
    handleDateChange,
    turnOffRenamingItem,
    renamed,
    selected }
    ) {
    const [isBeingRenamed, setIsBeingRenamed] = useState(renamed)
    const [isBeingDeleted, setIsBeingDeleted] = useState(false)
    const [isSettingDate, setIsSettingDate] = useState(false)

    return (
      <li key={entry.id} 
        className={'entry-card' + (selected? " selected": "")} 
        onClick={handleEntryClick}
        onMouseLeave={e => {setIsBeingDeleted(false); setIsSettingDate(false)}}
      >
        {
          isBeingRenamed ? 
          <input type="text" defaultValue={entry.title}className="entry-title" 
          autoFocus={true} onFocus={e=>e.target.select()} onKeyDown={
            (e) => {
              if (e.key === "Enter") {
                setIsBeingRenamed(false)
                handleRenameEntry(entry.id, e.target.value)
              }
              else if (e.key === "Escape"){
                setIsBeingRenamed(false)
              }
            }
          } onBlur={() => setIsBeingRenamed(false)}/> :
          <div className='entry-title'> {entry.title} </div>
        }

        {
          isSettingDate? 
          (<DatePicker className="date-picker" selected={entry.date}
          onChange={
            (date) => {
              handleDateChange(date)
              setIsSettingDate(false)
            }
          }
          
          />) : 
          (

          <span style={{"display": "flex"}}>
          <div className="entry-date">
          {dateFormat.format(entry.date)}
        </div>
        
        <button className="edit-button date-pick-button"
        onClick={ (e) => {
          e.stopPropagation()
          setIsSettingDate(true)
        }}
      >
      📅
      </button>
          </span>

          )
          
        }
        
        
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
                }}
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

