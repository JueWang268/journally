"use client";
import React, { useState, useEffect } from 'react';
import { DataPointsProvider, useDataPointsContext } from './context/DatapointsContext';
import Image from 'next/image';
import JournalSidebar from './UI/JournalSidebar.js';
import NewEntryDataButton from './UI/NewEntryDataButton.js';
import '../styles/App.css';
import Journal from '../models/Journal.js';
import Entry from '../models/Entry.js';
import DeleteDialogue from './UI/DeleteDialogue.js';
import EntryItem from './UI/EntryItem.js';
import StatsBar from './UI/StatsBar.js';
import DataPointGraph from './UI/DataPointGraph.js';
import dateFormat from '../config/dateFormat.js';
import useJournals from './hooks/useJournals.js';
import useEntries from './hooks/useEntries.js';
import debounce from './utils/debounce.js';

// Tony's imports
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/config.js'
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';


const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const App = () => {
  const [user, authLoading] = useAuthState(auth);
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [retypeProps, setRetypeProps] = useState(null);
  const [view, setView] = useState("writingPad");
  const [showJournalBar, setShowJournalBar] = useState(true);
  const [quillContent, setQuillContent] = useState(null);

  const USER_ID = '410544b2-4001-4271-9855-fec4b6a6442a';
  // const temp_uid = user?.uid;
  const temp_uid = USER_ID;

  const {
    journals_,
    loading: journalsLoading,
    error,
    selectedJournal,
    setSelectedJournal,
    getJournal,
    addJournal,
    editJournal,
    removeJournal,
    createTag,
    removeTag,
  } = useJournals(temp_uid);

  const {
    entries,
    loading: entriesLoading,
    error: entriesError,
    selectedEntry,
    setSelectedEntry,
    addEntry,
    editEntry,
    removeEntry,
    removeJournalEntries
  } = useEntries(selectedJournal?.id);

  // const { datapoints, dploading, dperror, createDatapoint, editDp, removeDp } = useDataPointsContext();

  // Auth check
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Selections of journals and entries
  useEffect(() => {
    setQuillContent(selectedEntry?.content);
  }, [selectedEntry]);

  useEffect(() => {
    if (selectedEntry?.journal_id !== selectedJournal?.id) {
      setSelectedEntry(entries[0]);
      // user[0].uid
      const userSession = sessionStorage.getItem('user');
      if (user[0]) {
        sessionStorage.setItem('user', true);
      } else if (!user[0] && !userSession) {
        router.push('/signin');
        console.log('pushed to signin');
      }
    }
  }, [selectedJournal, entries, selectedEntry, setSelectedEntry]);


  if (authLoading || journalsLoading || entriesLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    signOut(auth);
    sessionStorage.removeItem('user');
    router.push('/login');
    console.log('logged out');
  };

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

  // const { datapoints, dploading, dperror, createDatapoint, editDp, removeDp } = useDataPointsContext();

  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  });

  const findJournal = (ID) => journals_.find(j => j.id === ID);

  const jids = journals_.map(j => j.id);

  const handleJournalClick = (jid) => {
    const j = findJournal(jid)
    setSelectedJournal(j);
  }

  const toggleJournalBar = () => setShowJournalBar(!showJournalBar);

  const toggleView = () => {
    setView(prevView => (prevView === "writingPad" ? "dailyStats" : "writingPad"));
  }

  const createNewJournal = () => {
    const title = `New Journal ${(new Date()).toISOString().split('T')[0]}`;
    addJournal(title, temp_uid);
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
    // const confirmed = true;
    let nextJ = selectedJournal?.id;
    if (journalId === selectedJournal?.id && journals_.length > 1) {
      if (jids.indexOf(journalId) + 1 < journals_.length) {
        nextJ = jids[jids.indexOf(journalId) + 1];
      }
      else {
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

    if (selectedEntry === entry) {
      if (nids.length > 1) {
        if (nids.indexOf(entry) + 1 < entries.length) {
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

  // const debounce =(func, delay = 1000) => {
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => func(...args), delay);
  //   }
  // }

  const debouncedSaveEntry = debounce(
    (entryId, content) => {
      saveEntryContent(entryId, content);
    },
    1000);

  if (authLoading || journalsLoading || entriesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <div className="navbar">
        <div>
          <Image src="/icon.png" width={20} height={20} alt="journal logo" />
        </div>
        <div className="nav-item" onClick={toggleJournalBar}>Journals</div>
        <div className="nav-item">Calendar</div>
        <div className="nav-item">Graph</div>
        <div className="nav-item" >🌏</div>
        <div className="user-icon" onClick={() =>
          // alert('User options')
          handleLogout()
        }>👤</div>


      </div>

      <div className="main-layout">
        {
          showJournalBar &&
          <JournalSidebar
            journals={journals_}
            selectedID={selectedJournal?.id}
            handleNewJournal={createNewJournal}
            handleDeleteJournal={deleteJournal}
            handleRenameJournal={editJournal}
            handleJournalClick={handleJournalClick}
            handleBackButton={toggleJournalBar}
            // DL
            handleAddTag={createTag}
            handleRemoveTag={removeTag} />
        }

        <DataPointsProvider userId={USER_ID}>

          <div className="entries-sidebar">
            <div className="flex-container">
              <h3>
                {view === "writingPad" ? "Entries" : "Stats"}
              </h3>

              <NewEntryDataButton view={view} createNewEntry={createNewEntry} userId={USER_ID}>

              </NewEntryDataButton>

              <button className="toggle-button" onClick={() => {
                view === "writingPad" ?
                  setView("dailyStats") :
                  setView("writingPad")
              }}>
                {/* Possibily change h3 to something else to have flexibility for styles */}
                <h3>Change to {view === "writingPad" ? "Daily Stats" : "Written Entries"}</h3>
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
                              handleDeleteEntry={() => { delEntry(entry) }}
                              handleEntryClick={() => {
                                // console.log(`${JSON.stringify(entry.date)}`);
                                setSelectedEntry(entry);
                              }}
                              handleDateChange={(newDate) => { updateDate(entry.id, newDate) }}
                              turnOffRenamingItem={() => { }}
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
                      )) :
                    <StatsBar userId={USER_ID} />
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
            )
            }
          </div>

        </DataPointsProvider>


      </div>
    </div >
  )
}

export default App;