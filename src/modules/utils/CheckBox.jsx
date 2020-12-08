import React, { useState } from 'react';
import './CheckBox.css';

export default function CheckBox({done}) {
  const [checked, setChecked] = useState(done);

  const classes = ['checkbox'];

  if (checked) {
    classes.push('done');
  }

  function checkHandler() {
    setChecked(prev => !prev);
  }

  return (
    <button className={classes.join(' ')} onClick={checkHandler} ></button>
  )
}