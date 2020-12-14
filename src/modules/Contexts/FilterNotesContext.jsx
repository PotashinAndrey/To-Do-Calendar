import React, { useContext, useReducer } from 'react';

const FilterNotesContext = React.createContext();

const initialFilterNotesState = {
  filterNotes: []
}


const filterNotesReducer = (state, action = initialFilterNotesState) => {
  if (action.notes) {
    const data = { filterNotes: action.notes };

    // console.log(data);
    return data;
  }

  return state;
}


const FilterNotesContextProvider = props => {
  const { reducer, initState, children } = props;
  const [filterNotesState, filterNotesDispatch] = useReducer(reducer, initState);
  return <FilterNotesContext.Provider value={{ filterNotesState, filterNotesDispatch }}>{children}</FilterNotesContext.Provider>;
}

const useFilterContext = () => useContext(FilterNotesContext);

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


export { FilterNotesContext, FilterNotesContextProvider, initialFilterNotesState, filterNotesReducer, getById }
export default useFilterContext;

