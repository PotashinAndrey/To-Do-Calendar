import React, { useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const history = useHistory();

  function loginHandler() {

    history.push("/mini");
  }

  return (
    <div className="login">
      <h1>Вход в аккаунт</h1>
      <div>
        <p>Введите email: </p>
        <input type="text" />
        <p>Введите пароль: </p>
        <input type="text" />
      </div>
      <button onClick={loginHandler}>Войти</button>
      <button onClick={() => history.push("/registration")}>Регистрация</button>
    </div>
  )
}