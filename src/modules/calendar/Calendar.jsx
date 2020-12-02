import React from 'react';
import './Calendar.css';
import Grid from './calendarTable/Grid.jsx'

export default function Calendar() {



  return (
    <div className="calendar">
      <Grid rows={6} columns={7} />
    </div>
  )
}