import React, { useContext, useReducer } from 'react';

const NotesContext = React.createContext();

const initialNotesState = {
  notes: []
}

const notesReducer = (state, note = initialNotesState) => {
  if (isElementExist(state, note.id)) {
    const idArray = state.notes.map(e => e.id);
    const index = idArray.indexOf(note.id);

    if (note.deleted) {
      state.notes.splice(index, 1);
      // console.log({ ...state })
      return { ...state };
    }

    state.notes[index] = note;

    const data = { ...state }
    // console.log(data)
    return data;
  }

  if (note.id && note.id.length !== 0) {
    const data = { notes: [...state.notes, note] };

    // console.log(data)
    return data;
  }

  // console.log(state)

  return state;
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

