import React, { useState } from 'react';
import useTokenContext from '../../../../Contexts/TokenContext.jsx';
import { useHttp } from '../../../../Requests/useHttp.jsx';
import PurchasesForm from '../PurchasesForm/PurchasesForm.jsx';
import './AddPurchases.css';

export default function AddPurchases({ closeHandler, okHandler, parent = null, deadline = true }) {
  const { tokenState } = useTokenContext();
  const { loading, request } = useHttp();

  async function createHandler(note) {
    if (!note.name.length || !note.cost) return;

    try {
      const data = await request('/api/note/create', 'POST', { ...note, parent }, { Authorization: tokenState.token });

      okHandler(data.noteId);
    } catch (e) {
      console.log(e.message)
    }

    closeHandler();
  }

  return (
    <PurchasesForm
      closeHandler={closeHandler}
      okHandler={createHandler}
      loading={loading}
      text={{ header: 'Создание покупки', ok: 'Создать' }}
      deadline={deadline}
    />
  )
}