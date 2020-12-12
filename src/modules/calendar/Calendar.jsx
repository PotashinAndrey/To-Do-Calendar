import React, { useState } from 'react';
import './Calendar.css';
import Grid from './calendarTable/Grid.jsx'
import ChooseMonth from './calendarTable/ChooseMonth.jsx';
import useFiltersContext from '../Contexts/FiltersContext.jsx';

export default function Calendar() {
  const { filtersDispatch } = useFiltersContext();

  const [month, setMonth] = useState(new Date().getMonth());
  const [activeDate, setActiveDate] = useState(new Date());

  function choicedDate(date) {
    setActiveDate(date);
    filtersDispatch({
      filters: {
        creationTime: new Date(new Date().getFullYear(), month, date.getDate(), 0, 0, 0, 0)
      }
    });
  }

  function throwOff() {
    filtersDispatch({
      filters: {
        creationTime: undefined
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