import React from 'react';
import { useHistory } from 'react-router-dom';
import Link from './Link.jsx';
import './Drawer.css';

export default function Drawer({ open }) {
  const classes = ["drawer"];

  if (!open) {
    classes.push('close');
  }

  const history = useHistory();

  function logoutHandler() {

    history.push('/');
  }

  return (
    <nav className={classes.join(' ')}>
      <ul>
        <Link text={'adwada'} />
        <Link text={'adwada'} />
        <Link text={'adwada'} />
      </ul>

      <button onClick={logoutHandler} className="logout">Выйти</button>
    </nav>
  )
}
