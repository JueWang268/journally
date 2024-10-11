import React from 'react';


export default function NewJournalButton ({ handleNewJ }) {
    return (
        <button 
        className='new-journal-button'
        onClick={handleNewJ}
        >
        +
        </button>
    );
}