import React from 'react';
import './Note.css';

export default function Note() {

  return (
    <div className="note">
      <label htmlFor="name">Введите название: </label>
      <input type="text" name="name" />
      <hr/>
      <label htmlFor="description">Введите описание:</label>
      <textarea nam="description" ></textarea>
      <button>Добавить</button>
    </div>
  )
}