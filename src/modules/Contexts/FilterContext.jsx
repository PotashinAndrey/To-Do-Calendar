import React, { useContext, useReducer } from 'react';

const FilerContext = React.createContext();

const initialFilterState = {
  filterNotes: [],
  filters: {
    name: '',
    cost: 0,
    date: null,
    priority: '',
    state: '',
    creationTime: null
  }
}


const filterReducer = (state, action = initialFilterState) => {
  if (action.notes && action.notes.length !== 0) {
    if (action.filters) {
      const filters = { ...state.filters, ...action.filters }
      const filtred = filterNotes(action.notes, filters);

      const data = { filterNotes: filtred, filters: filters };

      return data;
    }
    const filtred = filterNotes(action.notes, state.filters);
    const data = { ...state, ...{ filterNotes: filtred } };

    return data;
  }

  if (!action.notes && action.filters) {
    const filters = { ...state.filters, ...action.filters }
    const filtred = filterNotes(state.filterNotes, filters);

    const data = { filterNotes: filtred, filters: filters };

    console.log('!AN && AF');

    return data;
  }

  // const data = { ...state, ...action };
  const data = { filterNotes: state.filterNotes, filters: { ...state.filters, ...action.filters } };

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

function filterNotes(toFilter, filters) {
  const filtredByName = toFilter.filter(e => e.name.includes(filters.name));
  const filtredByCost = filters.cost === 0 ? filtredByName : filtredByName.filter(
    e => +e.cost <= +filters.cost && +e.cost !== 0
  );
  const filtredByDate = filters.date ? filtredByCost.filter(
    e => e.deadline?.getMonth() <= filters.date.month && e.deadline?.getDate() <= filters.date.day
  ) : filtredByCost;
  const filtredByPriority = filters.priority === '' ? filtredByDate : filtredByDate.filter(
    e => e.priority === filters.priority
  );
  const filtredByState = filters.state === '' ? filtredByPriority : filtredByPriority.filter(
    e => e.state === filters.state
  );

  return filtredByState;
}

// function compareDate(compared, toComptare) {
//   return compared.getFullYear() == toComptare.getFullYear() &&
//   compared.getMonth() == toComptare.getMonth() &&
//   compared.getDate() == toComptare.getDate();
// }

export { FilerContext, FilterContextProvider, initialFilterState, filterReducer, getById }
export default useFilterContext;

