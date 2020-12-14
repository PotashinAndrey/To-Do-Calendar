import React from 'react';
import './Tags.css';
import Tag from './Tag.jsx';

export default function Tags() {

  return (
    <div className="tags">
      <Tag
        name={"заметки"}
        filter={{
          cost: undefined,
          date: undefined,
          priority: undefined,
          state: undefined,
          creationTime: undefined
        }}
        color={'#e00'}
      />
      <Tag
        name={"Покупи"}
        filter={{

        }}
        color={'#0e0'}
      />
      <Tag
        name={"События"}
        filter={{

        }}
        color={'#0ee'}
      />
      <Tag
        name={"Ежедневние"}
        filter={{

        }}
        color={'#ee0'}
      />
      <Tag
        name={"Дела"}
        filter={{

        }}
        color={'#e0e'}
      />
    </div>
  )
}