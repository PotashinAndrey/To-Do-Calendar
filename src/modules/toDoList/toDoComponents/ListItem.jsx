import React, { useState, useEffect } from 'react';
import './ListItem.css';
import CheckBox from '../../utils/CheckBox.jsx';
import useNotesContext from '../../Contexts/NotesContext.jsx';

export default function ListItem({ note, onClick, isCheckbox = true }) {
  const { notesDispatch } = useNotesContext();

  const style = { textDecoration: 'line-through' };
  const [checked, setChecked] = useState(note.state === 'todo' ? false : true);

  useEffect(() => {
    const state = { state: checked ? 'done' : 'todo' };
    notesDispatch({ ...note, ...state });
  }, [checked]);

  useEffect(() => {
    setChecked(note.state === 'todo' ? false : true);
  }, [note]);

  function unChecked() {
    setChecked(!checked);
  }

  const priorityVariants = {
    'low': 'rgba(0, 255, 0, 0.3)',
    'medium': 'rgba(255, 255, 0, 0.3)',
    'high': 'rgba(255, 0, 0, 0.3)'
  }

  return (
    <div style={{ background: priorityVariants[note.priority] }} onClick={() => { onClick(note) }} className="listitem">
      { isCheckbox ? <CheckBox done={note.state === 'todo' ? false : true} onClick={unChecked} /> : <p></p> }
      <p
        className="name"
        style={note.state === 'done' || note.state === 'canceled' ? style : null}
      > {note.name} </p>
      <p
        className="discription"
        style={note.state === 'done' || note.state === 'canceled' ? style : null}
      > {note.discription} </p>
      <p className="time"> {note.creationTime.toLocaleString()} </p>
    </div>
  )
}
