import React from 'react';
import ListItem from './ListItem.jsx';
import ListHeader from './Listheader.jsx';
import './List.css';
import useNoteContext from '../../Contexts/NoteContext.jsx';

export default function List({onClick}) {
  const { noteState, noteDispatch } = useNoteContext();

  function changeNoteState() {

  }

  const ListItems = noteState.notes.map((note) =>
    <ListItem
      note={note}
      key={note.id}
      onClick={onClick}
    />);

  return (
    <div className="itemslist">
      <ListHeader />
      {ListItems}
    </div>
  )
}