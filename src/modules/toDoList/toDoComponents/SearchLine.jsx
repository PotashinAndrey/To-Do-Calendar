import React from 'react';
import './SearchLine.css';

export default function SearchLine({findLine, setFindLine, className = undefined}) {

  return (
    <input
      type="text"
      placeholder="Поиск..."
      className={className ? className : "searchLine" }
      value={findLine}
      onChange={e => setFindLine(e.target.value)}
    />
  )
}