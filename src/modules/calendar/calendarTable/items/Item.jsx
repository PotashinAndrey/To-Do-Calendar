import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Item({day}) {

  return (
    <Container>
      <Typography>{day}</Typography>
    </Container>
  )
}