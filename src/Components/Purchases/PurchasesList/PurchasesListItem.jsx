import React, { useState } from 'react';
import { Typography } from 'antd';
import Button from "antd-button-color";
import './PurchasesListItem.css';

export default function PurchasesListItem({ purchaseNote, deleteHandler }) {
  const [open, setOpen] = useState(false);

  const { Text, Title } = Typography;

  const style = {
    open: 'OpenPurchasesListItemWrapper',
    close: 'PurchasesListItemWrapper'
  }

  const priority = {
    high: 'высокий',
    medium: 'средний',
    low: 'низкий',
    none: 'не указан'
  }

  const closed = (
    <>
      <Title level={5}>
        {purchaseNote.name.length > 21 ? purchaseNote.name.slice(0, 20) + '...' : purchaseNote.name}
      </Title>
      {purchaseNote.discription?.length ?
        <Text type="secondary">
          {purchaseNote.discription.length > 16 ? purchaseNote.discription.slice(0, 15) + '...' : purchaseNote.discription}
        </Text> :
        <Text type="secondary">Нет описания</Text>}
      <Text
        style={{ textAlign: 'center' }}
      >
        {purchaseNote.cost + ' руб'}
      </Text>
      {purchaseNote.deadline ?
        <Text style={{ justifySelf: "end" }}>{new Date(purchaseNote.deadline).toLocaleString()}</Text> :
        <Text style={{ justifySelf: "end" }}>Нет Дедлайна</Text>}
    </>
  )


  const opened = (
    <>
      <div className="OpenPurchasesListItemBlock">
        <Title level={5}>
          {purchaseNote.name.length > 21 ? purchaseNote.name.slice(0, 20) + '...' : purchaseNote.name}
        </Title>
        <Text level={5} style={{ justifySelf: "end" }}>
          Цена: {purchaseNote.cost} руб
        </Text>
      </div>

      <div style={{height: '44px'}}>
        <Text>Описание: </Text>
        {purchaseNote.discription?.length ?
          <Text style={{ overflowWrap: 'anywhere' }}>
            {purchaseNote.discription}
          </Text> :
          <Text type="secondary"> Нет описания</Text>}
      </div>

      <div className="OpenPurchasesListItemBlock">
        <Text>Приоритет: {priority[purchaseNote.priority]}</Text>
        <div style={{ justifySelf: "end" }}>
          <Text>Дедлайн: </Text>
          <span style={{ justifySelf: "end" }}>
            {purchaseNote.deadline ?
              <Text style={{ justifySelf: "end" }}>{new Date(purchaseNote.deadline).toLocaleString()}</Text> :
              <Text style={{ justifySelf: "end" }}>Нет Дедлайна</Text>}
          </span>
        </div>
      </div>

      <div
        style={{ position: 'absolute', bottom: '10px', right: '15px', display: 'flex', gap: '5px' }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button onClick={() => deleteHandler(purchaseNote._id)}>Удалить</Button>
        <Button>Изменить</Button>
      </div>
    </>
  )

  return (
    <div
      className={(open ? style.open : style.close) + ' ' + purchaseNote.priority}
      onClick={() => setOpen(!open)}
    >
      {open ? opened : closed}
    </div>
  )
}