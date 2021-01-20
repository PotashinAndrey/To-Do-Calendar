import React, { useState } from 'react';
import useTokenContext from '../../../../Contexts/TokenContext.jsx';
import { useHttp } from '../../../../Requests/useHttp.jsx';
import PurchasesForm from '../PurchasesForm/PurchasesForm.jsx';
import './AddPurchases.css';

export default function AddPurchases({ closeHandler, okHandler, parent = null }) { //!!
  const { tokenState } = useTokenContext();
  const { loading, request } = useHttp();

  async function createHandler(note) {
    if (!note.name.length || !note.cost) return;

    console.log(note)

    await request('/api/note/create', 'POST', note, { Authorization: tokenState.token });

    okHandler(note);
    closeHandler();
  }

  return (
    <PurchasesForm
      closeHandler={closeHandler}
      okHandler={createHandler}
      loading={loading}
      text={{header: 'Создание покупки', ok: 'Создать'}}
    />
  )
}