import React from 'react';
import './Listheader.css';

export default function ListItem() {

  return (
    <div className="listheader">
      <p></p>
      <p>Название</p>
      <p>Описание</p>
      <p className="time">Создан</p>
    </div>
  )
}