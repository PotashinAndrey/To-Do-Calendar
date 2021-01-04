import React, { useState, useEffect } from 'react';
import { Input, Modal, DatePicker, Typography } from 'antd';
import { useHttp } from '../../../Requests/useHttp.jsx';
import useTokenContext from '../../../Contexts/TokenContext.jsx';
import useNotesContext from '../../../Contexts/NotesContext.jsx';
import './AddSmallNote.css';

const AddSmallNote = ({ listType, visible, setVisible }) => {
  const { loading, request } = useHttp();
  const { tokenState } = useTokenContext();
  const { notesDispatch } = useNotesContext();

  const [note, setNote] = useState({
    name: '',
    discription: '',
    cost: undefined,
    deadline: undefined
  });

  const { Title, Text } = Typography;

  const types = {
    doings: "дела",
    purchases: "покупки",
    notes: "заметки"
  }

  function changeHandler(event) {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  function onOk(value) {
    setNote({ ...note, deadline: value._d });
  }

  const addItem = async () => {
    try {
      await request('/api/note/create', 'POST', note, { Authorization: tokenState.token });
      const data = await request('/api/note/all', 'GET', null, { Authorization: tokenState.token });

      notesDispatch({ notes: data });
    } catch (e) {
      console.log(e.message);
    }

    setVisible(false);
    setNote({
      name: '',
      discription: '',
      cost: undefined,
      deadline: undefined
    });
  }

  const handleCancel = () => {
    setVisible(false);
    setNote({
      name: '',
      discription: '',
      cost: undefined,
      deadline: undefined
    });
  };

  return (
    <Modal
      title={`Создание ${types[listType]}`}
      visible={visible}
      onOk={addItem}
      confirmLoading={loading}
      onCancel={handleCancel}
      okText="Создать"
      cancelText="Отменить"
    >
      <div className="editNote-wrapper">
        <Title level={4}>Название:</Title>
        <Input name="name" value={note.name} onChange={e => changeHandler(e)} placeholder="Название..." />
        <Text>Описание:</Text>
        <Input name="discription" value={note.discription} onChange={e => changeHandler(e)} placeholder="Описание..." />
        <Text>Цена:</Text>
        <Input name="cost" value={note.cost} onChange={e => changeHandler(e)} placeholder="Цена..." />
        <Text>Срок:</Text>
        <DatePicker placeholder="Выберите дату события" showTime onOk={onOk} />
      </div>
    </Modal>

  )
}

export default AddSmallNote;