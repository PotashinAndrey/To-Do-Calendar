import React, { useState, useEffect } from 'react';
import './Search.css';
import useFiltersContext from '../../Contexts/FiltersContext.jsx';
import Modal from '../../utils/Modal.jsx';
import Portal from '../../HOC/Portal.jsx';
import Filter from '../../filter/Filter.jsx';
import SearchLine from './SearchLine.jsx';

export default function Search() {
  const [findedByName, setFindedByName] = useState('');
  const [openModalDatePortal, setOpenModalDatePortal] = useState(null);

  const {filtersState, filtersDispatch} = useFiltersContext();

  useEffect(() => {
    filtersDispatch({
      filters: { ...filtersState.filters, name: findedByName}
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
    filtersDispatch({
      filters: {
        name: '',
        cost: undefined,
        date: undefined,
        priority: undefined,
        state: undefined
      }
    });
    setFindedByName('');
  }

  return (
    <div className="search">
      <SearchLine className="searchinput" findLine={findedByName} setFindLine={setFindedByName} />

      <button onClick={setFilters} >Фильтры</button>
      <button onClick={throwOff}>Сбростить</button>
      {openModalDatePortal}
    </div>
  )
}