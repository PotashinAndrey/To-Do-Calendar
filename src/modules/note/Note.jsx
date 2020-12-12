import React, { useState } from 'react';
import './Note.css';
import useNotesContext from '../Contexts/NotesContext.jsx';
import NoteClass from '../Model/NoteClass.js';

export default function Note() {
  const [name, setName] = useState('');
  const [discription, setDiscription] = useState('');
  const { notesState, notesDispatch } = useNotesContext();

  function createNote() {
    if (name.length === 0) return;

    const note = new NoteClass(name, discription);

    notesDispatch(note);
    setName('');
    setDiscription('');
  }

  return (
    <div className="note notewrapper">
      <label htmlFor="name">Введите название: </label>
      <input
        type="text"
        name="name"
        className="notename"
        onChange={e => setName(e.target.value)}
        value={name}
        placeholder="Введите название..."
      />
      <hr />
      <label htmlFor="description">Введите описание:</label>
      <textarea
        nam="description"
        value={discription}
        onChange={e => setDiscription(e.target.value)}
        placeholder="Введите описание..."
      ></textarea>
      <button onClick={createNote} >Добавить</button>
    </div>
  )
}