import React from 'react';
import calculateMonth from './calculateMonth.js';
import DayItem from './items/DayItem.jsx';
import Item from './items/Item.jsx';

export default function Grid({ month, onClick, activeDate }) {
  const rows = 6;
  const columns = 7;


  let grid = [];
  const monthData = calculateMonth(month);

  function itemClick(day, month) {
    const date = new Date(new Date().getFullYear(), month, day, 0, 0, 0, 0);

    onClick(date);
  }

  for (let i = 0; i < monthData.week.length; i++) {
    grid.push(<DayItem dayOfWeek={monthData.week[i]} key={i} />);
  }

  for (let i = 0; i < monthData.beforeDays.length; i++) {
    grid.push(<Item
      day={monthData.beforeDays[i]}
      month={month - 1}
      key={'beforeDays' + i}
      onClick={itemClick}
      active={
        activeDate.getFullYear() === new Date(new Date().getFullYear(), month - 1, 1, 0, 0, 0, 0).getFullYear() &&
        activeDate.getMonth() === new Date(new Date().getFullYear(), month - 1, 1, 0, 0, 0, 0).getMonth() &&
        (activeDate.getDate() === new Date(new Date().getFullYear(), monthData.month, 0, 0, 0, 0, 0).getDate() - monthData.beforeDays.length + i + 1)
      }
    />);
  }

  for (let i = 0; i < monthData.nowDays.length; i++) {
    grid.push(<Item
      day={monthData.nowDays[i]}
      month={month}
      current={true}
      key={'nowDays' + i}
      onClick={itemClick}
      active={
        activeDate.getFullYear() === new Date(new Date().getFullYear(), month, 1, 0, 0, 0, 0).getFullYear() &&
        activeDate.getMonth() === monthData.month &&
        activeDate.getDate() === i + 1
      }
    />);
  }

  const lastWeek = monthData.beforeDays.length === 0 ? 35 - monthData.nowDays.length : monthData.nextDays.length;

  for (let i = 0; i < lastWeek; i++) {
    grid.push(<Item
      day={i + 1}
      month={month + 1}
      key={'nextDays' + i}
      onClick={itemClick}
      active={
        activeDate.getFullYear() === new Date(new Date().getFullYear(), month + 1, 1, 0, 0, 0, 0).getFullYear() &&
        activeDate.getMonth() === new Date(new Date().getFullYear(), month + 1, 1, 0, 0, 0, 0).getMonth() &&
        activeDate.getDate() === 1 + i
      }
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
