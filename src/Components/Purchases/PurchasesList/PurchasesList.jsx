import React, { useState, useEffect } from 'react';
import useNotesContext from '../../../Contexts/NotesContext.jsx';
import Search from '../../Search/Search.jsx';
import AddPurchases from './AddPurchases.jsx';
import Button from "antd-button-color";
import Portal from '../../../Portal/Portal.jsx';
import Modal from '../../Modal/Modal.jsx';
import PurchasesListItem from './PurchasesListItem.jsx';
import { useHttp } from '../../../Requests/useHttp.jsx';
import PurchasesHeader from './PurchasesHeader.jsx';
import useTokenContext from '../../../Contexts/TokenContext.jsx';
import './PurchasesList.css';

export default function PurchasesList({ className }) {
  const { request } = useHttp();
  const { notesState, notesDispatch } = useNotesContext();
  const { tokenState } = useTokenContext();
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    reloadData();
  }, []);

  function okHandler() {
    reloadData();
  }

  async function reloadData() {
    const data = await request('/api/note/all', 'GET', null, { Authorization: tokenState.token });
    const purchases = data.filter(e => e.type === 'purchases')

    notesDispatch({ purchases: purchases })
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

  const items = notesState.purchases.map(e => <PurchasesListItem key={e._id} purchaseNote={e} />);

  return (
    <>
      <div className={className}>
        <div className="purchasesAddAndSearchWrapper">
          <Search searchHandler={searchHandler} />
          <Button type="success" onClick={addPurchaseHandler}>Добавить</Button>
        </div>
        <div className="purchasesListItems">
          <PurchasesHeader />
          {items}
        </div>
      </div>
      {visible}
    </>
  )
}