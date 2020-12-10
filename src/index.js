import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { NoteContextProvider, initialNoteState, noteReducer } from './modules/Contexts/NoteContext.jsx';
import { FilterContextProvider, initialFilterState, filterReducer } from './modules/Contexts/FilterContext.jsx';


ReactDOM.render(
  <FilterContextProvider reducer={filterReducer} initState={initialFilterState} >
    <NoteContextProvider reducer={noteReducer} initState={initialNoteState} >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </NoteContextProvider>
  </FilterContextProvider>,
  document.getElementById('root')
);
