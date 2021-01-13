import React from 'react';
import './Modal.css';

export default function Modal({ children, isOpen, closeHandler}) {
  if (isOpen) {


    return (
      <div className="main" onClick={closeHandler}>
        <div className="body" onClick={e => e.stopPropagation()} >
          {children}
        </div>
      </div>
    )
  } else {
    return (
      null
    )
  }
}