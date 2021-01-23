import React from 'react';
import useNotesContext from '../../Contexts/NotesContext.jsx';
import useCurrentNoteContext from '../../Contexts/CurrentNoteContext.jsx';
import useFiltersContext, { filtredNotes } from '../../Contexts/FiltersContext.jsx';
import filters from '../Mini/MiniList/filters.js';
import ListItem from './ListItem.jsx';
import './List.css';

const List = ({ listType, filter, children }) => {
  const { notesState } = useNotesContext();
  const { currentNoteDispatch } = useCurrentNoteContext();
  const { filtersState } = useFiltersContext();

  function itemClick(note) {
    currentNoteDispatch({ currentNote: note });
  }

  const types = {
    doings: "deadline",
    purchases: "cost",
    notes: "created"
  }

  let sorted = notesState.notes;
  // let sorted = filtredNotes(notesState.notes.slice(), filtersState.filters);//!!!
  // console.log(filters)
  sorted.sort((a, b) => {
    const compare = a[types[listType]] === undefined ? '0' : a[types[listType]];
    const compareb = b[types[listType]] === undefined ? '0' : b[types[listType]];
    if (compare < compareb) return -1;
    if (compare === compareb) return 0;
    if (compare > compareb) return 1;
  })

  const items = filters.filtration(sorted, filter)
    .map(e => <ListItem
      key={e._id}
      onClick={itemClick}
      note={e}
      thirdProp={types[listType] === 'cost' ? e[types[listType]] : new Date(e[types[listType]]).toLocaleString()}
    />);

  return (
    <div className="list-wrapper">
      {children}
      {items}
    </div>
  )
}

export default List;

//.slice(0, e[types[listType]].length - 5).split('T').join(' ')