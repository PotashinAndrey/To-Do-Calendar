import React from 'react';
import { Typography } from 'antd';
import './DayItem.css';

export default function DayItem({ dayOfWeek }) {

  const { Text } = Typography;

  return (
    <div className="weekDay-item">
      <Text strong>{dayOfWeek}</Text>
    </div>
  )
}