import React from 'react';
import './App.css';
// import AboutEvent from './modules/aboutEvent/AboutEvent.jsx';
import Note from './modules/note/Note.jsx';
// import AddToDo from './modules/addToDo/AddToDo.jsx';
import Calendar from './modules/calendar/Calendar.jsx';
import Filter from './modules/filter/Filter.jsx';
// import Timetabel from './modules/timetable/Timetabel.jsx';
import ToDoList from './modules/toDoList/ToDoList.jsx';
import { NoteContextProvider, initialNoteState, noteReducer } from './modules/Contexts/NoteContext.jsx';

function App() {
  const containerClasses = ['container'];



  return (
    <NoteContextProvider reducer={noteReducer} initState={initialNoteState} >
      <div className="wrapper">
        <div className="container">
          <Calendar />
          <ToDoList />
          <Note />
        </div>
      </div>
    </NoteContextProvider>
  );
}

export default App;
