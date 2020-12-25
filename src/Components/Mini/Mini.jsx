import React from 'react';
import Menu from "../LeftMenu/Menu.jsx";
import './Mini.css';

const Mini = () => {

  return (
    <div className="wrapper">
      <Menu />
      <div className="container">
        {/* <Calendar />
        <ToDoList />
        {currentNoteState.currentNote ? <AboutEvent /> : <Note />} */}
      </div>
    </div>
  )
}

export default Mini;