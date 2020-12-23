import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../Requests/useHttp.jsx';
import Button from "antd-button-color";
import { Typography } from 'antd';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import './Registration.css';

const Registration = () => {
  const { loading, request } = useHttp();
  const { Title } = Typography;

  const [problems, setProblems] = useState(undefined);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: ''
  });

  const onClose = () => setProblems(undefined);

  function changeFormHandler(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function registerHandler() {
    if (checkFields(form)) {
      setProblems(checkFields(form))
      return;
    }

    try {
      await request('/api/auth/register', 'POST', { email: form.email, password: form.password, name: form.name });

      history.push("/");
    } catch (e) {
      console.log(e.message);
    }
  }

  const alertRegister = problems ? (
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

  const history = useHistory();

  return (
    <>
      <div className="registration-wrapper">
        <div className="registration">
          <Title>Регистарция</Title>
          <div>
            <Typography>Введите имя: </Typography>
            <Input
              placeholder="Имя..."
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
              placeholder="email..."
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
              placeholder="password..."
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
              placeholder="password..."
              name="rePassword"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              type="password"
              value={form.rePassword}
              onChange={e => changeFormHandler(e)}
            />
          </div>

          <Button type="success" onClick={registerHandler} loading={loading}>Зарегистрироваться</Button>
          <Button type="primary" onClick={() => history.push("/login")} loading={loading}>Войти</Button>
        </div>
      {alertRegister}
      </div>
    </>
  )
}

export default Registration;



function checkFields(form) {
  const problems = { type: 'warning', text: [] };

  if (form.name.length < 3) {
    problems.text.push('Длинна имени не мение 3 симоволов.');
  }

  if (form.name.length > 20) {
    problems.text.push('Длинна имени не более 20 симоволов.');
  }

  if (!validateEmail(form.email)) {
    problems.type = 'error'
    problems.text.push('Некорректный email.');
  }

  if (form.password !== form.rePassword) {
    problems.text.push('не совпадают пароли.');
  }

  if (form.password.length < 5) {
    problems.text.push('Длинна пароля не мение 5 символов.');
  }

  if (form.password.length > 20) {
    problems.text.push('Длинна пароля не более 20 символов.');
  }

  if (problems.text.length > 0) {
    problems.text = problems.text.join('\n');
    return problems;
  }

  return null;
}


function validateEmail(email) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email) == false) return false;

  return true;
}