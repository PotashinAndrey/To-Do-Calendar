import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../Requests/useHttp.jsx';
import Button from "antd-button-color";
import { Typography } from 'antd';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import './Registration.css';

const Registration = () => {
  const { loading, request } = useHttp();
  const { Title } = Typography;

  const [rePassword, setRePassword] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  function changeFormHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function registerHandler() {
    try {
      const data = await request('/api/auth/register', 'POST', { email: form.email, password: form.password, name: form.name });

      console.log(data);

      history.push("/");
    } catch (e) {

    }
  }

  const history = useHistory();

  return (
    <div className="registration">
      <Title>Регистарция</Title>
      <div>
        <Typography>Введите имя: </Typography>
        <Input
          name="name"
          suffix={<UserOutlined />}
          type="text"
          value={form.name}
          onChange={e => changeFormHandler(e)}
        />
      </div>

      <div>
        <Typography>Введите email: </Typography>
        <Input
          name="email"
          suffix={<UserOutlined />}
          type="text"
          value={form.email}
          onChange={e => changeFormHandler(e)}
        />
      </div>

      <div>
        <Typography>Введите пароль: </Typography>
        <Input.Password
          name="password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          type="password"
          value={form.password}
          onChange={e => changeFormHandler(e)}
        />
      </div>

      <div>
        <Typography>Повторите пароль: </Typography>
        <Input.Password
          name="rePassword"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          type="password"
          value={rePassword}
          onChange={e => setRePassword(e.target.value)}
        />
      </div>

      <Button type="success" onClick={registerHandler} loading={loading}>Зарегистрироваться</Button>
      <Button type="primary" onClick={() => history.push("/login")} loading={loading}>Войти</Button>
    </div>
  )
}

export default Registration;