import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import './AddSmallNote.css';

const AddSmallNote = ({ type, addNote, newNote }) => {
  const types = {
    doings: "deadline",
    purchases: "cost",
    notes: 'ignore'
  }

  const [note, setNote] = useState({
    name: '',
    discription: '',
    [types[type]]: type === 'doings' ? new Date() : 0
  });

  function changeHandler(event) {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  function onOk(value) {
    setNote({ ...note, deadline: value._d });
  }

  useEffect(() => {
    if (!note.name || !note.name.length || note.cost && +note.cost <= 0 || note.deadline && note.deadline.getTime() <= new Date().getTime()) {
      addNote(null);
      return;
    }

    addNote(note);
  }, [note]);

  useEffect(() => {
    if (newNote !== null) return;

    setNote({
      name: '',
      discription: '',
      [types[type]]: type === 'doings' ? new Date() : 0
    });
  }, [newNote]);

  let variants;

  if (type === 'notes') {
    variants = null;
  } else if (type === 'purchases') {
    variants = <Input name="cost" value={note.cost} onChange={e => changeHandler(e)} placeholder="Цена..." />
  } else {
    variants = <DatePicker showTime onOk={onOk} />
  }


  return (
    <div className="addSmall-wrapper">
      <Input name="name" value={note.name} onChange={e => changeHandler(e)} placeholder="Название..." />
      <Input name="discription" value={note.discription} onChange={e => changeHandler(e)} placeholder="Описание..." />
      {variants}
    </div>
  )
}

export default AddSmallNote;