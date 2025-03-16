"use client";
import React, { useState, useEffect } from 'react';
import '../../styles/journals.css';
import TopBar from '../UI/TopBar.jsx';
import '../../styles/BgTopBar.css';
import { UserAuth } from '../context/AuthContext';
import dynamic from 'next/dynamic';
import debounce from '../utils/debounce';
import 'react-quill/dist/quill.snow.css';
import Loading from "../journals/loading";

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

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
  'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image', 'align', 'color', 'code-block',
];

export default function Journals() {
  const {
        user, authLoading, authError,
        userSignIn, userSignUp,
        googleSignIn,
        userSignOut
      } = UserAuth();
  const userId = user?.uid;
  const [loading, setLoading] = useState(true);
  const [quillContent, setQuillContent] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [title, setTitle] = useState("");

  const [ENTRIES, setEntries] = useState([
    {id: 1, title: "Intro & Blur - 12 pages", content: ""},
    {id: 2, title: "Chapter 1 - New Beginnings", content: ""},
    {id: 3, title: "Chapter 2 - The Path Awaits", content: ""}
  ]);

  useEffect(() => {
    if (selectedEntry) {
      setQuillContent(selectedEntry.content);
      setTitle(selectedEntry.title)
    }
  }, [selectedEntry]);

  const saveEntryContent = (content) => {
    console.log(`Saving content: ${content}`);
    if (selectedEntry) {
      console.log(`Entry ${selectedEntry.id} updated`);
    }
  };

  const debouncedSaveEntry = debounce((content) => {
    saveEntryContent(content);
  }, 1000);

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setTitle(entry.title);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === "Enter" && selectedEntry) {
        setSelectedEntry((prevEntry) => ({
            ...prevEntry,
            title: title,
        }));

        setEntries((prevEntries) =>
            prevEntries.map((entry) =>
                entry.id === selectedEntry.id ? {...entry, title: title} : entry
            )
        );
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer)
  }, []);

  if (loading){
    return <Loading />;
  }

  return (
    <div className='app'>
      <TopBar loggedIn = {Boolean(user)} onProfileClick={userSignOut}/>
      

      <div className='header'>
        <h1>My Journal</h1>
        <input 
            type="text"
            placeholder="New Title?"
            className="title-input" 
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyPress}
        />
      </div>

      <div className='home-grid'>
        <div className='left-side'>
          <div className='border-box'>
            <div className='content-box'>
              <div className='content-header'>
                <p>March 2025</p>
              </div>

              <div className='entries-container'>
                {ENTRIES.map((entry) => (
                    <div 
                        className={`entries ${selectedEntry?.id === entry.id ? "selected" : ""}`}
                        key={entry.id}
                        onClick={() => handleEntryClick(entry)}
                    >
                        <div className='number-box'>
                            <p>{entry.id.toString().padStart(2, '0')}</p>
                        </div>
                        <div className='title-container'>
                            <p>{entry.title}</p>
                        </div>
                    </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        <div className='right-side'>
          <div className='border-box'>
            <div className='entries-grid'>
              <button className='add-button'>
                <p>Entries</p>
                <p>+</p>
              </button>
              <div className='writing-pad'>
                <QuillEditor
                  value={quillContent}
                  onChange={(content) => {
                    setQuillContent(content);
                    debouncedSaveEntry(content);
                  }}
                  modules={quillModules}
                  formats={quillFormats}
                //   className="w-full h-[70%] mt-10 bg-white"
                    className="quill-editor"
                />
              </div>
            </div>
            <div className='prompt-container'>
                <input type="text" placeholder="New Prompt..." className="prompt-input" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
