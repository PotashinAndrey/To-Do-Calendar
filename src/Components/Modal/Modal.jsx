import React from 'react';
import Button from "antd-button-color";
import { Typography } from 'antd';
import './Modal.css';

export default function Modal({ children, text = null, onClick, isOpen }) {
  const { Title } = Typography;
  const { Text } = Typography;

  function ok() {
    okHandler();
    onClick();
  }

  if (isOpen) {
    return (
      <div className="main" onClick={onClick}>
        <div className="body" onClick={e => e.stopPropagation()} >
          <Title>{text.header}</Title>
          {text.main ? <Text>{text.main}</Text> : null}
          {children}
          <div className="modal-button-wrapper">
            <Button className="modal-button" onClick={ok}>{text.ok ? text.ok : 'Принять'}</Button>
            <Button className="modal-button" onClick={onClick}>Закрыть</Button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      null
    )
  }
}