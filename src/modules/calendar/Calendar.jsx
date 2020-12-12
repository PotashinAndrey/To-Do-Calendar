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
  const [activeDate, setActiveDate] = useState(new Date());

  function choicedDate(date) {
    setActiveDate(date)
    filterDispatch({
      notes: noteState.notes,
      filters: {
        creationTime: new Date(new Date().getFullYear(), month, date.getDate(), 0, 0, 0, 0)
      }
    });

    console.log(date)
  }

  function throwOff() {
    filterDispatch({
      notes: noteState.notes,
      filters: {
        creationTime: null
      }
    });
    setMonth(new Date().getMonth());
    setActiveDate(new Date());
  }

  return (
    <div className="calendar">
      <ChooseMonth month={month} onClick={setMonth} />
      <div className="calendar-grid-container">
        <Grid
          month={month}
          onClick={choicedDate}
          activeDate={activeDate}
        />
      </div>
      <div className="calendar-buttons-container">
        <button onClick={throwOff} >Сбросить</button>
        <button>Выбрать промежуток</button>
      </div>
    </div>
  )
}