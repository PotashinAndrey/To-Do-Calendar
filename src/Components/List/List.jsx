import React from 'react';
import useNotesContext from '../../Contexts/NotesContext.jsx';
import filters from '../Mini/MiniList/filters.js';
import ListItem from './ListItem.jsx';
import './List.css';

const List = ({ listType, filter, children }) => {
  const { notesState } = useNotesContext();

  const types = {
    doings: "deadline",
    purchases: "cost",
    notes: "created"
  }

  const items = filters.filtration(notesState.notes, filter).map(e => <ListItem note={e} thirdProp={types[listType] === 'cost' ? e[types[listType]] : e[types[listType]].slice(0, e[types[listType]].length-5 ).split('T').join(' ') } />);

  console.log(notesState)

  return (
    <div className="list-wrapper">
      {children}
      {items}
    </div>
  )
}

export default List;