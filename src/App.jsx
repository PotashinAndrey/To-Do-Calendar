import React from 'react';
import './App.css';
import AboutEvent from './modules/aboutEvent/AboutEvent.jsx';
import Note from './modules/note/Note.jsx';
// import AddToDo from './modules/addToDo/AddToDo.jsx';
import Calendar from './modules/calendar/Calendar.jsx';
// import Filter from './modules/filter/Filter.jsx';
// import Timetabel from './modules/timetable/Timetabel.jsx';
import ToDoList from './modules/toDoList/ToDoList.jsx';
import useNoteContext from './modules/Contexts/NoteContext.jsx';

function App() {
  const { noteState } = useNoteContext();

  return (
      <div className="wrapper">
        <div className="container">
          <Calendar />
          <ToDoList />
          {noteState.currentNote ? <AboutEvent/> : <Note />}
        </div>
      </div>
  );
}

export default App;
