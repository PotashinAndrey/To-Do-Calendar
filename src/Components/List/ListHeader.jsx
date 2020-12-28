import React from 'react';
import { Typography } from 'antd';
import './ListHeader.css';

const ListHeader = ({ name, dis, time }) => {

  const { Title } = Typography;

  return (
    <div className="listheader-wrapper">
      <Title className="listHeader-title" level={4} >{name}</Title>
      <Title className="listHeader-title" level={4} >{dis}</Title>
      <Title className="listHeader-title" level={4} >{time}</Title>
    </div>
  )
}

export default ListHeader;