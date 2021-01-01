import React from 'react';
import Data from '../data.js';
import Button from "antd-button-color";
import { Typography } from 'antd';
import './ChooseMonth.css';

export default function ChooseMonth({ month, onClick }) {
  const date = new Date(new Date().getFullYear(), month, 1, 0, 0, 0, 0);
  const year = date.getFullYear();
  const nowMonth = date.getMonth();
  const currentMonth = Data.Year[nowMonth];

  const { Text } = Typography;

  return (
    <div className="chooseMonth">
      <Button onClick={() => onClick(month - 12)} >{'<<'}</Button>
      <Button onClick={() => onClick(month - 1)} >{'<'}</Button>
      <Text className="dateText">{currentMonth + ', ' + year + ' год'}</Text>
      <Button onClick={() => onClick(month + 1)} >{'>'}</Button>
      <Button onClick={() => onClick(month + 12)} >{'>>'}</Button>
    </div>
  )
}