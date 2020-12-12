import Raect, { useState, useEffect } from 'react';
import SearchLine from '../toDoList/toDoComponents/SearchLine.jsx';
import List from '../toDoList/toDoComponents/List.jsx'
import NoteList from '../toDoList/NoteList/NoteList.jsx';
// import useFilterContext from '../Contexts/FilterContext.jsx';
// import useNoteContext from '../Contexts/NoteContext.jsx';
import './ChooseChildren.css';

export default function ChooseChildren() {
  const { noteState } = useNoteContext();
  const { filterState, filterDispatch } = useFilterContext();


  const [findLine, setFindLine] = useState('');

  useEffect(() => {
    filterDispatch({
      notes: noteState.notes,
      filters: {
        name: findLine
      }
    });
  }, [findLine]);

  return (
    <div>
      <SearchLine findLine={findLine} setFindLine={setFindLine} />
      {/* <List style={{height: '300px'}} /> */}
      <NoteList list={filterState} >

      </NoteList>
    </div>
  )
}