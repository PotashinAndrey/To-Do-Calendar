import React from 'react';
import useNotesContext from '../../../../Contexts/NotesContext.jsx';
import SubPurchaseItem from './SubPurchaseItem.jsx';
import {useHttp} from '../../../../Requests/useHttp.jsx';
import useTokenContext from '../../../../Contexts/TokenContext.jsx';

export default function SubPurchasesList({ parent, state }) {
  const { notesState, notesDispatch } = useNotesContext();
  const { request } = useHttp();
  const { tokenState } = useTokenContext();


  async function deleteHandler(id) {
    try {
      await request('/api/note/delete', 'POST', { noteId: id }, { Authorization: tokenState.token });

      const children = parent.children.filter(e => e !== id );

      await request('/api/note/change', 'POST', { noteId: parent._id, changes: {children} }, { Authorization: tokenState.token });

      reloadData();
    } catch (e) {
      console.log(e.message)
    }
  }

  async function doneHandler(id) {
    try {
      await request('/api/note/change', 'POST', { noteId: id, changes: {state: 'done'} }, { Authorization: tokenState.token });

      reloadData();
    } catch(e) {
      console.log(e.message)
    }
  }

  async function reloadData() {
    try {
      const data = await request('/api/note/all', 'GET', null, { Authorization: tokenState.token });
      const purchases = data.filter(e => e.type === 'purchases')

      notesDispatch({ purchases: purchases })
    } catch (e) {
      console.log(e.message)
    }
  }


  const children = notesState.purchases
    .filter(e => e.parent === parent._id)
    .map(e =>
      <SubPurchaseItem
        key={e._id}
        state={state}
        purchaseNote={e}
        deleteHandler={deleteHandler}
        doneHandler={doneHandler}
      />
    );

  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr'}}>
      {children}
    </div>
  )
}