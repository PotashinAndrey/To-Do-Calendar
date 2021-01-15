import React, { useContext, useReducer } from 'react';

const NotesContext = React.createContext();

const initialNotesState = {
  notes: [],
  purchases: []
}

const notesReducer = (state, notes = initialNotesState) => {

  const data = { ...state, ...notes};

  console.log(data)
  return data;

}

const NotesContextProvider = props => {
  const { reducer, initState, children } = props;
  const [notesState, notesDispatch] = useReducer(reducer, initState);
  return <NotesContext.Provider value={{ notesState, notesDispatch }}>{children}</NotesContext.Provider>;
}

const useNotesContext = () => useContext(NotesContext);

export { NotesContext, NotesContextProvider, initialNotesState, notesReducer, getById }
export default useNotesContext;

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

