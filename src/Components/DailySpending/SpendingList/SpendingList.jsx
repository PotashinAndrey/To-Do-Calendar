import React, { useState, useEffect } from 'react';
import SpendinglistToggle from './SpendinglistToggle/SpendinglistToggle.jsx';
import Search from '../../Search/Search.jsx';
import TagsList from '../../TagsList/TagsList.jsx';
import Button from "antd-button-color";
import './SpendingList.css';
import { pink } from '@material-ui/core/colors';

export default function SpendingList({ className }) {
  const [listType, setListType] = useState('buy');

  const types = {
    buy: "Покупки на сегодня",
    spends: "Расходы на сегодня"
  }

  useEffect(() => {
    console.log(types[listType]);
  }, [listType]);

  function searchHandler(str) {
    console.log(str)
  }

  return (
    <div className={className + ' SpendingListWrapper'}>
      <div className="SpendingListBlock" >
        <SpendinglistToggle listType={listType} setListType={setListType} />
        <Button style={{height: '40px'}} type="success">Добавить</Button>
      </div>

      <div className="SpendingListBlock" style={{alignItems: 'center'}}>
        <Search searchHandler={searchHandler} />
        <Button style={{height: '40px'}} type="primary">Фильры</Button>
      </div>

      <TagsList tagsArray={[]} />

      <div>

      </div>

    </div>
  )
}