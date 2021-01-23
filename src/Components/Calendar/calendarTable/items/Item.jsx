import React from 'react';
import { Typography } from 'antd';
import './Item.css';

export default function Item({ day, month, onClick, active, current = false }) {
  const { Text } = Typography;

  return (
    <div
      className="calendarItem"
      style={active ? { outline: '2px solid #1890ff', fontWeight: 'bold'} : null}
      onClick={() => onClick(day, month)}
    >
      <Text style={ !current ? { color: '#999' } : null}>{day}</Text>
    </div>
  )
}