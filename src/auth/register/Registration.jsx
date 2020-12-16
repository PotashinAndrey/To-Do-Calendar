import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../requests/useHttp.jsx';
import './Registration.css';

export default function Registration() {
  const { loading, request } = useHttp();

  const rePasRef = useRef();
  const pasRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const history = useHistory();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [rePassword, setRePassword] = useState('');

  function changeFormHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function registerHandler() {
    if (!validateForm(form, rePassword, { name: nameRef, email: emailRef, password: pasRef, rePassword: rePasRef })) return;

    try {
      const data = await request('/api/auth/register', 'POST', { email: form.email, password: form.password });

      console.log(data);

      history.push("/");
    } catch (e) {

    }
  }

  return (
    <div className="registration">
      <h1>Регистарция</h1>
      <p>Введите имя: </p>
      <input name="name" ref={nameRef} type="text" value={form.name} onChange={e => changeFormHandler(e)} />
      <p>Введите email: </p>
      <input name="email" ref={emailRef} type="text" value={form.email} onChange={e => changeFormHandler(e)} />
      <p>Введите пароль: </p>
      <input name="password" ref={pasRef} type="password" value={form.password} onChange={e => changeFormHandler(e)} />
      <p>Повторите пароль: </p>
      <input name="rePassword" ref={rePasRef} type="password" value={rePassword} onChange={e => setRePassword(e.target.value)} />
      <button onClick={registerHandler} disabled={loading}>Зарегистрироваться</button>
      <button onClick={() => history.push("/")} disabled={loading}>Войти</button>
    </div>
  )
}


function validateForm(form, rePass, ref) {
  const invalids = [];

  if (form.name.length < 3) invalids.push('name');
  if (!validate(form.email)) invalids.push('email');
  if (form.password.length < 4) invalids.push('password');
  if (form.password != rePass || form.password.length < 4) invalids.push('rePassword');

  for (let key in ref) {
    if (invalids.includes(key)) continue;
    ref[key].current.style.outline = "0px";
  }

  invalids.forEach(elem => {
    ref[elem].current.style.outline = "2px solid red";
  });

  return !invalids.length;
}

function validate(email) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email) == false) return false;

  return true;
}
