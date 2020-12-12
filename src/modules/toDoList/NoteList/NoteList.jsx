import React from 'react';
import ListItem from '../toDoComponents/ListItem.jsx'
import './NoteList.css';

export default function NoteList({ children, list, onClick }) {

  const items = list.map((note) =>
    <ListItem
      note={note}
      key={note.id}
      onClick={onClick}
    />);

  return (
    <div className="noteList">
      {children}
      <div className="noteList-list">
        {items}
      </div>
    </div>
  )
}
