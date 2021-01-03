import React from 'react';
import './Info.css';
import useCurrentNoteContext from '../../../Contexts/CurrentNoteContext.jsx';
import useNotesContext from '../../../Contexts/NotesContext.jsx';
import {useHttp} from '../../../Requests/useHttp.jsx';
import useTokenContext from '../../../Contexts/TokenContext.jsx';
import { Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Button from "antd-button-color";

const Info = ({ className }) => {
  const { notesDispatch } = useNotesContext();
  const { currentNoteState, currentNoteDispatch } = useCurrentNoteContext();
  const { loading, request } = useHttp();
  const { tokenState } = useTokenContext();

  const { Title, Text } = Typography;

  const styles = [];

  async function deleteHandler() {
    try {
      await request('/api/note/delete', 'POST', { noteId: currentNoteState.currentNote._id }, { Authorization: tokenState.token });
      const data = await request('/api/note/all', 'GET', null, { Authorization: tokenState.token });

      notesDispatch({notes: data});

      currentNoteDispatch({ currentNote: null })
    } catch (e) {
      console.log(e);
    }
  }

  currentNoteState.currentNote ? styles.push(' currentNote') : styles.push(' noCurrentNote');

  const info = currentNoteState.currentNote ? <>
    <div className='infoNameAndClose'>
      <Title level={4}>{currentNoteState.currentNote?.name}</Title>
      <CloseOutlined onClick={() => currentNoteDispatch({ currentNote: null })} />
    </div>
    <Text type="secondary">{currentNoteState.currentNote.discription ? currentNoteState.currentNote.discription : 'Нет описания'}</Text>
    <Text>{currentNoteState.currentNote.cost ? 'Цена: ' + currentNoteState.currentNote.cost + ' рублей' : 'Цена не установленна'}</Text>
    <Text>{currentNoteState.currentNote.deadline ? 'Срок выполнения: ' + currentNoteState.currentNote.deadline.slice(0, currentNoteState.currentNote.deadline.length - 5).split('T').join(' ') : 'Нет срока выполнения'}</Text>
    <Text>{'Дата создания: ' + currentNoteState.currentNote.created.slice(0, currentNoteState.currentNote.created.length - 5).split('T').join(' ')}</Text>
    <div>
      <Button loading={loading} onClick={deleteHandler} >Удалить</Button>
      <Button loading={loading}>Редактировать</Button>
    </div>
  </> : <>
      <Title level={3}>Кликните по элементу списка, чтобы увидеть подробную информацию.</Title>
    </>

  return (
    <div className={className + ' info-wrapper ' + styles.join(' ')}>
      {info}
    </div>
  )
}

export default Info;
{/*
.slice(0, e[types[listType]].length - 5).split('T').join(' ') */}