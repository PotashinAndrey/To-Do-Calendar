import React, { useState } from 'react';
// import Button from "antd-button-color";
import { Radio, Button } from 'antd';
import './ListToggle.css';

const ListToggle = ({ setListType, listType }) => {

  const clickHandler = (e) => {
    setListType(e.target.value);
  }

  return (
    <div className="listToggle-wrapper">
      <Radio.Group
        size="large"
        value={listType}
        className="listTogle-radiogroup"
        onChange={clickHandler}
      >
        <Radio.Button value="notes">Заметки</Radio.Button>
        <Radio.Button value="doings">Дела</Radio.Button>
        <Radio.Button value="purchases">Покупки</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default ListToggle;
