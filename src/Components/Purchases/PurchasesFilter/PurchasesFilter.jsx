import React, { useState, useEffect } from 'react';
import useFiltersContext from '../../../Contexts/FiltersContext.jsx';
import { DatePicker, InputNumber, Checkbox } from 'antd';
import Button from "antd-button-color";
import './PurchasesFilter.css';

export default function PurchasesFilter({ className }) {
  const { filtersState, filtersDispatch } = useFiltersContext();

  const { RangePicker } = DatePicker;

  const priorityOptions = [
    { label: 'Высокий', value: 'high' },
    { label: 'Средний', value: 'medium' },
    { label: 'Низкий', value: 'low' },
  ];

  function onChangeCheckbox(checkedValues) {
    console.log('checked = ', checkedValues);
  }


  function onChangeDateRange(value) {
    console.log(value)
  }

  function applyFilters() {

  }


  return (
    <div className={className + ' purchasesFilterWrapper'}>
      <h1>Фильры покупок</h1>
      <div className="purchasesFilterBlock">
        <h2>Приортет: </h2>
        <Checkbox.Group options={priorityOptions} defaultValue={["high", "medium", "low"]} onChange={onChangeCheckbox} />
      </div>

      <div className="purchasesFilterBlock">
        <h2>Диапазон стоимости: </h2>
        <div className="PurchasesCostFilter">
          <p>Стоимость от: </p>
          <InputNumber className="PurchasesCostFilterInputNumber" />
          <p>{` до `}</p>
          <InputNumber className="PurchasesCostFilterInputNumber" />
        </div>
      </div>

      <div className="purchasesFilterBlock">
        <h2>Промежуток дедлайна: </h2>
        <RangePicker onChange={e => onChangeDateRange(e)} />
      </div>

      <div className="PurchasesExistDeadlineFilter purchasesFilterBlock">
        <h2>Нет дедлайна: </h2>
        <Checkbox checked={true} onChange={e => onChangeCheckbox(e.target.checked)}>Нет дедлайна</Checkbox>
      </div>

      <div className="purchasesFilterBlock">
        <h2>Выполненые: </h2>
        <Checkbox onChange={e => onChangeCheckbox(e.target.checked)}>Нет дедлайна</Checkbox>
      </div>

      <div className="PurchasesButtonsFilter purchasesFilterBlock">
        <Button>Сбросить</Button>
        <Button type="primary" onClick={applyFilters}>Применить</Button>
      </div>
    </div>
  )
}