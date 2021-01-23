import React, { useState } from 'react';
import Calendar from '../Calendar/Calendar.jsx';
import SpendingFilter from './SpendingFilter/SpendingFilter.jsx';
import SpendingList from './SpendingList/SpendingList.jsx';
import './DailySpending.css';

export default function DailySpending() {
  const [listType, setListType] = useState('shopping list');

  return (
    <div className="DailySpendingWrapper">
      <div className="DailySpendingContainer">
        <Calendar className="C1-R1" />
        <SpendingFilter className="C1-R2" />
        <SpendingList className="C2-R1" setListType={setListType} listType={listType} />
      </div>
    </div>
  )
}