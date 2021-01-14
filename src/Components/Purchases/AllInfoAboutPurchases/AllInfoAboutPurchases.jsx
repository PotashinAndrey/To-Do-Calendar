import React from 'react';
import { Typography } from 'antd';
import useNotesContext from '../../../Contexts/NotesContext.jsx';
import './AllInfoAboutPurchases.css';

export default function AllInfoAboutPurchases({ className }) {
  const { notesState } = useNotesContext();

  const { Title, Text } = Typography;

  function reducer(priority) {
    return (accumulator, currentValue) => currentValue.priority === priority ? ++accumulator : accumulator;
  }

  const notFiltred = (
    <>
      <Title level={3}>Всего покупок: {notesState.purchases.length}</Title>
      <Title level={2}>
        Общая сумма: {notesState.purchases.reduce((accumulator, currentValue) => accumulator + currentValue.cost, 0)} руб
      </Title>
      <div className="allInfoAboutPurchasesPriority">
        <Title level={4}>Покупок с {<span style={{ color: '#e11' }}>высоким</span>} приоритетом: {notesState.purchases.reduce(reducer('high'), 0)}</Title>
        <Title level={4}>Покупок со {<span style={{ color: '#ee1' }}>средним</span>} приоритетом: {notesState.purchases.reduce(reducer('medium'), 0)}</Title>
        <Title level={4}>Покупок с {<span style={{ color: '#0a0' }}>низким</span>} приоритетом: {notesState.purchases.reduce(reducer('low'), 0)}</Title>
        <Title level={4}>Покупок без приортета: {notesState.purchases.reduce((accumulator, currentValue) => currentValue.priority === undefined ? ++accumulator : accumulator, 0)}</Title>
      </div>
    </>
  )

  const filtred = (
    <></>
  )

  return (
    <div className={className + ' allInfoAboutPurchasesWrapper'}>
      {notFiltred}
    </div>
  )
}