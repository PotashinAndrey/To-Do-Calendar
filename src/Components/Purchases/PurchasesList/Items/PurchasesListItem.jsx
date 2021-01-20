import React, { useState } from 'react';
import { Typography } from 'antd';
import Button from "antd-button-color";
import Portal from '../../../../Portal/Portal.jsx';
import Modal from '../../../Modal/Modal.jsx';
import EditPurchases from '../EditPurchases/EditPurchases.jsx';
import AddSubPurchases from '../AddPurchases/AddSubPurchases.jsx';
import './PurchasesListItem.css';

export default function PurchasesListItem({ purchaseNote, deleteHandler, addChildrentPurchase }) { //!
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(null);

  const { Text, Title } = Typography;

  const styles = [purchaseNote.priority, 'PurchasesListItemWrapper']
  open ? styles.push('open') : styles.push('close')

  const childrens = purchaseNote.children ? purchaseNote.children.length : 0 ;

  const priority = {
    high: 'высокий',
    medium: 'средний',
    low: 'низкий',
    none: 'не указан'
  }


  function changePurchasesHadnler() {
    setVisible(
      <Portal id="root">
        <Modal isOpen={true} closeHandler={() => setVisible(null)}>
          <EditPurchases purchase={purchaseNote} closeHandler={() => setVisible(null)} />
        </Modal>
      </Portal>
    )
  }

  function addSubPurchases() {
    setVisible(
      <Portal id="root">
        <Modal isOpen={true} closeHandler={() => setVisible(null)}>
          <AddSubPurchases closeHandler={() => setVisible(null)} parent={purchaseNote} />
        </Modal>
      </Portal>
    )
  }

  const closed = (
    <>
      <Title level={5}>
        {purchaseNote.name.length > 21 ? purchaseNote.name.slice(0, 20) + '...' : purchaseNote.name}
      </Title>
      {purchaseNote.discription?.length ?
        <Text type="secondary">
          {purchaseNote.discription.length > 16 ? purchaseNote.discription.slice(0, 15) + '...' : purchaseNote.discription}
        </Text> :
        <Text type="secondary">Нет описания</Text>}
      <Text
        style={{ textAlign: 'center' }}
      >
        {purchaseNote.cost + ' руб'}
      </Text>
      {purchaseNote.deadline ?
        <Text style={{ justifySelf: "end" }}>{new Date(purchaseNote.deadline).toLocaleString()}</Text> :
        <Text style={{ justifySelf: "end" }}>Нет Дедлайна</Text>}
    </>
  )


  const opened = (
    <>
      <div className="OpenPurchasesListItemBlock">
        <Title level={5}>
          {purchaseNote.name.length > 21 ? purchaseNote.name.slice(0, 20) + '...' : purchaseNote.name}
        </Title>
        <Text level={5} style={{ justifySelf: "end" }}>
          Цена: {purchaseNote.cost} руб
        </Text>
      </div>

      <div style={{ height: '44px' }}>
        <Text>Описание: </Text>
        {purchaseNote.discription?.length ?
          <Text style={{ overflowWrap: 'anywhere' }}>
            {purchaseNote.discription}
          </Text> :
          <Text type="secondary"> Нет описания</Text>}
      </div>

      <div className="OpenPurchasesListItemBlock">
        <Text>Приоритет: {priority[purchaseNote.priority]}</Text>
        <div style={{ justifySelf: "end" }}>
          <Text>Дедлайн: </Text>
          <span style={{ justifySelf: "end" }}>
            {purchaseNote.deadline ?
              <Text style={{ justifySelf: "end" }}>{new Date(purchaseNote.deadline).toLocaleString()}</Text> :
              <Text style={{ justifySelf: "end" }}>Нет Дедлайна</Text>}
          </span>
        </div>
      </div>

      <div
        style={{ position: 'absolute', bottom: '10px', right: '15px', display: 'flex', gap: '5px' }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button>Купленно</Button>
        <Button onClick={addSubPurchases}>Добавить подзадачу</Button>
        <Button onClick={() => deleteHandler(purchaseNote._id)}>Удалить</Button>
        <Button onClick={changePurchasesHadnler} >Изменить</Button>
      </div>
    </>
  )

  return (
    <div
      style={ open ? {height: 155 + 46 * childrens + 'px' } : {height: '44px'}}
      className={styles.join(' ')}
      onClick={() => setOpen(!open)}
    >
      {open ? opened : closed}
      {visible}
    </div>
  )
}