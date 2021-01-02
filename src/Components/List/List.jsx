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

  let sorted = notesState.notes.slice();
  sorted.sort((a,b) => {
    const compare = a[types[listType]] === undefined ? '0': a[types[listType]];
    const compareb = b[types[listType]] === undefined ? '0': b[types[listType]];
    console.log(a, b, compare, compareb, compare > compareb);
    if (compare < compareb) return -1;
    if (compare === compareb) return 0;
    if (compare > compareb) return 1;
  })

  const items = filters.filtration(sorted, filter)
    .map(e => <ListItem
      note={e}
      thirdProp={types[listType] === 'cost' ? e[types[listType]] : e[types[listType]]
        .slice(0, e[types[listType]].length - 5)
        .split('T')
        .join(' ')}
    />);

  return (
    <div className="list-wrapper">
      {children}
      {items}
    </div>
  )
}

export default List;