import React, { useState, useEffect } from 'react';
import './Calendar.css';
import Grid from './calendarTable/Grid.jsx'
import ChooseMonth from './calendarTable/ChooseMonth.jsx';
import useFilterContext from '../Contexts/FilterContext.jsx';
import useNoteContext from '../Contexts/NoteContext.jsx';

export default function Calendar() {
  const { filterState, filterDispatch } = useFilterContext();
  const { noteState, noteDispatch } = useNoteContext();

  const [month, setMonth] = useState(new Date().getMonth());
  const [activeDate, setActiveDate] = useState({ day: new Date().getDate(), month: 0 });

  function choicedDate(obj) {
    console.log(obj)
    setActiveDate(...obj);
    filterDispatch({
      notes: noteState.notes,
      filters: {
        creationTime: new Date(new Date().getFullYear(), month, obj.day, 0, 0, 0, 0)
      }
    });
  }

  function throwOff() {
    filterDispatch({
      notes: noteState.notes,
      filters: {
        creationTime: null
      }
    });
    setMonth(new Date().getMonth());
    setActiveDate({ day: new Date().getDate(), month: 0 });
  }

  return (
    <div className="calendar">
      <ChooseMonth month={month} onClick={setMonth} />
      <div className="calendar-grid-container">
        <Grid
          month={month}
          rows={6}
          columns={7}
          onClick={choicedDate}
          active={activeDate}
        />
      </div>
      <div className="calendar-buttons-container">
        <button onClick={throwOff} >Сбросить</button>
        <button>Выбрать промежуток</button>
      </div>
    </div>
  )
}