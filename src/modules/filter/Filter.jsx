import React, { useState, useEffect } from 'react';
import Selector from '../utils/Selector.jsx'
import ChooseCost from '../aboutEvent/ChooseCost.jsx';
import Grid from '../calendar/calendarTable/Grid.jsx';
import useNoteContext from '../Contexts/NoteContext.jsx';
import useFilterContext from '../Contexts/FilterContext.jsx';
import './Filter.css';

export default function Filter() {
  const { noteState } = useNoteContext();
  const { filterState, filterDispatch } = useFilterContext();

  const [priority, setPriority] = useState(filterState.filters.priority);
  const [state, setState] = useState(filterState.filters.state);
  const [cost, setCost] = useState(filterState.filters.cost);
  const [date, setDate] = useState(filterState.filters.date);

  const priorityVariants = [
    { text: 'Не выбран', color: 'gray' },
    { text: 'Низкий', color: 'green' },
    { text: 'Средний', color: 'yellow' },
    { text: 'Высокий', color: 'red' },
  ]

  const todoVariants = [
    { text: 'Не выбрано', color: 'gray' },
    { text: 'Не выполнено', color: "rgb(240, 250, 105)" },
    { text: 'Выполнено', color: 'rgba(118, 175, 127, 1)' },
    { text: 'Отменено', color: 'rgba(200, 200, 200, 1)' }
  ]

  useEffect(() => {
    filterDispatch({
      notes: noteState.notes,
      filters: {
        cost: +cost,
        date: date,
        priority: priority === '' || priority === 'Не выбран' ? '' : priority,
        state: state === '' || priority === 'Не выбрано' ? '' : state
      }
    });
  }, [priority, state, cost, date, noteState]);

  function throwOff() {
    filterDispatch({
      notes: noteState.notes,
      filters: {
        cost: 0,
        date: null,
        priority: '',
        state: ''
      }
    });
    setCost(0);
    setState('');
    setDate(null);
    setPriority('');
  }

  return (
    <div className="filter">
      <Selector text="Приортиет: "
        value={priority}
        variants={priorityVariants}
        onChange={setPriority}
      />
      <Selector text="Состояние: "
        value={state}
        variants={todoVariants}
        onChange={setState}
      />
      <ChooseCost cost={cost} setCost={setCost} />
      <div></div>
      <Grid
        month={new Date().getMonth()}
        rows={6}
        columns={7}
        onClick={setDate}
        active={date ? { day: date.day, month: new Date().getMonth() } : undefined}
      />
      <button onClick={throwOff} >Сбросить</button>
    </div>
  )
}