import React, { useState, useEffect } from 'react';
import { Input, Modal, DatePicker, Typography } from 'antd';
import { useHttp } from '../../../Requests/useHttp.jsx';
import useTokenContext from '../../../Contexts/TokenContext.jsx';
import useCurrentNoteContext from '../../../Contexts/CurrentNoteContext.jsx';
import useNotesContext from '../../../Contexts/NotesContext.jsx';
import moment from 'moment';
import './EditNote.css';

const EditNote = ({ visible, setVisible }) => {
  const { loading, request } = useHttp();
  const { tokenState } = useTokenContext();
  const { currentNoteState, currentNoteDispatch } = useCurrentNoteContext();
  const { notesDispatch } = useNotesContext();

  const [note, setNote] = useState({
    name: currentNoteState.currentNote.name,
    discription: currentNoteState.currentNote.discription,
    cost: currentNoteState.currentNote.cost,
    deadline: currentNoteState.currentNote.deadline
  });

  const { Title, Text } = Typography;

  const changeItem = async () => {
    try {
      await request('/api/note/change', 'POST', {noteId: currentNoteState.currentNote._id, changes: {...note}}, { Authorization: tokenState.token });

      setVisible(false);
      currentNoteDispatch({currentNote: null});

      const data = await request('/api/note/all', 'GET', null, { Authorization: tokenState.token });

      notesDispatch({ notes: data })
    } catch (e) {
      console.log(e.message);
    }
  }

  function changeHandler(event) {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  const handleCancel = () => {
    setVisible(false);
  };

  function onOk(value) {
    setNote({ ...note, deadline: value._d });
  }

  useEffect(() => {
    if (visible) {
      setNote({
        name: currentNoteState.currentNote.name,
        discription: currentNoteState.currentNote.discription,
        cost: currentNoteState.currentNote.cost,
        deadline: currentNoteState.currentNote.deadline
      })
    }
  }, [visible]);

  return (
    <Modal
      title={`Изменение заметки`}
      visible={visible}
      onOk={changeItem}
      confirmLoading={loading}
      onCancel={handleCancel}
      okText="Изменить"
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
        <DatePicker value={note.deadline ? moment(new Date(note.deadline), 'YYYY-MM-DD, hh:mm') : null} placeholder="Выберите дату события" showTime onOk={onOk} />
      </div>
    </Modal>
  )
}

export default EditNote;