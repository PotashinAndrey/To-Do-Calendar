import React, { useState, useEffect } from 'react';
import './Search.css';
import useFilterContext from '../../Contexts/FilterContext.jsx';
import useNoteContext from '../../Contexts/NoteContext.jsx';

export default function Search() {
  const [findedByName, setFindedByName] = useState('');
  const {filterState, filterDispatch} = useFilterContext();
  const {noteState, noteDispatch} = useNoteContext();

  useEffect(() => {
    filterDispatch({
      filters: {
        name: findedByName,
        cost: null,
        date: null,
        priority: 'Не выбрано'
      },
      notes: noteState.notes
    });
  }, [findedByName]);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Поиск..."
        className="searchinput"
        onChange={e => setFindedByName(e.target.value)}
      />
      <button>Фильры</button>
    </div>
  )
}