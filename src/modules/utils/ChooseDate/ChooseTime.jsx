import React, { useState, useEffect } from 'react';
import './ChooseTime.css';

export default function ChooseTime({ setTime }) {
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (minutes > 59 || minutes < 0 || hour > 23 || hour < 0) return;
    setTime({ minutes: minutes, hours: hour });
  }, [hour, minutes]);

  return (
    <div className="chooseTime">
      <p>Введите время: </p>
      <input
        className="chooseTime-input"
        type="number" placeholder="00"
        value={hour} onChange={e => setHour(e.target.value)}
        max="23"
        min="0"
      />
      <input
        className="chooseTime-input"
        type="number" placeholder="00"
        value={minutes} onChange={e => setMinutes(e.target.value)}
        max="59"
        min="0"
      />
    </div>
  )
}
