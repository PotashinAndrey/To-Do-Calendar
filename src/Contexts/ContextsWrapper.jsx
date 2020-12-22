import React from 'react';
import { CurrentNoteContextProvider, initialCurrentNoteState, currentNoteReducer } from './CurrentNoteContext.jsx';
import { FiltersContextProvider, initialFiltersState, filtersReducer } from './FiltersContext.jsx';
import { NotesContextProvider, initialNotesState, notesReducer } from './NotesContext.jsx';

export default function ContextsWrapper({ children }) {

  return (
    <NotesContextProvider reducer={notesReducer} initState={initialNotesState} >
      <CurrentNoteContextProvider reducer={currentNoteReducer} initState={initialCurrentNoteState} >
        <FiltersContextProvider reducer={filtersReducer} initState={initialFiltersState} >
          {children}
        </FiltersContextProvider>
      </CurrentNoteContextProvider>
    </NotesContextProvider>
  )
}