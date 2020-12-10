import React, { useState } from 'react';
import './Modal.css';

export default function Modal({ children, text = null, onClick, isOpen}) {
  if (isOpen) {


    return (
      <div className="main" onClick={() => onClick()}>
        <div className="body" onClick={e => e.stopPropagation()} >
          <h1>{text.header }</h1>
          <p>{text.main}</p>
          {children}
          <button onClick={() => onClick()}>Закрыть</button>
        </div>
      </div>
    )
  } else {
    return (
      null
    )
  }
}