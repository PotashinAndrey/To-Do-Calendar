import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function DayItem({dayOfWeek}) {

  return (
    <Container>
      <Typography>{dayOfWeek}</Typography>
    </Container>
  )
}