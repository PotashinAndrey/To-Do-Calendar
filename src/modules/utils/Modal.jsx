import React, { useState } from 'react';
import './Modal.css';

export default function Modal({ children, text = null, onClick }) {
  const [open, setOpen] = useState(true);

  if (open) {
    return (
      <div className="main">
        <div className="body" >
          <h1>{text.header }</h1>
          <p>{text.main}</p>
          {children}
          <Button onClick={() => onClick()}>Закрыть</Button>
        </div>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}