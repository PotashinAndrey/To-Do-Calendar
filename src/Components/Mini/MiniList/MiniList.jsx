import React, { useState } from 'react';
import './MiniList.css';
import List from '../../List/List.jsx';
import ListToggle from '../ListToggle/ListToggle.jsx';
import Search from '../../Search/Search.jsx';
import Button from "antd-button-color";
// import { useHttp } from '../../../Requests/useHttp.jsx';
// import useTokenContext from '../../../Contexts/TokenContext.jsx';
import useFiltersContext from '../../../Contexts/FiltersContext.jsx';
import AddSmallNote from '../AddSmallNote/AddSmallNote.jsx';
import ListHeader from '../../List/ListHeader.jsx';
import filters from './filters.js';

const MiniList = ({ className }) => {
  // const { loading, request } = useHttp();
  // const { tokenState } = useTokenContext();
  const { filtersState, filtersDispatch } = useFiltersContext();

  const [listType, setListType] = useState('doings');
  const [visible, setVisible] = useState(false);

  const types = {
    doings: "Время",
    purchases: "Цена",
    notes: "Создано"
  }

  const searchHandler = (string) => {
    filtersDispatch({ filters: { name: string.toLowerCase().trim() } });
  }

  return (
    <>
      <div className={className + ' minilist-wrapper'}>
        <ListToggle listType={listType} setListType={setListType} />
        <div className="search-wrapper">
          <Search
            searchHandler={searchHandler}
          />
          <Button
            type="success"
            size="large"
            onClick={() => setVisible(true)}
          > Добавить </Button>
        </div>
        <List listType={listType} filter={filters[listType]} >
          <ListHeader name="Название" dis="Описание" time={types[listType]} />
        </List>
      </div>
      <AddSmallNote
        listType={listType}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  )
}

export default MiniList;