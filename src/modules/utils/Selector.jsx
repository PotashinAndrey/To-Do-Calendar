import React from 'react';
import './Selector.css';

export default function Selector({ text, variants, onChange, value }) {

  const options = variants.map(e => <option key={e.text} style={{background: e.color}} >{e.text}</option> );

  return (
    <span className="selector">
      <p>{text}</p>
      <select onChange={e => onChange(e.target.value)} value={value} >
        {options}
      </select>
    </span>
  )
}