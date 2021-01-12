import React from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../Requests/useHttp.jsx';
import useTokenContext from '../../Contexts/TokenContext.jsx';
import Button from "antd-button-color";
import { Typography } from 'antd';
import './Drawer.css';

export default function Drawer({ open }) {
  const { tokenState } = useTokenContext();
  const { loading } = useHttp();

  const classes = ["drawer"];
  const { Title } = Typography;

  if (!open) {
    classes.push('close');
  }

  const history = useHistory();

  function logoutHandler() {
    tokenState.logout();
  }

  return (
    <nav className={classes.join(' ')}>
      <div className="changeConstructorWrapper">
        <Title level={4} style={{textAlign: "center"}}>Конструкторы</Title>
        <Button loading={loading} type="primary" onClick={() => history.push('/purchases')} block>Долгосрочные покупки</Button>
        <Button loading={loading} type="primary" block>Ежедненвные траты</Button>
        <Button loading={loading} type="primary" block>Заметки</Button>
        <Button loading={loading} type="primary" block>Дела</Button>
        <Button loading={loading} type="primary" onClick={() => history.push('/')} block>Мини</Button>
      </div>

      <Button loading={loading} className="logout" type="danger" onClick={logoutHandler} >Выйти</Button>
    </nav>
  )
}
