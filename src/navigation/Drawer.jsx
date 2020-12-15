import React from 'react';
import Link from './Link.jsx';
import './Drawer.css';

export default function Drawer({open}) {
  const classes = ["drawer"];

  if (!open) {
    classes.push('close');
  }

  return (
    <nav className={classes.join(' ')}>
      <ul>
        <Link text={'adwada'} />
        <Link text={'adwada'} />
        <Link text={'adwada'} />
      </ul>
    </nav>
  )
}
