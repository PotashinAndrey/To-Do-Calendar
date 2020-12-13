import React, { useState} from 'react';
import './AboutEvent.css';
import Selector from '../utils/Selector.jsx';
import Portal from '../HOC/Portal.jsx'
import Modal from '../utils/Modal';
import ChooseDate from '../utils/ChooseDate/ChooseDate.jsx';
import ChooseCost from './ChooseCost.jsx';
import ChooseChildren from './ChooseChildren.jsx';
import useCurrentNoteContext from '../Contexts/CurrentNoteContext.jsx';
import useNotesContext from '../Contexts/NotesContext.jsx';
import useFiltersContext from '../Contexts/FiltersContext.jsx';


export default function AboutEvent() {
  const { currentNoteState, currentNoteDispatch } = useCurrentNoteContext();
  const { filtersDispatch } = useFiltersContext();
  const { notesDispatch } = useNotesContext();

const [ openModalDatePortal, setOpenModalDatePortal ] = useState(null);
const [ openModalChildrenPortal, setOpenModalChildrenPortal ] = useState(null);

  function closeAboutEvent() {
    currentNoteDispatch();
  }

  function saveHandler() {
    notesDispatch(currentNoteState.currentNote);
    closeAboutEvent();
  }

  function deleteHandler() {
    notesDispatch({
      id: currentNoteState.currentNote.id,
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
        <ChooseDate currentDate={currentNoteState.currentNote.date} setDeadline={date => currentNoteDispatch({ currentNote: { date: date } })} />
      </Modal>
    </Portal>);
  }

  function choiceChildren() {
    filtersDispatch();
    setOpenModalChildrenPortal(<Portal id="root">
      <Modal
        text={{ header: 'Выберите подзадачи', main: 'Введите название' }}
        isOpen={true}
        onClick={() => setOpenModalChildrenPortal(null)}
      >
        <ChooseChildren />
      </Modal>
    </Portal>);
  }

  const priorityVariants = [
    { text: 'not choice', color: 'gray' },
    { text: 'low', color: 'green' },
    { text: 'medium', color: 'yellow' },
    { text: 'high', color: 'red' },
  ]

  const todoVariants = [
    { text: 'todo', color: "rgb(240, 250, 105)" },
    { text: 'done', color: 'rgba(118, 175, 127, 1)' },
    { text: 'canceled', color: 'rgba(200, 200, 200, 1)' }
  ]

  return (
    <div className="aboutevent note" >
      <span className="aboutevent-span">
        <input
          className="aboutevent-name"
          value={currentNoteState.currentNote.name}
          onChange={e => currentNoteDispatch({ currentNote: { name: e.target.value } })}
        />
        <img
          src="https://img.icons8.com/metro/452/close-window.png"
          alt="закрыть" onClick={closeAboutEvent}
        />
        <p>{currentNoteState.currentNote.creationTime.toLocaleString()}</p>
      </span>

      <textarea
        onChange={e => currentNoteDispatch({
          currentNote: { discription: e.target.value === '' ? undefined : e.target.value }
        })}
        value={currentNoteState.currentNote.discription}
        className="aboutevent-textarea"
        placeholder="Добавьте описание..."
      ></textarea>

      <div className="aboutevent-edit">
        <span className="selectors">
          <Selector
            text="Приоритет: "
            value={currentNoteState.currentNote.priority}
            variants={priorityVariants}
            onChange={e => currentNoteDispatch({ currentNote: { priority: e } })}
          />
          <Selector
            text="Состояние: "
            value={currentNoteState.currentNote.state}
            variants={todoVariants}
            onChange={e => currentNoteDispatch({ currentNote: { state: e } })}
          />
        </span>

        <span className="aboutevent-deadline">
          <p>{currentNoteState.currentNote.date === undefined ? 'Выберете дату и время окночания: ' :
            `Окончание: ${currentNoteState.currentNote.date?.toLocaleString()}`}</p>
          <button onClick={choiceDeadline}>Выбрать</button>
          {openModalDatePortal}
        </span>

        <span className="aboutevent-children">
          <ChooseCost cost={currentNoteState.currentNote.cost} setCost={e => currentNoteDispatch({ currentNote: { cost: e } })} />
          <p>Выберете подзадачи: </p>
          <button onClick={choiceChildren} >Выбрать</button>
          {openModalChildrenPortal}
        </span>

        <span className="aboutevent-delete">
          <button onClick={saveHandler} >Сохранить</button>
          <button onClick={deleteHandler}>Удалить задачу</button>
        </span>
      </div>
    </div>
  )
}