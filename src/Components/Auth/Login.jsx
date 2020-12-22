import React, { useState } from 'react';
import useTokenContext from '../../Contexts/TokenContext.jsx';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../Requests/useHttp.jsx';
import Button from "antd-button-color";
import { Typography } from 'antd';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import './Login.css';

const Login = () => {
  const { tokenState } = useTokenContext();
  const { loading, request } = useHttp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const { Title } = Typography;

  async function loginHandler() {
    try {
      const data = await request('/api/auth/login', 'POST', { email: email, password: password });

      tokenState.login(data.token, data.userId);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
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
  )
}

export default Login;