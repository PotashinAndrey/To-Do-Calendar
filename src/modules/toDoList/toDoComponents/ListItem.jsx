import React, { useState, useEffect } from 'react';
import './ListItem.css';
import CheckBox from '../../utils/CheckBox.jsx';
import useNoteContext, { getById } from '../../Contexts/NoteContext.jsx';

export default function ListItem({ noteId, onClick }) {
  const style = { textDecoration: 'line-through' };
  const { noteState, noteDispatch } = useNoteContext();
  const [currentNote, setCurrentNote] = useState(getById(noteState, noteId));
  const [checked, setChecked] = useState(currentNote.state === 'Не выполнено' ? false : true);

  useEffect(() => {
    const state = { state: checked ? 'Выполнено' : 'Не выполнено' };
    noteDispatch({ ...currentNote, ...state });
    setCurrentNote({ ...currentNote, ...state });
  }, [checked]);

  useEffect(() => {
    setCurrentNote(getById(noteState, noteId));
    setChecked(currentNote.state === 'Не выполнено' ? false : true)
  }, [noteState]);

  const priorityVariants = {
    'Низкий': 'rgba(0, 255, 0, 0.3)',
    'Средний': 'rgba(255, 255, 0, 0.3)',
    'Высокий': 'rgba(255, 0, 0, 0.3)'
  }

  return (
    <div style={{background: priorityVariants[currentNote.priority]}} onClick={() => { onClick(currentNote) }} className="listitem">
      <CheckBox done={currentNote.state === 'Не выполнено' ? false : true} onClick={setChecked} />
      <p
        className="name"
        style={currentNote.state === 'Выполнено' || currentNote.state === 'Отменено' ? style : null}
      > {currentNote.name} </p>
      <p
        className="discription"
        style={currentNote.state === 'Выполнено' || currentNote.state === 'Отменено' ? style : null}
      > {currentNote.discription} </p>
      { currentNote.time ? <p className="time"> {currentNote.time.toLocaleString()} </p> : null}
    </div>
  )
}