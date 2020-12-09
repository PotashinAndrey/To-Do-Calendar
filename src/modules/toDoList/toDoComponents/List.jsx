import React from 'react';
import ListItem from './ListItem.jsx';
import ListHeader from './Listheader.jsx';
import './List.css';
import useNoteContext from '../../Contexts/NoteContext.jsx';

export default function List() {
  const { noteState, noteDispatch } = useNoteContext();

  function changeNoteState(note) {
    noteDispatch({currentNote: note});
  }

  const ListItems = noteState.notes.map((note) =>
    <ListItem
      noteId={note.id}
      key={note.id}
      onClick={changeNoteState}
    />);

  return (
    <div className="itemslist">
      <ListHeader />
      {ListItems}
    </div>
  )
}