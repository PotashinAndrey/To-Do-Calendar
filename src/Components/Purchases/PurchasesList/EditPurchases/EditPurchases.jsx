import React from 'react';
import PurchasesForm from '../PurchasesForm/PurchasesForm.jsx';
import useTokenContext from '../../../../Contexts/TokenContext.jsx';
import useNotesContext from '../../../../Contexts/NotesContext.jsx';
import { useHttp } from '../../../../Requests/useHttp.jsx';

export default function EditPurchases({ purchase, closeHandler }) {
  const { tokenState } = useTokenContext();
  const { notesDispatch } = useNotesContext();
  const { loading, request } = useHttp();


  function okHandler() {
    reloadData();
  }

  async function reloadData() {
    const data = await request('/api/note/all', 'GET', null, { Authorization: tokenState.token });
    const purchases = data.filter(e => e.type === 'purchases')

    notesDispatch({ purchases: purchases })
  }

  async function changeHandler(note) {
    if (!note.name.length || !note.cost) return;
    if (!changed(purchase, note)) {
      closeHandler();
      return;
    }

    await request('/api/note/change', 'POST', { noteId: note._id, changes: note }, { Authorization: tokenState.token });

    okHandler();
    closeHandler();
  }

  return (
    <PurchasesForm
      note={purchase}
      closeHandler={closeHandler}
      okHandler={changeHandler}
      loading={loading}
      text={{ header: 'Изменение покупки', ok: 'Изменить' }}
    />
  )
}

function changed(note1, note2) {
  const name = note1.name === note2.name;
  const discription = note1.discription === note2.discription;
  const cost = note1.cost === note2.cost;
  const deadline = note1.deadline === note2.deadline;
  const priority = note1.priority === note2.priority;

  return !name || !discription || !cost || !deadline || !priority;
}