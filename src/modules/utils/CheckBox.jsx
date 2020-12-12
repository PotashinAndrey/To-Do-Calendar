import React from 'react';
import './CheckBox.css';

export default function CheckBox({ done, onClick }) {
  function checkHandler(e) {
    onClick();
    e.stopPropagation();
  }

  return (
    <button
      className="checkbox"
      style={done ? { background: 'blue' } : null}
      onClick={e => checkHandler(e)}
    ></button>
  )
}