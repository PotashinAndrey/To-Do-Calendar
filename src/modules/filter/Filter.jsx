import React, { useState, useEffect } from 'react';
import Selector from '../utils/Selector.jsx'
import ChooseCost from '../aboutEvent/ChooseCost.jsx';
import Grid from '../calendar/calendarTable/Grid.jsx';
import useFiltersContext from '../Contexts/FiltersContext.jsx';
import './Filter.css';

export default function Filter() {
  const { filtersState, filtersDispatch } = useFiltersContext();


  const priorityVariants = [
    { text: 'not choice', color: 'gray' },
    { text: 'low', color: 'green' },
    { text: 'medium', color: 'yellow' },
    { text: 'high', color: 'red' },
  ]

  const todoVariants = [
    { text: 'not choice', color: 'gray' },
    { text: 'todo', color: "rgb(240, 250, 105)" },
    { text: 'done', color: 'rgba(118, 175, 127, 1)' },
    { text: 'canceled', color: 'rgba(200, 200, 200, 1)' }
  ]

  function throwOff() {
    filtersDispatch({
      filters: {
        name: '',
        cost: undefined,
        date: undefined,
        priority: undefined,
        state: undefined,
      }
    });
  }

  return (
    <div className="filter">
      <Selector text="Приортиет: "
        value={filtersState.filters.priority}
        variants={priorityVariants}
        onChange={e => filtersDispatch({ filters: { priority: e === 'not choice' ? undefined: e} })}
      />
      <Selector text="Состояние: "
        value={filtersState.filters.state}
        variants={todoVariants}
        onChange={e => filtersDispatch({ filters: { state: e === 'not choice' ? undefined: e } })}
      />
      <ChooseCost cost={filtersState.filters.cost} setCost={e => filtersDispatch({ filters: { cost: +e } })} />
      <div></div>
      <Grid
        month={new Date().getMonth()}
        onClick={e => filtersDispatch({ filters: { date: e } })}
        activeDate={filtersState.filters.date ? filtersState.filters.date : new Date()}
      />
      <button onClick={throwOff} >Сбросить</button>
    </div>
  )
}