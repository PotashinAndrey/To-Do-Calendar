import Raect, { useState, useEffect } from 'react';
import SearchLine from '../toDoList/toDoComponents/SearchLine.jsx';
import NoteList from '../toDoList/NoteList/NoteList.jsx';
import useFiltersContext from '../Contexts/FiltersContext.jsx';
import useCurrentNoteContext from '../Contexts/CurrentNoteContext.jsx';
import './ChooseChildren.css';

export default function ChooseChildren() {
  const { filtersState, filtersDispatch } = useFiltersContext();
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
        list={filtersState}
        onClick={note => currentNoteDispatch({ currentNote: {children: [...currentNoteState.currentNote.children, note.id]} })}
      >

      </NoteList>
    </div>
  )
}