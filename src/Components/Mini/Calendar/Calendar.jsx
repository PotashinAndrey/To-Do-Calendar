import React, { useState } from 'react';
import Grid from './calendarTable/Grid.jsx'
import ChooseMonth from './calendarTable/ChooseMonth.jsx';
import Button from "antd-button-color";
import './Calendar.css';

const Calendar = ({ className }) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [activeDate, setActiveDate] = useState(new Date());

  function choicedDate(date) {
    setActiveDate(date);
    //here dispatch
  }

  function throwOff() {
    //here dispatch
    setMonth(new Date().getMonth());
    setActiveDate(new Date());
  }

  return (
    <div className={className + ' calendar-wrapper'}>
      <ChooseMonth month={month} onClick={setMonth} />
      <div className="calendar-grid-container">
        <Grid
          month={month}
          onClick={choicedDate}
          activeDate={activeDate}
        />
      </div>
      <div className="calendar-buttons-container">
        <Button onClick={throwOff} >Сбросить</Button>
      </div>
    </div>
  )
}

export default Calendar;