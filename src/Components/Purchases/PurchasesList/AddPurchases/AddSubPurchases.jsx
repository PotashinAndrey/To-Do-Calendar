import React from 'react';
import AddPurchases from './AddPurchases.jsx'
import { useHttp } from '../../../../Requests/useHttp.jsx';
import useTokenContext from '../../../../Contexts/TokenContext.jsx';
import useNotesContext from '../../../../Contexts/NotesContext.jsx';

export default function AddSubPurchases({ closeHandler, parent }) {
  const { tokenState } = useTokenContext();
  const { notesDispatch } = useNotesContext();
  const { request } = useHttp()

  async function okHandler(childrenId) {
    try {
      const children = parent.children && parent.children.length > 0 ? [...parent.children, childrenId] : [childrenId];
      await request('/api/note/change', 'POST', { noteId: parent._id, changes: { children } }, { Authorization: tokenState.token });

      reloadData();
    } catch (e) {
      console.log(e.message);
    }
    ;
  }

  async function reloadData() {
    try {
      const data = await request('/api/note/all', 'GET', null, { Authorization: tokenState.token });
      const purchases = data.filter(e => e.type === 'purchases');

      notesDispatch({ purchases: purchases })
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <AddPurchases
      closeHandler={closeHandler}
      okHandler={okHandler}
      parent={parent._id}
      deadline={false}
    />
  )
}