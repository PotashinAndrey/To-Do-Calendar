import React, { useState } from 'react';
import useTokenContext from '../../../Contexts/TokenContext.jsx';
import { Typography, InputNumber, Input, Select, DatePicker } from 'antd';
import Button from "antd-button-color";
import { CloseOutlined } from '@ant-design/icons';
import {useHttp} from '../../../Requests/useHttp.jsx';
import './AddPurchases.css';

export default function AddPurchases({ closeHandler, okHandler }) {
  const {tokenState} = useTokenContext();
  const {loading, request} = useHttp();

  const [name, setName] = useState('');
  const [discription, setDiscription] = useState('');
  const [cost, setCost] = useState();
  const [priority, setPriority] = useState();
  const [date, setDate] = useState('');

  const { Title, Text } = Typography;
  const { Option } = Select;

  async function createHandler() {
    if (!name.length || !cost) return;


    const note = {
      name: name,
      discription: discription,
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
        <Text>Название: </Text>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Название..." />
      </div>
      <div className="addPurchasesBlock">
        <Text>Описание (не обязательно): </Text>
        <Input value={discription} onChange={e => setDiscription(e.target.value)} placeholder="Описание..." />
      </div>
      <div className="addPurchasesBlock">
        <Text>Цена: </Text>
        <InputNumber value={cost} onChange={e => setCost(e)} placeholder='Стоимость...' min={0} style={{ width: '100%' }} />
      </div>
      <div className="addPurchasesBlock">
        <Text>Приоритет (не обязательно): </Text>
        <Select defaultValue={undefined} style={{ width: '100%' }} onChange={e => setPriority(e)} placeholder="Нет приоритета">
          <Option style={{ background: '#eee' }} value={undefined}>Нет приортитета</Option>
          <Option style={{ background: '#1e1' }} value={'low'}>Низкий</Option>
          <Option style={{ background: '#ee1' }} value={'medium'}>Средний</Option>
          <Option style={{ background: '#e11' }} value={'high'}>Высокий</Option>
        </Select>
      </div>
      <div className="addPurchasesBlock">
        <Text>Дата покупки (не обязательно): </Text>
        <DatePicker onChange={moment => {setDate(moment.toDate())}} />
      </div>
      <div className='agreeAndCancel addPurchasesBlock'>
        <Button disabled={loading} onClick={closeHandler} >Отменна</Button>
        <Button disabled={loading} type="primary" onClick={createHandler}>Создать</Button>
      </div>
    </div>
  )
}