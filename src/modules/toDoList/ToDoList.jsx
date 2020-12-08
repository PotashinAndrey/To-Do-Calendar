import React, { useState } from 'react';
import './ToDoList.css';
import Search from './toDoComponents/Search.jsx'
import Tags from './toDoComponents/Tags.jsx'
import List from './toDoComponents/List.jsx'
import AboutEvent from '../aboutEvent/AboutEvent.jsx'

export default function ToDoList() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);

  const gridClasses = ['toDoList'];

  function clickOnItemHandler(itemId) {
    // if (itemId === null) {
    //   setEditorOpen(false);
    //   setCurrentItemId(null);
    //   return
    // }
    setEditorOpen(true);
    setCurrentItemId(itemId);
  }

  if (editorOpen) {
    gridClasses.push('editopen');
  } else {
    gridClasses.push('editclose');
  }



  return (
    <div className={gridClasses.join(' ')}>
      <Search />
      <Tags />
      <List onClick={clickOnItemHandler} />
      {editorOpen ? <AboutEvent itemId={currentItemId} /> : null}
    </div>
  )
}