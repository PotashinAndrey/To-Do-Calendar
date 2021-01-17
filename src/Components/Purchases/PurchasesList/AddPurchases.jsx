import React, { useState } from 'react';
import useTokenContext from '../../../Contexts/TokenContext.jsx';
import { Typography, InputNumber, Input, Select, DatePicker } from 'antd';
import Button from "antd-button-color";
import { CloseOutlined } from '@ant-design/icons';
import { useHttp } from '../../../Requests/useHttp.jsx';
import './AddPurchases.css';

export default function AddPurchases({ closeHandler, okHandler }) {
  const { tokenState } = useTokenContext();
  const { loading, request } = useHttp();

  const [name, setName] = useState('');
  const [discription, setDiscription] = useState('');
  const [cost, setCost] = useState();
  const [priority, setPriority] = useState();
  const [date, setDate] = useState('');

  const { Title, Text } = Typography;
  const { Option } = Select;
  const { TextArea } = Input;

  async function createHandler() {
    if (!name.length || !cost) return;


    const note = {
      name: shortenString(name, 45),
      discription: shortenString(discription, 150),
      cost: cost,
      deadline: date,
      priority: priority,
      type: 'purchases'
    }

    await request('/api/note/create', 'POST', note, { Authorization: tokenState.token });

    okHandler(note);
    closeHandler();
  }

  return (
    <div  >
      <div className="addPurchasesHeader">
        <Title level={4}>Создание покупки</Title>
        <Button onClick={closeHandler} disabled={loading} icon={<CloseOutlined />} ></Button>
      </div>
      <div className="addPurchasesBlock">
        <Text>Название (не более 45 символов): </Text>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Название..." />
      </div>
      <div className="addPurchasesBlock">
        <Text>Описание (Не более 150 символов): </Text>
        <TextArea
          value={discription}
          onChange={e => setDiscription(e.target.value)}
          placeholder="Описание..."
          rows={3}
        />
      </div>
      <div className="addPurchasesBlock">
        <Text>Цена: </Text>
        <InputNumber value={cost} onChange={e => setCost(e)} placeholder='Стоимость...' min={0} style={{ width: '100%' }} />
      </div>
      <div className="addPurchasesBlock">
        <Text>Приоритет (не обязательно): </Text>
        <Select defaultValue={'none'} style={{ width: '100%' }} onChange={e => setPriority(e)} placeholder="Нет приоритета">
          <Option style={{ background: '#eee' }} value={'none'}>Нет приортитета</Option>
          <Option style={{ background: '#1e1' }} value={'low'}>Низкий</Option>
          <Option style={{ background: '#ee1' }} value={'medium'}>Средний</Option>
          <Option style={{ background: '#e11' }} value={'high'}>Высокий</Option>
        </Select>
      </div>
      <div className="addPurchasesBlock">
        <Text>Дата покупки (не обязательно): </Text>
        <DatePicker onChange={moment => { setDate(moment.toDate()) }} />
      </div>
      <div className='agreeAndCancel addPurchasesBlock'>
        <Button disabled={loading} onClick={closeHandler} >Отменна</Button>
        <Button disabled={loading} type="primary" onClick={createHandler}>Создать</Button>
      </div>
    </div>
  )
}

function shortenString(str, limit) {
  if (str.length <= limit) return str;

  const shortStr = str.slice(0, limit);

  const splitedShortStr = shortStr.split(' ');
  const splitedStr = str.split(' ');

  if (splitedShortStr.length === 1) return shortStr;

  if (splitedShortStr[splitedShortStr.length - 1] !== splitedStr[splitedShortStr.length - 1]) {
    splitedShortStr.pop();

    return splitedShortStr.join(' ');
  }

  return splitedShortStr.join(' ');
}