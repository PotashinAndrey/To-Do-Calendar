import React, { useState, useEffect } from 'react';
import './Calendar.css';
import Grid from './calendarTable/Grid.jsx'
import ChooseMonth from './calendarTable/ChooseMonth.jsx';
import useFilterContext from '../Contexts/FilterContext.jsx';
// import useNoteContext from '../Contexts/NoteContext.jsx';

export default function Calendar() {
  const { filterState, filterDispatch } = useFilterContext();

  const [activeDate, setActiveDate] = useState({ day: new Date().getDate(), month: 0 });
  const [month, setMonth] = useState(new Date().getMonth());
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date(new Date().getFullYear(), month, 1, 0, 0, 0, 0))
  }, [month]);

  function chooseDate() {

  }

  return (
    <div className="calendar">
      <ChooseMonth month={month} onClick={setMonth} />
      <div className="calendar-grid-container">
        <Grid month={month} rows={6} columns={7} onClick={setActiveDate} active={activeDate} />
      </div>
      <div className="calendar-buttons-container">
        <button>Сбросить</button>
        <button>Выбрать дату</button>
        <button>Выбрать промежуток</button>
      </div>
    </div>
  )
}