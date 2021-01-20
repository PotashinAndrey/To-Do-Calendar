import React, { useState } from 'react';
import { Typography } from 'antd';
import Button from "antd-button-color";
import './SubPurchaseItem.css';

export default function SubPurchasesItem({ purchaseNote, deleteHandler, doneHandler, state }) {
  const [open, setOpen] = useState(false);

  const { Text, Title } = Typography;

  const styles = [purchaseNote.state === 'done' || state === 'done' ? 'none crossedOut' : purchaseNote.priority, 'PurchasesListItemWrapper']
  open ? styles.push('subPurchaseItemOpen') : styles.push('subPurchaseItemClose')


  return (
    <div
      onClick={() => setOpen(!open)}
      style={{ height: '44px' }}
      className={styles.join(' ')}
    >
      <Title level={5}>
        {purchaseNote.name.length > 21 ? purchaseNote.name.slice(0, 18) + '...' : purchaseNote.name}
      </Title>
      {purchaseNote.discription?.length ?
        <Text type="secondary">
          {purchaseNote.discription.length > 16 ? purchaseNote.discription.slice(0, 18) + '...' : purchaseNote.discription}
        </Text> :
        <Text type="secondary">Нет описания</Text>}
      <Text
        style={{ textAlign: 'center' }}
      >
        {purchaseNote.cost + ' руб'}
      </Text>
      {open ? <div style={{display: 'flex', gap: '3px'}} onClick={e => e.stopPropagation()}>
        <Button disabled={purchaseNote.state === 'done'} onClick={() => doneHandler(purchaseNote._id)}>Куплено</Button>
        <Button onClick={() => deleteHandler(purchaseNote._id)}>Удалить</Button>
      </div> : null}
    </div>
  )
}