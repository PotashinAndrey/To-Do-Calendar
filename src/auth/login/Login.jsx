import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../requests/useHttp.jsx';
import useTokenContext from '../../modules/Contexts/TokenContext.jsx';
import './Login.css';

export default function Login() {
  const { tokenState, tokenDispatch} = useTokenContext();
  const { loading, request } = useHttp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef();
  const pasRef = useRef();

  const history = useHistory();

  if (tokenState.token) {
    console.log(tokenState.token)
      history.push("/mini");
  }

  async function loginHandler() {
    if (!validate(email)) {
      emailRef.current.style.outline = "2px solid red";

      return;
    }

    emailRef.current.style.outline = "none";

    try {
      const data = await request('/api/auth/login', 'POST', { email: email, password: password });

      tokenState.login(data.token, data.userId);

      // history.push("/mini");
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="login">
      <h1>Вход в аккаунт</h1>
      <div>
        <p>Введите email: </p>
        <input ref={emailRef} type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <p>Введите пароль: </p>
        <input ref={pasRef} type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button disabled={loading} onClick={loginHandler}>Войти</button>
      <button disabled={loading} onClick={() => history.push("/registration")}>Регистрация</button>
    </div>
  )
}

function validate(email) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email) == false) return false;

  return true;
}
