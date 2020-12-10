import React, { useState, useEffect } from 'react';
import './AboutEvent.css';
import Selector from '../utils/Selector.jsx';
import useNoteContext from '../Contexts/NoteContext.jsx';
import Portal from '../Contexts/Portal.jsx';
import Modal from '../utils/Modal';
import ChooseDate from '../utils/ChooseDate/ChooseDate.jsx';

export default function AboutEvent() {
  const { noteState, noteDispatch } = useNoteContext();

  const [name, setName] = useState(noteState.currentNote.name);
  const [discription, setDiscription] = useState(noteState.currentNote.discription);
  const [priority, setPriority] = useState(noteState.currentNote.priority);
  const [state, setState] = useState(noteState.currentNote.state);
  const [children, setChildren] = useState(noteState.currentNote.children);
  const [deadline, setDeadline] = useState(noteState.currentNote.deadline);
  const [cost, setCost] = useState(noteState.currentNote.cost);

  const [openModalDatePortal, setOpenModalDatePortal] = useState(null);

  useEffect(() => {
    setName(noteState.currentNote.name);
    setDiscription(noteState.currentNote.discription);
    setPriority(noteState.currentNote.priority);
    setState(noteState.currentNote.state);
    setChildren(noteState.currentNote.children);
    setDeadline(noteState.currentNote.deadline);
    setCost(noteState.currentNote.cost);
  }, [noteState]);


  function closeAboutEvent() {
    noteDispatch({ currentNote: null });
  }

  function saveHandler() {
    noteDispatch({
      time: noteState.currentNote.time,
      children: [],
      state: state,
      priority: priority,
      id: noteState.currentNote.id,
      name: name,
      discription: discription,
      deadline: deadline,
      cost: cost
    });
    closeAboutEvent();
  }

  function deleteHandler() {
    noteDispatch({
      id: noteState.currentNote.id,
      deleted: true
    });
    closeAboutEvent();
  }

  function choiceDeadline() {
    setOpenModalDatePortal(<Portal id="root">
      <Modal
        text={{ header: 'Выберите дату и время', main: 'Выберете дату и время окончания события' }}
        isOpen={true}
        onClick={() => setOpenModalDatePortal(null)}
      >
        <ChooseDate setDeadline={setDeadline} />
      </Modal>
    </Portal>);
  }

  const priorityVariants = [
    { text: 'Не выбран', color: 'gray' },
    { text: 'Низкий', color: 'green' },
    { text: 'Средний', color: 'yellow' },
    { text: 'Высокий', color: 'red' },
  ]

  const todoVariants = [
    { text: 'Не выполнено', color: "rgb(240, 250, 105)" },
    { text: 'Выполнено', color: 'rgba(118, 175, 127, 1)' },
    { text: 'Отменено', color: 'rgba(200, 200, 200, 1)' }
  ]

  return (
    <div className="aboutevent note" >
      <span className="aboutevent-span">
        <input className="aboutevent-name" value={name} onChange={e => setName(e.target.value)} />
        <p>{noteState.currentNote.time.toLocaleString()}</p>
        <img
          src="https://img.icons8.com/metro/452/close-window.png"
          alt="закрыть" onClick={closeAboutEvent}
        />
      </span>

      <textarea
        onChange={e => setDiscription(e.target.value)}
        value={discription}
        className="aboutevent-textarea"
        placeholder="Добавьте описание..."
      ></textarea>

      <div className="aboutevent-edit">
        <span className="selectors">
          <Selector text="Приоритет: " value={priority} variants={priorityVariants} onChange={setPriority} />
          <Selector text="Состояние: " value={state} variants={todoVariants} onChange={setState} />
        </span>

        <span className="aboutevent-deadline">
          <p>{deadline === null ? 'Выберете дату и время окночания: ' : `Окончание: ${deadline.toLocaleString()}`}</p>
          <button onClick={choiceDeadline}>Выбрать</button> {/*//!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
          {openModalDatePortal}
        </span>

        <span className="aboutevent-children">
          <p>Установите цену: </p>
          <input
            className="aboutevent-cost"
            type="text"
            placeholder="Цена..."
            value={cost} onChange={e => setCost(e.target.value)}
          />
          <p>Выберете подзадачи: </p>
          <button>Выбрать</button> {/*//!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        </span>

        <span className="aboutevent-delete">
          <button onClick={saveHandler} >Сохранить</button>
          <button onClick={deleteHandler}>Удалить задачу</button>
        </span>

      </div>
    </div>
  )
}