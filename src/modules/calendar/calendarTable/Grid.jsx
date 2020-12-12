import React, { useState, useEffect } from 'react';
import calculateMonth from './calculateMonth.js';
import DayItem from './items/DayItem.jsx';
import Item from './items/Item.jsx';

export default function Grid({ month, rows, columns, onClick, active = {day: new Date().getDate(), month: 0 } }) {
  const [activeItem, setActiveItem] = useState(isActiveExist(month, active));

  useEffect(() => {
    setActiveItem(isActiveExist(month, active))
  }, [month]);

  let grid = [];
  const monthData = calculateMonth(month);

  function itemClick(day, month, monthDelta) {
    let validMonth = month + monthDelta;

    if (month + monthDelta < 0 ) validMonth = 11;
    if (month + monthDelta > 11 ) validMonth = 0;

    onClick({day: day, month: validMonth});
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

  const lastWeek = monthData.beforeDays.length === 0 ? 35 - monthData.nowDays.length : monthData.nextDays.length;

  for (let i = 0; i < lastWeek ; i++) {
    grid.push(<Item
      day={i + 1}
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


function isActiveExist(month, active) {
  if (new Date().getMonth() === month) return active;

  return {day: -1, month: 0}
}
