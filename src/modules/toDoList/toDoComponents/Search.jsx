import React from 'react';
import './Search.css';

export default function Search() {

  return (
    <div className="search">
      <input type="text" placeholder="Поиск..." className="searchinput" />
      <button>Искать</button>
      <button>Фильры</button>
    </div>
  )
}