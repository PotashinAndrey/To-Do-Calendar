import React, { useState } from 'react';
import useTokenContext from '../../Contexts/TokenContext.jsx';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../Requests/useHttp.jsx';
import Button from "antd-button-color";
import { Typography } from 'antd';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import './Login.css';

const Login = () => {
  const { tokenState } = useTokenContext();
  const { loading, request } = useHttp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [problems, setProblems] = useState(undefined);

  const history = useHistory();
  const { Title } = Typography;

  const onClose = () => setProblems(undefined);

  async function loginHandler() {
    if (checkFields({ email, password })) {
      setProblems(checkFields({ email, password }));
      return;
    }

    try {
      const data = await request('/api/auth/login', 'POST', { email: email, password: password });

      tokenState.login(data.token, data.userId);
    } catch (e) {
      let message = undefined;
      switch (e.message) {
        case 'user not found':
          message = 'Пользователь не существует.';
          break;

        case 'wrong password':
          message = 'Неверный пароль.';
          break;

        default:
          message = "Ошибка.";
          break;
      }

      setProblems({ type: 'error', text: message });
    }
  }

  const alertLogin = problems ? (
    <div className="div-alert">
      <Alert
        description={problems.text}
        type={problems.type}
        closable
        onClose={onClose}
      />
    </div>
  ) : (
      null
    )

  return (
    <div className="login-wrapper">
      <div className="login">
        <Title>Вход в аккаунт</Title>
        <div>
          <Typography>Введите email: </Typography>
          <Input
            placeholder="Email..."
            suffix={<UserOutlined />}
            size="large"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Typography>Введите пароль: </Typography>
          <Input.Password
            placeholder="Пароль..."
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            size="large"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <Button loading={loading} type="success" onClick={loginHandler} >Войти</Button>
        <Button loading={loading} type="primary" onClick={() => history.push("/registration")} >Регистрация</Button>
      </div>
      {alertLogin}
    </div>
  )
}

export default Login;


function checkFields(form) {
  const problems = { type: 'warning', text: [] };

  if (!validateEmail(form.email)) {
    problems.type = 'error'
    problems.text.push(`Некорректный email.`);
  }

  if (form.password.length < 5) {
    problems.text.push(`Длинна пароля не мение 5 символов.`);
  }

  if (form.password.length > 20) {
    problems.text.push(`Длинна пароля не более 20 символов.`);
  }

  if (problems.text.length > 0) {
    problems.text = problems.text.join(`\n`);
    return problems;
  }

  return null;
}


function validateEmail(email) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email) == false) return false;

  return true;
}