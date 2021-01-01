import React from 'react';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
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