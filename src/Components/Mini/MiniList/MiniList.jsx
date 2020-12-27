import React, { useState } from 'react';
import './MiniList.css';
import List from '../../List/List.jsx';
import ListToggle from '../ListToggle/ListToggle.jsx';
import Search from '../../Search/Search.jsx';
import Button from "antd-button-color";
import Portal from '../../../Portal/Portal.jsx';
import { useHttp } from '../../../Requests/useHttp.jsx';
import useTokenContext from '../../../Contexts/TokenContext.jsx';
import { Modal } from 'antd';
import AddSmallNote from '../AddSmallNote/AddSmallNote.jsx';

const MiniList = ({ className }) => {
  const { loading, request } = useHttp();
  const { tokenState } = useTokenContext();
  const [listType, setListType] = useState('doings');
  const [visible, setVisible] = useState(false);
  const [newItem, setNewItem] = useState(null);

  const types = {
    doings: "дела",
    purchases: "покупки",
    notes: "заметки"
  }

  const searchHandler = (string) => {
    console.log(string);
  }

  const addItem = async () => {
    console.log(newItem)
    if (!newItem || !newItem.name) return;

    try {
      const data = await request('/api/note/create', 'POST', newItem, { Authorization: tokenState.token });

      console.log(data);
    } catch (e) {
      console.log(e.message);
    }

    setNewItem(null);
    setVisible(false);
  }

  const handleCancel = () => {
    setNewItem(null);
    setVisible(false);
  };

  return (
    <>
      <div className={className + ' minilist-wrapper'}>
        <ListToggle listType={listType} setListType={setListType} />
        <div className="search-wrapper">
          <Search searchHandler={searchHandler} />
          <Button
            type="success"
            size="large"
            onClick={() => setVisible(true)}
          > Добавить </Button>
        </div>
        <List listType={listType} />
      </div>
      <Modal
        title={`Создание ${types[listType]}`}
        visible={visible}
        onOk={addItem}
        confirmLoading={loading}
        onCancel={handleCancel}
        okText="Создать"
        cancelText="Отменить"
      >
        <AddSmallNote type={listType} addNote={setNewItem} newNote={newItem}/>
      </Modal>
    </>
  )
}

export default MiniList;