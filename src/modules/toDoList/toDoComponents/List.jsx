import React from 'react';
import ListItem from './ListItem.jsx';
import ListHeader from './Listheader.jsx';
import './List.css';
import useNoteContext from '../../Contexts/NoteContext.jsx';
import useFilterContext from '../../Contexts/FilterContext.jsx';

export default function List() {
  const { noteState, noteDispatch } = useNoteContext();
  const {filterState, filterDispatch} = useFilterContext();

  function changeNoteState(note) {
    noteDispatch({currentNote: note});
  }

  const ListItems = (filterState.filterNotes.length > 0 ? filterState.filterNotes : noteState.notes ).map((note) =>
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