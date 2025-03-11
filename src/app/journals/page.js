"use client";
import React, { useState, useEffect } from 'react';
import '../../styles/journals.css';
import TopBar from '../UI/TopBar.jsx';
import { UserAuth } from '../context/AuthContext';
import dynamic from 'next/dynamic';
import debounce from '../utils/debounce';
import 'react-quill/dist/quill.snow.css';

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
  const { user } = UserAuth();
  const userId = user?.uid; 
  const [quillContent, setQuillContent] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    if (selectedEntry) {
      setQuillContent(selectedEntry.content);
    }
  }, [selectedEntry]);

  const saveEntryContent = (content) => {
    console.log(`Saving content: ${content}`);
    if (selectedEntry) {
      // Mock function for saving entry
      console.log(`Entry ${selectedEntry.id} updated`);
    }
  };

  const debouncedSaveEntry = debounce((content) => {
    saveEntryContent(content);
  }, 1000);

  return (
    <div className='app'>
      <TopBar />

      <div className='header'>
        <h1>My Journal</h1>
        <div className='title-input'>New Title? (placeholder)</div>
      </div>

      <div className='home-grid'>
        <div className='left-side'>
          <div className='border-box'>
            <div className='content-box'>
              <div className='content-header'>
                <p>March 2025</p>
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
              <div className='prompt-input'>New Prompt... (placeholder)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
