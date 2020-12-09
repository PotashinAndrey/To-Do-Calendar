import React from 'react';
import './ToDoList.css';
import Search from './toDoComponents/Search.jsx'
import Tags from './toDoComponents/Tags.jsx'
import List from './toDoComponents/List.jsx'

export default function ToDoList() {
  const gridClasses = ['toDoList'];

  return (
    <div className={gridClasses.join(' ')}>
      <Search />
      <Tags />
      <List />
    </div>
  )
}