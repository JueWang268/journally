"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import JournalSidebar from './UI/JournalSidebar.js';
import '../styles/App.css';
import Journal from '../models/Journal.js';
import Entry from '../models/Entry.js';
import DeleteDialogue from './UI/DeleteDialogue.js';
import EntryItem from './UI/EntryItem.js';
import DataPointItem from './UI/DataPointItem.js';
import DataPointGraph from './UI/DataPointGraph.js';
import dateFormat from '../config/dateFormat.js';
import useJournals from './hooks/useJournals.js';
import useEntries from './hooks/useEntries.js';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const App = () => {

  
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };
  
  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];
  
  const TODAY = new Date();
  const USER_ID = '410544b2-4001-4271-9855-fec4b6a6442a';
  const { 
    journals_, 
    loading, 
    error, 
    selectedJournal, 
    setSelectedJournal, 
    getJournal, 
    addJournal, 
    editJournal, 
    removeJournal } = useJournals();
    
    const { 
      entries, 
      loading: entriesLoading, 
      error: entriesError, 
      selectedEntry, 
      setSelectedEntry, 
      addEntry, 
      editEntry, 
      removeEntry,
      removeJournalEntries } = useEntries(selectedJournal?.id);
      
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [retypeProps, setRetypeProps] = useState(null);
      const [view, setView] = useState("writingPad");
      const [showJournalBar, setShowJournalBar] = useState(true);
      
      
      const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false
      });
      const [quillContent, setQuillContent] = useState(null);
      useEffect(() => {
        // Whenever selectedEntry changes, update local state with new content
        setQuillContent(selectedEntry?.content);
      }, [selectedEntry]);

      useEffect(()=>{console.log("JUST RENDERED");
      });
      
  const findJournal = (ID) => journals_.find(j => j.id === ID);

  const jids = journals_.map(j => j.id);
  
  const handleJournalClick = (jid) => {
    const j = findJournal(jid)
    // console.log(`journal reselected to: ${JSON.stringify(j)}`)
    setSelectedJournal(j)
  }

  const toggleJournalBar = () => setShowJournalBar(!showJournalBar)

  const toggleView = () => {
    setView(prevView => (prevView === "writingPad" ? "dailyStats" : "writingPad"))
  }
  
  const createNewJournal = () => {
    const title = `New Journal ${(new Date()).toISOString().split('T')[0]}`;
    addJournal(title, USER_ID);
  }
  
  const createNewEntry = () => {
    addEntry(`${dateTimeFormat.format(new Date())}`, "{User Content}");
  }

  const askForInput = (journalName) => {
    setIsDialogOpen(true);
    return new Promise((resolve) => {
      setRetypeProps({
        journalName,
        onConfirm: (result) => {
          // result is true when user types title right
          setIsDialogOpen(!result);
          resolve(result);
        },
        onCancel: () => {
          setIsDialogOpen(false);
          resolve(false);
        },
      })
    });
  }

  const deleteJournal = async (journalId) => {
    const confirmed = await askForInput(findJournal(journalId).title);
    // const confirmed = true
    let nextJ = selectedJournal?.id;
    if (journalId === selectedJournal?.id && journals_.length > 1){
      if (jids.indexOf(journalId) + 1 < journals_.length){
        nextJ = jids[jids.indexOf(journalId) + 1];
      }
      else{
        nextJ = jids[0];
      }
    }

    // dialogue wont show up journal without entries
    if (confirmed) {
      removeJournal(journalId);
      removeJournalEntries(journalId);
      // action buttons must stop event propagation
      handleJournalClick(nextJ);
    }
  }

  const renameEntry = (entryID, newName) => {
    const old_entry = entries.filter(e => e.id === entryID)[0];
    editEntry(entryID, newName, old_entry.content, old_entry.date);
  }

  const delEntry = (entry) => {
    let nextN = null; 
    let nid = entry.id;
    let nids = entries.map(n => n.id);

    if (selectedEntry === entry){
      if (nids.length > 1) {
        if (nids.indexOf(entry) + 1 < entries.length){
          nextN = entries[nids.indexOf(nid) + 1];
        } else {
          nextN = entries[0];
        }
      } else {
        nextN = null;
      }
    } else {
      nextN = selectedEntry;
    }
    console.log(`${JSON.stringify(nids)} ${JSON.stringify(nextN)}`);
    
    setSelectedEntry(nextN);
    removeEntry(entry.id);
  }
  
  const saveEntryContent = (nid, content) => {
    console.log(`saving content ${JSON.stringify(content)}`);
    
    const old_entry = entries.find(n => n.id === nid);
    editEntry(nid, old_entry.title, content, old_entry.date);
  }

  const updateDate = (nid, newDate) => {
    const old_entry = entries.find(n => n.id === nid);
    editEntry(nid, old_entry.title, old_entry.content, newDate);
  }

  const debounce =(func, delay = 1000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSaveEntry = debounce(
  (entryId, content) => {
      saveEntryContent(entryId, content);
    }, 
  1000);
  

  return (
    <div className="app">
      <div className="navbar">
        <div>
          <Image src="/icon.png" width={20} height={20} alt="journal logo"/>
        </div>
        <div className="nav-item" onClick={toggleJournalBar}>Journals</div>
        <div className="nav-item">Calendar</div>
        <div className="nav-item">Graph</div>
        <div className="nav-item">🌏</div>
        <div className="user-icon" onClick={() => alert('User options')}>👤</div>
      </div>

      <div className="main-layout">
        
        {
          showJournalBar &&
          <JournalSidebar 
            journals={journals_}
            selectedID={selectedJournal?.id}
            handleNewJournal = {createNewJournal}
            handleDeleteJournal = {deleteJournal}
            handleRenameJournal = {editJournal}
            handleJournalClick={handleJournalClick}
            handleBackButton={toggleJournalBar}/>
        }
        
        <div className="entries-sidebar">
          <div className="flex-container">
            <h3>
              {view === "writingPad"? "Entries": "Stats"}
            </h3>

            <button className="new-entry-button" onClick={createNewEntry}>
            +
            </button>

            <button className="toggle-button" onClick={() => {
              view === "writingPad" ?
              setView("dailyStats") :
              setView("writingPad")
            }}>
              <h3>Change to {view === "writingPad" ? "Daily Stats": "Written Entries"}</h3>
            </button>
          
          </div>
        {
          selectedJournal ? 
            (
              view === "writingPad" ?
              (entries.length > 0 ? (
              <ul>
                {
                  entries.map(entry => (
                    <EntryItem 
                      entry={entry}
                      handleRenameEntry={renameEntry}
                      handleDeleteEntry={() => {delEntry(entry)}}
                      handleEntryClick={()=> {
                        // console.log(`${JSON.stringify(entry.date)}`);
                        setSelectedEntry(entry);
                      }}
                      handleDateChange={(newDate) => {updateDate(entry.id, newDate)}}
                      turnOffRenamingItem={() => {}}
                      renamed={false}
                      selected={entry.id === selectedEntry?.id}
                    />
                  ))
                }
              </ul>) :
            (
              <div> No entries in this journal. 
              <button className="start-writing-button" 
              onClick={createNewEntry}>
              Start Writing
              </button> </div>
            )): 
            <div className="stats-bar">
              {/* demo purposes */}
              <DataPointItem name="Work productivity" color="red"/>
              <DataPointItem name="Coffee consumed" color="turquoise"/>
              <DataPointItem name="Miles run in morning" color="green"/>
              <DataPointItem name="Miles run in Evening" color="yellow"/>

              {/* demo ends */}
            </div>
          ) : <div className="no-journal-message"> No journal selected </div>
        }
      </div>
        <div className="main-content">
          <div className="view-switch">
            <div className={`slider ${view === 'writingPad' ? 'left' : 'right'}`} onClick={toggleView}>
              <span className="slider-text">{view === 'writingPad' ? 'Writing Pad' : 'Daily Data'}</span>
              <div className="slider-button"></div>
            </div>

          </div>

        {view === "writingPad" ? (
          selectedEntry &&
          <>
            <div className="entry-path">

              {
              /* it looks like no methods in the entry class work.
              Probably a "this" binding issue. 
              Avoid instance methods
              */
              selectedJournal.title} &gt; {selectedEntry.title} : 
                {selectedEntry.date}
            </div>
            <QuillEditor
              value={quillContent}
              onChange={(content) => {
                console.log(`new content ${content}`);
                setQuillContent(content);
                debouncedSaveEntry(selectedEntry.id, content);
              }}
              modules={quillModules}
              formats={quillFormats}
              className="w-full h-[70%] mt-10 bg-white"
            />
          </>
        ) : (
          <div>
          {/* demo purposes */}
          <DataPointGraph />
          {/* demo purposes */}
          </div>
        )}

        {isDialogOpen && (
          <DeleteDialogue
            journalName={retypeProps.journalName}
            onConfirm={retypeProps.onConfirm}
            onCancel={retypeProps.onCancel}
            />
          )}
        </div>
        
      </div>
    </div>
  )
}

export default App;