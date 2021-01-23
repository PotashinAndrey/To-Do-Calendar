import React from 'react';
import { Radio } from 'antd';
import './SpendinglistToggle.css';

export default function SpendinglistToggle({ listType, setListType }) {

  const clickHandler = (e) => {
    setListType(e.target.value);
  }

  return (
    <Radio.Group
      size="large"
      value={listType}
      className="spendingListTogle-radiogroup"
      onChange={clickHandler}
    >
      <Radio.Button value="buy">Покупки на сегодня</Radio.Button>
      <Radio.Button value="spends">Расходы на сегодня</Radio.Button>
    </Radio.Group>
  )
}