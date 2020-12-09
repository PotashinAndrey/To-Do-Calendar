import React, { useContext, useReducer } from 'react';

const NoteContext = React.createContext();

const initialNoteState = {
  notes: [],
  currentNote: null
}

const noteReducer = (state, action = initialNoteState) => {
  if (isElementExist(state, action.id)) {
    const idArray = state.notes.map(e => e.id);
    const index = idArray.indexOf(action.id);

    if (action.deleted) {
      state.notes.splice(index, 1);
      return { ...state };
    }

    state.notes[index] = action;

    const data = { ...state }
    return data;
  }

  const data = { ...state, ...action };

  return data;
}

const NoteContextProvider = props => {
  const { reducer, initState, children } = props;
  const [noteState, noteDispatch] = useReducer(reducer, initState);
  return <NoteContext.Provider value={{ noteState, noteDispatch }}>{children}</NoteContext.Provider>;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const useNoteContext = () => useContext(NoteContext);

export { NoteContext, NoteContextProvider, initialNoteState, noteReducer, uuidv4, getById }
export default useNoteContext;

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

