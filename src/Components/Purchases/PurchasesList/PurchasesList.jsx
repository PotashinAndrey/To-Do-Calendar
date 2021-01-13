import React, { useState } from 'react';
import Search from '../../Search/Search.jsx';
import AddPurchases from './AddPurchases.jsx';
import Button from "antd-button-color";
import Portal from '../../../Portal/Portal.jsx';
import Modal from '../../Modal/Modal.jsx';
import {useHttp} from '../../../Requests/useHttp.jsx';
import './PurchasesList.css';

export default function PurchasesList({ className, items = [] }) {
  const {request} = useHttp();
  const [visible, setVisible] = useState(null);

  function okHandler(data) {
    console.log(data)
  }

  function addPurchaseHandler() {
    setVisible(<Portal id="root">
      <Modal isOpen={true} closeHandler={() => setVisible(null)}>
        <AddPurchases okHandler={okHandler} closeHandler={() => setVisible(null)} />
      </Modal>
    </Portal>)
  }

  function searchHandler(str) {
    console.log(str)
  }


  return (
    <>
      <div className={className}>
        <div className="purchasesAddAndSearchWrapper">
          <Search searchHandler={searchHandler} />
          <Button type="success" onClick={addPurchaseHandler}>Добавить</Button>
        </div>
      </div>
      {visible}
    </>
  )
}