import React from 'react';
import { CurrentNoteContextProvider, initialCurrentNoteState, currentNoteReducer } from '../Contexts/CurrentNoteContext.jsx';
import { FilterNotesContextProvider, initialFilterNotesState, filterNotesReducer } from '../Contexts/FilterNotesContext.jsx';
import { FiltersContextProvider, initialFiltersState, filtersReducer } from '../Contexts/FiltersContext.jsx';
import { NotesContextProvider, initialNotesState, notesReducer } from '../Contexts/NotesContext.jsx';

export default function ContextsWrapper({ children }) {

  return (
    <NotesContextProvider reducer={notesReducer} initState={initialNotesState} >
      <CurrentNoteContextProvider reducer={currentNoteReducer} initState={initialCurrentNoteState} >
        <FiltersContextProvider reducer={filtersReducer} initState={initialFiltersState} >
          <FilterNotesContextProvider reducer={filterNotesReducer} initState={initialFilterNotesState} >
            {children}
          </FilterNotesContextProvider>
        </FiltersContextProvider>
      </CurrentNoteContextProvider>
    </NotesContextProvider>
  )
}