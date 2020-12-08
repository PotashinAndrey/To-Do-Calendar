import React from 'react';
import './ListItem.css';
import CheckBox from '../../utils/CheckBox.jsx';
export default function ListItem({ note, onClick }) {

  return (
    <div onClick={() => {onClick(note.id)}} className="listitem">
      <CheckBox done={false} />
      <p className="name"> {note.name} </p>
      <p className="discription"> {note.discription} </p>
      { note.time ? <p className="time"> {note.time.toLocaleString()} </p> : null}
    </div>
  )
}