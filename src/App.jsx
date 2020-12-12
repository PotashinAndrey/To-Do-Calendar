import React from 'react';
import './App.css';
import AboutEvent from './modules/aboutEvent/AboutEvent.jsx';
import Note from './modules/note/Note.jsx';
import Calendar from './modules/calendar/Calendar.jsx';
import ToDoList from './modules/toDoList/ToDoList.jsx';
import useCurrentNoteContext from './modules/Contexts/CurrentNoteContext.jsx';

function App() {
  const {currentNoteState} = useCurrentNoteContext();

  return (
      <div className="wrapper">
        <div className="container">
          <Calendar />
          <ToDoList />
          {currentNoteState.currentNote ? <AboutEvent/> : <Note />}
        </div>
      </div>
  );
}

export default App;
