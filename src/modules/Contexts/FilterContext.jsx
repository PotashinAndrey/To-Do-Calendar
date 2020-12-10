import React, { useContext, useReducer } from 'react';

const FilerContext = React.createContext();

const initialFilterState = {
  filterNotes: [],
  filters: {
    name: '',
    cost: null,
    date: null,
    priority: 'Не выбрано'
  }
}


const filterReducer = (state, action = initialFilterState) => {
  if (action.notes && action.notes.length !== 0) {
    if (action.filters) {
      const filters = {...state.filters, ...action.filters }
      const filtred = action.notes.filter(e => e.name.includes(filters.name));
      const data = {filterNotes: filtred, filters: filters};

      return data;
    }
    const filtred = action.notes.filter(e => e.name.includes(state.filters.name));
    const data = {...state, ...{filterNotes: filtred}};

    return data;
  }

  const data = { ...state, ...action };

  return data;
}

const FilterContextProvider = props => {
  const { reducer, initState, children } = props;
  const [filterState, filterDispatch] = useReducer(reducer, initState);
  return <FilerContext.Provider value={{ filterState, filterDispatch }}>{children}</FilerContext.Provider>;
}

const useFilterContext = () => useContext(FilerContext);

function isElementExist(state, id) {
  const element = state.notes.filter(e => e.id === id);

  if (element.length) return true;

  return false;
}

function getById(state, id) {
  if (!isElementExist(state, id)) return null;

  const idArray = state.notes.map(e => e.id);
  const index = idArray.indexOf(id);

  return state.notes[index];
}

function filterNotes() {

}

// function compareDate(compared, toComptare) {
//   return compared.getFullYear() == toComptare.getFullYear() &&
//   compared.getMonth() == toComptare.getMonth() &&
//   compared.getDate() == toComptare.getDate();
// }

export { FilerContext, FilterContextProvider, initialFilterState, filterReducer, getById, filterNotes }
export default useFilterContext;

