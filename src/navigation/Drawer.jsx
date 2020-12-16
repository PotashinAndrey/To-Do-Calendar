import React from 'react';
import { useHistory } from 'react-router-dom';
import Link from './Link.jsx';
// import { useToken } from '../auth/useToken.jsx';
import useTokenContext from '../modules/Contexts/TokenContext.jsx';
import './Drawer.css';

export default function Drawer({ open }) {
  const {tokenState, tokenDispatch} = useTokenContext();
  // const { logout } = useToken();
  const classes = ["drawer"];

  if (!open) {
    classes.push('close');
  }

  const history = useHistory();

  function logoutHandler() {
    tokenState.logout();

    // history.push('/');
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
