import React from 'react';
import { Typography, InputNumber, Input, Select, DatePicker } from 'antd';
import Button from "antd-button-color";
import { CloseOutlined } from '@ant-design/icons';
import useTokenContext from '../../../../Contexts/TokenContext.jsx';
import { useHttp } from '../../../../Requests/useHttp.jsx';
import moment from 'moment';


export default function EditPurchases({ purchase, closeHandler, okHandler }) {
  const { tokenState } = useTokenContext();
  const { loading, request } = useHttp();

  const { Title, Text } = Typography;
  const { Option } = Select;
  const { TextArea } = Input;


  return (
    <div>
      <div className="addPurchasesHeader">
        <Title level={4}>Создание покупки</Title>
        <Button onClick={closeHandler} disabled={loading} icon={<CloseOutlined />} ></Button>
      </div>
      <div className="addPurchasesBlock">
        <Text>Название (не более 45 символов): </Text>
        <Input value={purchase.name} placeholder="Название..." />
      </div>
      <div className="addPurchasesBlock">
        <Text>Описание (Не более 150 символов): </Text>
        <TextArea
          value={purchase.discription}
          placeholder="Описание..."
          rows={3}
        />
      </div>
      <div className="addPurchasesBlock">
        <Text>Цена: </Text>
        <InputNumber value={purchase.cost} placeholder='Стоимость...' min={0} style={{ width: '100%' }} />
      </div>
      <div className="addPurchasesBlock">
        <Text>Приоритет (не обязательно): </Text>
        <Select defaultValue={'none'} value={purchase.priority} style={{ width: '100%' }} placeholder="Нет приоритета">
          <Option style={{ background: '#eee' }} value={'none'}>Нет приортитета</Option>
          <Option style={{ background: '#1e1' }} value={'low'}>Низкий</Option>
          <Option style={{ background: '#ee1' }} value={'medium'}>Средний</Option>
          <Option style={{ background: '#e11' }} value={'high'}>Высокий</Option>
        </Select>
      </div>
      <div className="addPurchasesBlock">
        <Text>Дата покупки (не обязательно): </Text>
        <DatePicker value={moment(new Date(purchase.deadline))} />
      </div>
      <div className='agreeAndCancel addPurchasesBlock'>
        <Button disabled={loading} onClick={closeHandler} >Отменна</Button>
        <Button disabled={loading} type="primary">Изменить</Button>
      </div>
    </div>
  )
}