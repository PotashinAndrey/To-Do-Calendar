import React, { useEffect } from 'react';
import './ToDoList.css';
import Search from './toDoComponents/Search.jsx'
// import Tags from './toDoComponents/Tags.jsx'
import NoteList from './NoteList/NoteList.jsx';
import ListHeader from './toDoComponents/Listheader.jsx';
import useNotesContext from '../Contexts/NotesContext.jsx';
import useFilterNotesContext from '../Contexts/FilterNotesContext.jsx';
import useCurrentNoteContext from '../Contexts/CurrentNoteContext.jsx';
import useFiltersContext, {filtredNotes} from '../Contexts/FiltersContext.jsx';

export default function ToDoList() {
  const gridClasses = ['toDoList'];

  const { notesState } = useNotesContext();
  const { filtersState } = useFiltersContext();
  const { filterNotesState, filterNotesDispatch } = useFilterNotesContext();
  const { currentNoteDispatch } = useCurrentNoteContext();

  useEffect(() => {
    const filtred = filtredNotes(notesState.notes, filtersState.filters);

    filterNotesDispatch({notes: filtred});
  }, [filtersState, notesState]);

  return (
    <div className={gridClasses.join(' ')}>
      <Search />
      {/* <Tags /> */}
      <NoteList
        list={filterNotesState.filterNotes}
        onClick={note => currentNoteDispatch({ currentNote: note })}
        checkbox={true}
      >
        <ListHeader />
      </NoteList>
    </div>
  )
}