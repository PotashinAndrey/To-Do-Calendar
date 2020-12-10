import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Item.css';

export default function Item({day, month, monthDelta, onClick, activeItem}) {

  const active = activeItem.day === day && activeItem.month == monthDelta;

  return (
    <Container className="calendarItem" style={active ? {border: '2px solid cyan', background: 'azure'} : null} onClick={() => onClick(day, month, monthDelta)} >
      <Typography style={monthDelta !== 0 ? {color: '#999'} : null}>{day}</Typography>
    </Container>
  )
}