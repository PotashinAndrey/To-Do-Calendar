import React from 'react';
import calculateMonth from './calculateMonth.js';
import DayItem from './items/DayItem.jsx';
import Item from './items/Item.jsx';

export default function Grid({rows, columns}) {
  let grid = [];
  const monthData = calculateMonth();

  for (let i = 0; i < monthData.week.length; i++ ) {
    grid.push(<DayItem dayOfWeek={monthData.week[i]} key={i}/>);
  }

  for (let i = 0; i < monthData.beforeDays.length; i++) {
    grid.push(<Item day={monthData.beforeDays[i]} key={10 + i}/>);
  }

  for (let i = 0; i < monthData.nowDays.length; i++) {
    grid.push(<Item day={monthData.nowDays[i]} key={100 + i}/>);
  }

  for (let i = 0; i < monthData.nextDays.length; i++) {
    grid.push(<Item day={monthData.nextDays[i]} key={1000 + i} />);
  }

  let numOfColumns = '';
  let numOfRows = '';

  for (let i = 0; i < rows; i++) {
    numOfRows += ' 1fr';
  }

  for (let i = 0; i < columns; i++) {
    numOfColumns += ' 1fr';
  }

  const style = {
    display: "grid",
    gridTemplateColumns: numOfColumns,
    gridTemplateRows: numOfRows,
    height: '100%'
  }

  // console.log(grid);

  return (
    <div style={style}>
      {grid}
    </div>
  )
}