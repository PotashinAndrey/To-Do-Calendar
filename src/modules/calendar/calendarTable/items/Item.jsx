import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Item({day, month, monthDelta, onClick, activeItem}) {

  const active = activeItem.day === day && activeItem.month == monthDelta;

  return (
    <Container onClick={() => onClick(day, month, monthDelta)} >
      <Typography style={active ? {border: '2px solid cyan', background: 'azure'} : null}>{day}</Typography>
    </Container>
  )
}