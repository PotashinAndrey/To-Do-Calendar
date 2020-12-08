import React from 'react';
import './AboutEvent.css';
import useNoteContext from '../Contexts/NoteContext.jsx';

export default function AboutEvent({ itemId }) {
  const { noteState, noteDispatch } = useNoteContext();

  const note = noteState.notes.filter(e => e.id === itemId)[0];

  if (note === undefined) throw new Error('нет переданного идентификатора');

  console.log(note);

  return (
    <div className="aboutevent" >
      <span className="aboutevent-span">
        <h2>{note.name}</h2>
        <p>{note.time.toLocaleString()}</p>
      </span>
      <p className="aboutevent-p">{note.discription}</p>
    </div>
  )
}