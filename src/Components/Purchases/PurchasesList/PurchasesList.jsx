import React, { useState } from 'react';
import Search from '../../Search/Search.jsx';
import AddPurchases from './AddPurchases.jsx';
import Button from "antd-button-color";
import Portal from '../../../Portal/Portal.jsx';
import Modal from '../../Modal/Modal.jsx';
import './PurchasesList.css';

export default function PurchasesList({ className, items = [] }) {
  const [visible, setVisible] = useState(null);

  function AddPurchaseHandler() {
    setVisible(<Portal id="root">
      <Modal isOpen={true} closeHandler={() => setVisible(null)}>
        <AddPurchases />
      </Modal>
    </Portal>)
  }


  return (
    <>
      <div className={className}>
        <div className="purchasesAddAndSearchWrapper">
          <Search />
          <Button type="success" onClick={AddPurchaseHandler}>Добавить</Button>
        </div>
      </div>
      {visible}
    </>
  )
}