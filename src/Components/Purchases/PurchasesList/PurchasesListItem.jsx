import React from 'react';
import { Typography } from 'antd';
import Button from "antd-button-color";
import './PurchasesListItem.css';

export default function PurchasesListItem({ purchaseNote }) {
  const { Text, Title } = Typography;


  return (
    <div className={"PurchasesListItemWrapper " + purchaseNote.priority}>
      <Title level={5}>{ purchaseNote.name.length > 21 ? purchaseNote.name.slice(0, 20) + '...' : purchaseNote.name}</Title>
      { purchaseNote.discription?.length ? <Text type="secondary">{ purchaseNote.discription.length > 16 ? purchaseNote.discription.slice(0, 15) + '...' : purchaseNote.discription}</Text> :
      <Text type="secondary">Нет описания</Text> }
      <Text style={{textAlign: 'center'}} >{purchaseNote.cost + ' руб'}</Text>
      { purchaseNote.deadline ? <Text className="PurchasesListItemDeadline">{new Date(purchaseNote.deadline).toLocaleString()}</Text> : <Text className="PurchasesListItemDeadline">Нет Дедлайна</Text> }
    </div>
  )
}