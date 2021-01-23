import React from 'react';
import { Tag } from 'antd';

export default function TagCustom({ color = 'gray', children, style = {} }) {

  return (
    <Tag style={{...{margin: '2px'}, ...style}} color={color}>{children}</Tag>
  )
}