import React from 'react';
import './ToDoList.css';
import Search from './toDoComponents/Search.jsx'
import Tags from './toDoComponents/Tags.jsx'
import List from './toDoComponents/List.jsx'

export default function ToDoList() {

  return (
    <div className="toDoList">
      <Search />
      <Tags />
      <List />
    </div>
  )
}