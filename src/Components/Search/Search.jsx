import React, { useState } from 'react';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
// import './Search.css';

const SearchSomefing = ({ searchHandler }) => {
  const [string, setString] = useState('');

  const { Search } = Input;
  const onSearch = () => {
    searchHandler(string);
  };

  return (
    <Search
      placeholder="Поиск..."
      onSearch={onSearch}
      enterButton
      value={string}
      onChange={e => setString(e.target.value)}
    />
  )
}

export default SearchSomefing;
