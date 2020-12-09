import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { NoteContextProvider, initialNoteState, noteReducer } from './modules/Contexts/NoteContext.jsx';


ReactDOM.render(
  <NoteContextProvider reducer={noteReducer} initState={initialNoteState} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NoteContextProvider>,
  document.getElementById('root')
);
