import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Registration.css';

export default function Registration() {
  const history = useHistory();

  function registerHandler() {
    history.push("/");
  }

  return (
    <div className="registration">
      <h1>Регистарция</h1>
      <p>Введите имя: </p>
      <input type="text" />
      <p>Введите email: </p>
      <input type="text" />
      <p>Введите пароль: </p>
      <input type="text" />
      <p>Повторите пароль: </p>
      <input type="text" />
      <button onClick={registerHandler}>Зарегистрироваться</button>
      <button onClick={() => history.push("/")}>Войти</button>
    </div>
  )
}