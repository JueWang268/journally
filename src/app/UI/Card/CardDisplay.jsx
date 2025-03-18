"use client"
import React from 'react';
import '../../../styles/CardDisplay.css';
import Image from 'next/image';


export default function Card({ title, icons, content, width, height, fontSize, onClick, sx=null}) {
  // title: string
  // icons: [<Image/>]
  // content: <div>
	return (
		<div className='card-container'
      onClick={onClick}
      style={{"height":height || "auto", "width": width || "auto", ...sx}}>
				<div className='card-content'>
          <div className='card-header'>
            <h1 className='title' style={{"fontSize":fontSize || "auto"}}>
              {title}
            </h1>
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