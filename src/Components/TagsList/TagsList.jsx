import React from 'react';
import Tag from './Tag.jsx';
import AddTag from './AddTag.jsx';
import './TagsList.css';

export default function TagsList({ tagsArray = [] }) {

  const items = tagsArray.map(e => <Tag color={e.color}>{e.text}</Tag>)

  return (
    <div className="TagsListWrapper" >
      {items.length ? items : <span style={{margin: "3px"}} >Нет выбранных тегов</span>}
      <AddTag />
    </div>
  )
}