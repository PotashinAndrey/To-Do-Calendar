import React, { useState, useEffect } from 'react';
import './ChooseDate.css';
import Grid from '../../calendar/calendarTable/Grid.jsx';
import ChooseTime from './ChooseTime.jsx';

export default function ChooseDate({ setDeadline }) {
  const [date, setDate] = useState({month: 0, day: 0});
  const [time, setTime] = useState({minutes: 0, hours: 0});

  useEffect(() => {
    const deadline = new Date(new Date().getFullYear(), date.month, date.day, time.hours, time.minutes, 0, 0);
    setDeadline(deadline);
  }, [date, time]);

  return (
    <div className="choosedate">
      <Grid rows={6} columns={7} onClick={setDate} />
      <ChooseTime setTime={setTime} />
    </div>
  )
}