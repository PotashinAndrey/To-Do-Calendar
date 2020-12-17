import Raect, { useState, useEffect } from 'react';
import SearchLine from '../toDoList/toDoComponents/SearchLine.jsx';
import NoteList from '../toDoList/NoteList/NoteList.jsx';
import useFiltersContext from '../Contexts/FiltersContext.jsx';
import useCurrentNoteContext from '../Contexts/CurrentNoteContext.jsx';
import useFilterNotesContext from '../Contexts/FilterNotesContext.jsx';
import './ChooseChildren.css';

export default function ChooseChildren() {
  const { filtersDispatch } = useFiltersContext();
  const { filterNotesState } = useFilterNotesContext();
  const { currentNoteState, currentNoteDispatch } = useCurrentNoteContext();


  const [findLine, setFindLine] = useState('');

  useEffect(() => {
    filtersDispatch({
      filters: {
        name: findLine
      }
    });
  }, [findLine]);

  return (
    <div>
      <SearchLine findLine={findLine} setFindLine={setFindLine} />
      <NoteList
        style={{height: '300px'}}
        list={filterNotesState.filterNotes}
        onClick={note => currentNoteDispatch({ currentNote: {children: [...currentNoteState.currentNote.children, note.id]} })}
        checkbox={false}
      >

      </NoteList>
    </div>
  )
}