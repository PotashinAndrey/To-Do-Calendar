import React, { useState, useEffect } from 'react';
import './ChooseDate.css';
import Grid from '../../calendar/calendarTable/Grid.jsx';
import ChooseTime from './ChooseTime.jsx';

export default function ChooseDate({ currentDate, setDeadline }) {
  const [date, setDate] = useState(currentDate ? currentDate : new Date());
  const [time, setTime] = useState({ minutes: currentDate?.getMinutes() || 0, hours: currentDate?.getHours() || 0 });

  useEffect(() => {
    const deadline = new Date(new Date().getFullYear(), date.getMonth(), date.getDate(), time.hours, time.minutes, 0, 0);
    setDeadline(deadline);
  }, [date, time]);

  return (
    <div className="choosedate">
      <Grid
        month={new Date().getMonth()}
        onClick={setDate}
        activeDate={date}
      />
      <ChooseTime setTime={setTime} />
    </div>
  )
}