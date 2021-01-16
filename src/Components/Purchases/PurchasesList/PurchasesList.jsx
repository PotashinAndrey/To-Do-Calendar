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
import useFiltersContext, { filterPurchases } from '../../../Contexts/FiltersContext.jsx';
import './PurchasesList.css';

export default function PurchasesList({ className }) {
  const { request } = useHttp();
  const { notesState, notesDispatch } = useNotesContext();
  const { filtersState, filtersDispatch } = useFiltersContext();
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
    filtersDispatch({ purchases: { ...filtersState.purchases, name: str } });
  }

  async function deleteHandler(id) {
    try {
      await request('/delete', 'POST', { _id: id }, { Authorization: tokenState.token });
    } catch (e) {
      console.log(e.message)
    }
  }

  const items = filterPurchases(notesState.purchases, filtersState.purchases).map(e =>
    <PurchasesListItem
      key={e._id}
      purchaseNote={e}
      deleteHandler={deleteHandler}
    />
  );

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