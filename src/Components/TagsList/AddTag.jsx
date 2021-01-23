import React from 'react';
import Tag from './Tag.jsx';

export default function AddTag({ addItem }) {

  return (
    <span onClick={addItem}>
      <Tag
        style={{border: '1px solid green', cursor: 'pointer' }}
        color={'green'}
      >
        Добавить
      </Tag>
    </span>
  )
}