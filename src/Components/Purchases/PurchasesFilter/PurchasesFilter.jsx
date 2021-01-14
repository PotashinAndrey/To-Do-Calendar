import React, { useState, useEffect } from 'react';
import useFiltersContext from '../../../Contexts/FiltersContext.jsx';
import { DatePicker, InputNumber, Checkbox } from 'antd';
import Button from "antd-button-color";
import moment from 'moment';
import './PurchasesFilter.css';

export default function PurchasesFilter({ className }) {
  const { filtersDispatch } = useFiltersContext();

  const [deadline, setDeadline] = useState(true);
  const [cost, setCost] = useState([null, null]);
  const [filter, setFilter] = useState({
    name: '',
    cost: [null, null],
    deadline: true,
    range: [null, null],
    priority: ["high", "medium", "low", 'none'],
    state: ['todo']
  });

  const { RangePicker } = DatePicker;

  const priorityOptions = [
    { label: 'Высокий', value: 'high' },
    { label: 'Средний', value: 'medium' },
    { label: 'Низкий', value: 'low' },
    { label: 'Без приоритета', value: 'none' }
  ];

  const stateOption = [
    { label: 'Куплено', value: 'done' },
    { label: 'Не куплено', value: 'todo' },
  ]

  function throwOff() {
    setFilter({
    name: '',
    cost: [null, null],
      deadline: true,
      range: [null, null],
      priority: ["high", "medium", "low", 'none'],
      state: ['todo']
    });
    setCost([null, null]);
    setDeadline(true);
    filtersDispatch();
  }

  function onChangeCheckbox(checkedValues) {
    setFilter({ ...filter, priority: checkedValues });
  }

  function onChangeStateCheckbox(checkedValues) {
    setFilter({...filter, state: checkedValues})
  }

  function onChangeDateRange(value) {
    console.log(value[0].toDate())
    setFilter({...filter, range: [value[0].toDate(), value[1].toDate()]})
  }

  function applyFilters() {
    const newFilter = {...filter, deadline, cost: cost.slice().map(e => e < 0 ? null : e).sort((a, b) => a ? a : 0 - b ? b : 0)};

    setFilter(newFilter)
    filtersDispatch({purchases: newFilter});
  }


  return (
    <div className={className + ' purchasesFilterWrapper'}>
      <h1>Фильры покупок</h1>

      <div className="purchasesFilterBlock">
        <h2>Приортет: </h2>
        <Checkbox.Group options={priorityOptions} defaultValue={["high", "medium", "low", 'none']} value={filter.priority} onChange={onChangeCheckbox} />
      </div>

      <div className="purchasesFilterBlock">
        <h2>Диапазон стоимости: </h2>
        <div className="PurchasesCostFilter">
          <p>Стоимость от: </p>
          <InputNumber value={cost[0]} className="PurchasesCostFilterInputNumber" onChange={value => setCost([value, cost[1]])} />
          <p>{` до `}</p>
          <InputNumber value={cost[1]} className="PurchasesCostFilterInputNumber" onChange={value => setCost([cost[0], value])} />
        </div>
      </div>

      <div className="purchasesFilterBlock">
        <h2>Промежуток дедлайна: </h2>
        <RangePicker value={[ filter.range[0] ?  moment(new Date(filter.range[0])) : null, filter.range[1] ? moment(new Date(filter.range[1])) : null]} onChange={e => onChangeDateRange(e)} />
      </div>

      <div className="PurchasesExistDeadlineFilter purchasesFilterBlock">
        <h2>Дедлайн: </h2>
        <Checkbox checked={deadline} onChange={e => setDeadline(e.target.checked)}>Нет дедлайна</Checkbox>
      </div>

      <div className="purchasesFilterBlock purchasesFilterState">
        <h2>Состояние: </h2>
        <Checkbox.Group options={stateOption} defaultValue={["todo"]} value={filter.state} onChange={onChangeStateCheckbox} />
      </div>

      <div className="PurchasesButtonsFilter purchasesFilterBlock">
        <Button onClick={throwOff} >Сбросить</Button>
        <Button type="primary" onClick={applyFilters}>Применить</Button>
      </div>
    </div>
  )
}