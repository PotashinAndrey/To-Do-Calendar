import React, { useState, useEffect } from 'react';
import './Search.css';
import useFilterContext from '../../Contexts/FilterContext.jsx';
import useNoteContext from '../../Contexts/NoteContext.jsx';
import Modal from '../../utils/Modal.jsx';
import Portal from '../../Contexts/Portal.jsx';
import Filter from '../../filter/Filter.jsx';

export default function Search() {
  const [findedByName, setFindedByName] = useState('');
  const [openModalDatePortal, setOpenModalDatePortal] = useState(null);

  const {filterState, filterDispatch} = useFilterContext();
  const {noteState} = useNoteContext();

  useEffect(() => {
    filterDispatch({
      filters: { ...filterState.filters, name: findedByName},
      notes: noteState.notes
    });
  }, [findedByName]);

  function setFilters() {
    setOpenModalDatePortal(<Portal id="root">
    <Modal
      text={{ header: 'Фильры', main: 'Выберете фильры поиска'}}
      isOpen={true}
      onClick={() => setOpenModalDatePortal(null)}
    >
      <Filter />
    </Modal>
  </Portal>);
  }

  function throwOff() {
    filterDispatch({
      notes: noteState.notes,
      filters: {
        name: '',
        cost: 0,
        date: null,
        priority: '',
        state: ''
      }
    });
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Поиск..."
        className="searchinput"
        onChange={e => setFindedByName(e.target.value)}
      />
      <button onClick={setFilters} >Фильтры</button>
      <button onClick={throwOff}>Сбростить</button>
      {openModalDatePortal}
    </div>
  )
}