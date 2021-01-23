import React, { useState, useEffect } from 'react';
import Grid from './calendarTable/Grid.jsx'
import useFiltersContext from '../../Contexts/FiltersContext.jsx';
import ChooseMonth from './calendarTable/ChooseMonth.jsx';
import Button from "antd-button-color";
import { Switch } from 'antd';
import './Calendar.css';

const Calendar = ({ className }) => {
  const { filtersDispatch } = useFiltersContext();

  const [month, setMonth] = useState(new Date().getMonth());
  const [activeDate, setActiveDate] = useState(new Date());
  const [checked, setChecked] = useState(false);

  function choicedDate(date) {
    setActiveDate(date);
    if (checked) filtersDispatch({filters: {deadline: date}});
  }

  function throwOff() {
    if (checked) filtersDispatch({filters: {deadline: undefined}});
    setChecked(false);
    setMonth(new Date().getMonth());
    setActiveDate(new Date());
  }

  useEffect(() => {
    if (!checked) filtersDispatch({filters: {deadline: undefined}});
    if (checked) filtersDispatch({filters: {deadline: activeDate}});
  }, [checked]);

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
        <Switch checkedChildren="За дату" unCheckedChildren="За всё время" defaultChecked={checked} checked={checked} onChange={e => setChecked(e)} />
      </div>
    </div>
  )
}

export default Calendar;