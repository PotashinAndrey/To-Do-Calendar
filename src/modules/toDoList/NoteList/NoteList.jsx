import React from 'react';
import ListItem from '../toDoComponents/ListItem.jsx'
import './NoteList.css';

export default function NoteList({ children, list, onClick, style }) {

  const items = list.map((note) =>
    <ListItem
      note={note}
      key={note.id}
      onClick={onClick}
      isCheckbox={false}
    />);

  return (
    <div className="noteList" style={style} >
      {children}
      <div className="noteList-list">
        {items}
      </div>
    </div>
  )
}
