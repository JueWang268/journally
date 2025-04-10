"use client"
import {React, useState} from 'react';
import '../../../styles/CardDisplay.css';
import Image from 'next/image';


export default function Card({ title, icons, content, width, height, fontSize, onClick, onTitleClick=null, sx=null}) {
  // title: string
  // icons: [<Image/>]
  // content: <div>

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleTitleClick = (e) => {
    e.stopPropagation();  // prevent parent onClick
    setIsEditingTitle(true);
  }

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  }

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (newTitle !== title) {
      onTitleClick(title, newTitle); 
    }
  }
	return (
		<div className='card-container'
      onClick={onClick}
      style={{"height":height || "auto", "width": width || "auto", ...sx}}>
				<div className='card-content'>
          <div className='card-header'>
            {isEditingTitle ? (
              <input
                value={newTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleSubmit}  // submit on unfocus
                onKeyDown={(e) => { if (e.key === 'Enter') handleTitleSubmit(); }}
                autoFocus
              />
            ) : (
              <h1 className='title'
                  onClick={onTitleClick=== null? null: handleTitleClick}>
                {title}
              </h1>
            )}
            <div className='icons-holder'>
              {...icons}
            </div>
          </div>

          <div className="content-wrapper">
            {content}
          </div>
				</div>
		</div>
	);
}