import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Item.css';

export default function Item({ day, month, onClick, active, current = false }) {
  return (
    <Container
      className="calendarItem"
      style={active ? { outline: '2px solid cyan', background: 'azure' } : null}
      onClick={() => onClick(day, month)}
    >
      <Typography style={ !current ? { color: '#999' } : null}>{day}</Typography>
    </Container>
  )
}