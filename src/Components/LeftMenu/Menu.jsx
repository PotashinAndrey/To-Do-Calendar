import React, { useState } from 'react';
import Drawer from './Drawer.jsx';
import Backdrop from './Backdrop.jsx';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import './Menu.css';

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const classes = ['menu'];
  let img;
  classes.push(menuOpen ? 'open' : 'close');

  if (menuOpen) {
    classes.push('open');
    img = <CloseOutlined style={{ fontSize: '32px', color: 'white' }} />
  } else {
    classes.push('close');
    img = <MenuOutlined style={{ fontSize: '32px' }} />;
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