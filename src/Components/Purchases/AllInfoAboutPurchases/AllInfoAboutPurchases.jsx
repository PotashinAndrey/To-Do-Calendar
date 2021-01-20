import React from 'react';
import { Typography } from 'antd';
import useNotesContext from '../../../Contexts/NotesContext.jsx';
import useFiltersContext from '../../../Contexts/FiltersContext.jsx';
import { filterPurchases } from '../../../Contexts/FiltersContext.jsx';
import './AllInfoAboutPurchases.css';

export default function AllInfoAboutPurchases({ className }) {
  const { notesState } = useNotesContext();
  const { filtersState } = useFiltersContext();

  const { Title } = Typography;

  function reducer(priority) {
    return (accumulator, currentValue) => currentValue.priority === priority ? ++accumulator : accumulator;
  }

  const filtredPurchases = filterPurchases(notesState.purchases, filtersState.purchases);

  const notFiltred = (
    <>
      <Title level={3}>Всего покупок: {notesState.purchases.filter(e => (e.state === 'todo' && !e.parent)).length}</Title>
      <Title level={2}>
        Общая сумма: {notesState.purchases.filter(e => (e.state === 'todo' && !e.parent)).reduce((accumulator, currentValue) => accumulator + currentValue.cost, 0)} руб
      </Title>
      <div className="allInfoAboutPurchasesPriority">
        <Title
          level={4}
        >
          Покупок с {<span style={{ color: '#e11' }}>высоким</span>} приоритетом: {notesState.purchases.filter(e => (e.state === 'todo' && !e.parent)).reduce(reducer('high'), 0)}
        </Title>
        <Title
          level={4}
        >
          Покупок со {<span style={{ color: '#ee1' }}>средним</span>} приоритетом: {notesState.purchases.filter(e => (e.state === 'todo' && !e.parent)).reduce(reducer('medium'), 0)}
        </Title>
        <Title
          level={4}
        >
          Покупок с {<span style={{ color: '#0a0' }}>низким</span>} приоритетом: {notesState.purchases.filter(e => (e.state === 'todo' && !e.parent)).reduce(reducer('low'), 0)}
        </Title>
        <Title
          level={4}
        >
          Покупок без приортета: {notesState.purchases.filter(e => (e.state === 'todo' && !e.parent)).reduce((accumulator, currentValue) => currentValue.priority === 'none' ? ++accumulator : accumulator, 0)}
        </Title>
      </div>
    </>
  )

  const filtred = (
    <>
      <Title level={3}>Покупок: {filtredPurchases.filter(e => (e.state === 'todo' && !e.parent)).length} из {notesState.purchases.filter(e => (e.state === 'todo' && !e.parent)).length} </Title>
      <Title level={2}>
        Общая сумма: {filtredPurchases.filter(e => (e.state === 'todo' && !e.parent)).reduce((accumulator, currentValue) => accumulator + currentValue.cost, 0)} руб
      </Title>
      <div className="allInfoAboutPurchasesPriority">
        <Title
          level={4}
        >
          Покупок с {<span style={{ color: '#e11' }}>высоким</span>} приоритетом: {filtredPurchases.filter(e => (e.state === 'todo' && !e.parent)).reduce(reducer('high'), 0)}
        </Title>
        <Title
          level={4}
        >
          Покупок со {<span style={{ color: '#ee1' }}>средним</span>} приоритетом: {filtredPurchases.filter(e => (e.state === 'todo' && !e.parent)).reduce(reducer('medium'), 0)}
        </Title>
        <Title
          level={4}
        >
          Покупок с {<span style={{ color: '#0a0' }}>низким</span>} приоритетом: {filtredPurchases.filter(e => (e.state === 'todo' && !e.parent)).reduce(reducer('low'), 0)}
        </Title>
        <Title
          level={4}
        >
          Покупок без приортета: {filtredPurchases.filter(e => (e.state === 'todo' && !e.parent)).reduce((accumulator, currentValue) => currentValue.priority === 'none' ? ++accumulator : accumulator, 0)}
        </Title>
      </div>
    </>
  )

  const nothingFinded = (
    <>
      <div style={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
        <Title level={2}>
          Ничего не найдено
      </Title>
      </div>
    </>
  )

  let result = null;

  if (notesState.purchases.filter(e => (e.state === 'todo' && !e.parent)).length === filtredPurchases.filter(e => (e.state === 'todo' && !e.parent)).length) result = notFiltred;
  if (notesState.purchases.filter(e => (e.state === 'todo' && !e.parent)).length > filtredPurchases.filter(e => (e.state === 'todo' && !e.parent)).length && filtredPurchases.filter(e => (e.state === 'todo' && !e.parent)).length !== 0) result = filtred;
  if (notesState.purchases.filter(e => (e.state === 'todo' && !e.parent)).length > filtredPurchases.filter(e => (e.state === 'todo' && !e.parent)).length && filtredPurchases.filter(e => (e.state === 'todo' && !e.parent)).length === 0) result = nothingFinded;


  return (
    <div className={className + ' allInfoAboutPurchasesWrapper'}>
      {result}
    </div>
  )
}