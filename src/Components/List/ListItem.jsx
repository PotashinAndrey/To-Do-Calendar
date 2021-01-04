import React from 'react';
import { Typography } from 'antd';
import './ListItem.css';

const ListItem = ({ note, thirdProp, onClick }) => {

  const { Title, Text } = Typography;

  return (
    <div className="noteItem" onClick={() => onClick(note)} >
      <Title className="listItem" level={5}>{note.name.length > 12 ? note.name.slice(0, 12) + '...' : note.name}</Title>
      <Text  className="listItem" type="secondary">{note.discription ? note.discription.length > 20 ? note.discription.slice(0, 20) + '...' : note.discription : 'Нет описания'}</Text>
      <Text  className="listItem" type="secondary">{thirdProp}</Text>
    </div>
  )
}

export default ListItem;