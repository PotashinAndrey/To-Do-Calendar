import React, { useState } from 'react';
import './Note.css';
import useNoteContext, { uuidv4 } from '../Contexts/NoteContext.jsx';

export default function Note() {
  const [name, setName] = useState('');
  const [discription, setDiscription] = useState('');
  const { noteState, noteDispatch } = useNoteContext();

  function createNote() {
    if (name.length === 0) return;

    const note = {
      time: new Date(),
      children: [],
      state: 'Не выполнено',
      priority: 'Не выбран',
      id: uuidv4(),
      name: name,
      discription: discription,
      deadline: null,
      cost: 0
    }

    const notes = noteState.notes.concat(note);

    noteDispatch({ notes });
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