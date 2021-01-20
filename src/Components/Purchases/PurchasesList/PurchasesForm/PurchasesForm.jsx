import React, { useState } from 'react';
import { Typography, InputNumber, Input, Select, DatePicker } from 'antd';
import Button from "antd-button-color";
import { CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

const defaultNote = {
  name: '',
  discription: '',
  cost: undefined,
  deadline: undefined,
  priority: 'none',
  type: 'purchases'
}


export default function PurchasesForm({ note = defaultNote, closeHandler, okHandler, text, loading }) {
  const [purchase, setPurchase] = useState(note);

  const { Title, Text } = Typography;
  const { Option } = Select;
  const { TextArea } = Input;

  return (
    <div>
      <div className="addPurchasesHeader">
        <Title level={4}>{text.header}</Title>
        <Button onClick={closeHandler} disabled={loading} icon={<CloseOutlined />} ></Button>
      </div>
      <div className="addPurchasesBlock">
        <Text>Название (не более 45 символов): </Text>
        <Input
          value={purchase.name}
          onChange={e => setPurchase({ ...purchase, name: shortenString(e.target.value, 45) })}
          placeholder="Название..."
        />
      </div>
      <div className="addPurchasesBlock">
        <Text>Описание (Не более 150 символов): </Text>
        <TextArea
          value={purchase.discription}
          onChange={e => setPurchase({ ...purchase, discription: shortenString(e.target.value, 150) })}
          placeholder="Описание..."
          rows={3}
        />
      </div>
      <div className="addPurchasesBlock">
        <Text>Цена: </Text>
        <InputNumber
          value={purchase.cost}
          placeholder='Стоимость...'
          min={0}
          style={{ width: '100%' }}
          onChange={value => setPurchase({ ...purchase, cost: value })}
        />
      </div>
      <div className="addPurchasesBlock">
        <Text>Приоритет (не обязательно): </Text>
        <Select
          defaultValue={'none'}
          value={purchase.priority}
          style={{ width: '100%' }}
          placeholder="Нет приоритета"
          onChange={value => setPurchase({ ...purchase, priority: value })}
        >
          <Option style={{ background: '#eee' }} value={'none'}>Нет приортитета</Option>
          <Option style={{ background: '#1e1' }} value={'low'}>Низкий</Option>
          <Option style={{ background: '#ee1' }} value={'medium'}>Средний</Option>
          <Option style={{ background: '#e11' }} value={'high'}>Высокий</Option>
        </Select>
      </div>
      <div className="addPurchasesBlock">
        <Text>Дата покупки (не обязательно): </Text>
        <DatePicker
          value={purchase.deadline ? moment(new Date(purchase.deadline)) : null}
          placeholder="Выберите дату..."
          onChange={moment => { setPurchase({ ...purchase, deadline: moment.toDate() }) }}
        />
      </div>
      <div className='agreeAndCancel addPurchasesBlock'>
        <Button disabled={loading} onClick={closeHandler} >Отменна</Button>
        <Button disabled={loading} onClick={() => okHandler(purchase)} type="primary">{text.ok}</Button>
      </div>
    </div>
  )
}

function shortenString(str, limit) {
  if (str.length <= limit) return str;

  return str.slice(0, limit);
}

