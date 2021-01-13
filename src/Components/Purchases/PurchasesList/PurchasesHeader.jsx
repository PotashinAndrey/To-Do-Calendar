import React from 'react';
import { Typography } from 'antd';
import './PurchasesHeader.css';

export default function PurchasesHeader() {
  const { Text, Title } = Typography;


  return (
    <div className="purchasesHeaderWrapper">
      <Title className="purchasesHeaderName" level={5}>Название</Title>
      <Title className="purchasesHeaderDis" level={5}>Описание</Title>
      <Title level={5}>Цена</Title>
      <Title level={5}>Дедлайн</Title>
    </div>
  )
}