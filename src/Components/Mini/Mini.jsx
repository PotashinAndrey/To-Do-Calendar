import React from 'react';
import Menu from "../LeftMenu/Menu.jsx";
import Calendar from "./Calendar/Calendar.jsx";
import Info from "./Info/Info.jsx";
import MiniList from "./MiniList/MiniList.jsx";
import './Mini.css';

const Mini = () => {

  return (
    <div className="wrapper">
      <Menu />
      <div className="container">
        <Calendar className="C1-R1" />
        <MiniList className="C2-R1" />
        <Info className="C1-R2" />
      </div>
    </div>
  )
}

export default Mini;