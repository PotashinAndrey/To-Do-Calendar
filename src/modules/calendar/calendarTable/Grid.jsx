import React, { useState } from 'react';
import calculateMonth from './calculateMonth.js';
import DayItem from './items/DayItem.jsx';
import Item from './items/Item.jsx';

export default function Grid({ rows, columns, onClick }) {
  const [activeItem, setActiveItem] = useState({});

  let grid = [];
  const monthData = calculateMonth();

  function itemClick(day, month, monthDelta) {
    onClick({day: day, month: month + monthDelta});
    setActiveItem({day: day, month: monthDelta});
  }

  for (let i = 0; i < monthData.week.length; i++) {
    grid.push(<DayItem dayOfWeek={monthData.week[i]} key={i} />);
  }

  for (let i = 0; i < monthData.beforeDays.length; i++) {
    grid.push(<Item
      day={monthData.beforeDays[i]}
      month={monthData.month}
      monthDelta={-1}
      key={'beforeDays' + i}
      onClick={itemClick}
      activeItem={activeItem}
    />);
  }

  for (let i = 0; i < monthData.nowDays.length; i++) {
    grid.push(<Item
      day={monthData.nowDays[i]}
      month={monthData.month}
      monthDelta={0}
      key={'nowDays' + i}
      onClick={itemClick}
      activeItem={activeItem}
    />);
  }

  for (let i = 0; i < monthData.nextDays.length; i++) {
    grid.push(<Item
      day={monthData.nextDays[i]}
      month={monthData.month}
      monthDelta={1}
      key={'nextDays' + i}
      onClick={itemClick}
      activeItem={activeItem}
    />);
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
    height: '100%',
  }

  return (
    <div style={style}>
      {grid}
    </div>
  )
}