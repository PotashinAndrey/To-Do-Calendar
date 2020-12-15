import React, { useState } from 'react';
import Drawer from './Drawer.jsx';
import Backdrop from './Backdrop.jsx';
import './Menu.css';

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const classes = ['menu'];
  let img;
  classes.push(menuOpen ? 'open' : 'close');

  if (menuOpen) {
    classes.push('open');
    img = <img className="icon x" src="https://mywebicons.ru/i/png/a08bfa58bb97390a643b0c1848171b15.png" alt="меню" />
  } else {
    classes.push('close');
    img = <img className="icon" src="https://cdn.icon-icons.com/icons2/1302/PNG/128/menuoptions_85724.png" alt="меню" />;
  }

  return (
    <>
      <i
        className={classes.join(' ')}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {img}
      </i>
      <Drawer open={menuOpen} />
      {menuOpen ? <Backdrop onClick={() => setMenuOpen(false)} /> : null}
    </>
  )
}