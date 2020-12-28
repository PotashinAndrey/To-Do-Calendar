import React from 'react';
import { Typography } from 'antd';
import './ListItem.css';

const ListItem = ({ note, thirdProp }) => {

  const { Title, Text } = Typography;

  return (
    <div className="noteItem">
      <Title className="listItem" level={5}>{note.name.length > 15 ? note.name.slice(0, 15) + '...' : note.name}</Title>
      <Text  className="listItem" type="secondary">{note.discription.length > 20 ? note.discription.slice(0, 20) + '...' : note.discription}</Text>
      <Text  className="listItem" type="secondary">{thirdProp}</Text>
    </div>
  )
}

export default ListItem;