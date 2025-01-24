"use client"
import React from 'react';
import '../../../styles/CardDisplay.css';
import Image from 'next/image';


export default function Card({ title, icons, content , width}) {
  // title: string
  // icons: [<Image/>]
  // content: <div>
	return (
		<div className='card-container' style={{"width": width}}>
				<div className='card-content'>
				
          <div className='card-header'>
            <h1 className='title'>
              {title}
            </h1>
            
            <div className='icons'>
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