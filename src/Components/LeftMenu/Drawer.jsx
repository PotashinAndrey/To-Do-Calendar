import React from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../Requests/useHttp.jsx';
import useTokenContext from '../../Contexts/TokenContext.jsx';
import Button from "antd-button-color";
import './Drawer.css';

export default function Drawer({ open }) {
  const { tokenState, tokenDispatch } = useTokenContext();
  const { loading, request } = useHttp();

  const classes = ["drawer"];

  if (!open) {
    classes.push('close');
  }

  async function resposnceHandler(str, method, obj) {
    try {
      const data = await request(str, method, obj, { Authorization: tokenState.token });

      // console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  }

  const history = useHistory();

  function logoutHandler() {
    tokenState.logout();
  }

  return (
    <nav className={classes.join(' ')}>
      <ul>
        <button text={'adwada'} onClick={() => resposnceHandler('/api/note/create', 'POST', {
          name: 'Молоко',
          discription: 'купить в магните',
          deadline: new Date(),
          cost: 123
        })} />
        <button text={'adwada'} onClick={() => resposnceHandler('/api/note/all', 'GET')} />
        <button text={'adwada'} onClick={() => resposnceHandler('/api/note/change', 'POST', { noteId: '5fe0e0a69ff0724638a0f4e7', changes: { name: 'Хрен' } })} />
        <button text={'adwada'} onClick={() => resposnceHandler('/api/note/delete', 'POST', { noteId: '5fe0e0a69ff0724638a0f4e7' })} />
      </ul>

      <Button loading={loading} className="logout" type="primary" onClick={logoutHandler} >Выйти</Button>
    </nav>
  )
}
