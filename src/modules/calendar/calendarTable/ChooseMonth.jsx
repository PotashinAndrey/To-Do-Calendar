import React from 'react';
import Data from '../data.js';
import './ChooseMonth.css';

export default function ChooseMonth({ month, onClick }) {
  const date = new Date(new Date().getFullYear(), month, 1, 0, 0, 0, 0);
  const year = date.getFullYear();
  const nowMonth = date.getMonth();
  const currentMonth = Data.Year[nowMonth];

  return (
    <div className="chooseMonth">
      <button onClick={() => onClick(month - 1)} >{'<'}</button>
      <p>{currentMonth + ', ' + year + ' год'}</p>
      <button onClick={() => onClick(month + 1)} >{'>'}</button>
    </div>
  )
}