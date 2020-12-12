import React, { useState, useEffect } from 'react';
import './ChooseDate.css';
import Grid from '../../calendar/calendarTable/Grid.jsx';
import ChooseTime from './ChooseTime.jsx';

export default function ChooseDate({ currentDate, setDeadline }) {
  const [date, setDate] = useState({month: currentDate?.getMonth() || new Date().getMonth(), day: currentDate?.getDate() || new Date().getDate()});
  const [time, setTime] = useState({minutes: currentDate?.getMinutes() || 0, hours: currentDate?.getHours() || 0});

  useEffect(() => {
    const deadline = new Date(new Date().getFullYear(), date.month, date.day, time.hours, time.minutes, 0, 0);
    setDeadline(deadline);
  }, [date, time]);

  return (
    <div className="choosedate">
      <Grid month={new Date().getMonth()} rows={6} columns={7} onClick={setDate} />
      <ChooseTime setTime={setTime} />
    </div>
  )
}