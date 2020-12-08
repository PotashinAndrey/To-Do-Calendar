import React, { useContext, useReducer } from 'react';

const NoteContext = React.createContext();

const initialNoteState = {
  notes: []
}

const noteReducer = (state, action = initialNoteState) => {


  const data = {...state, ...action};

  return data;
}

const NoteContextProvider = props => {
  const { reducer, initState, children } = props;
  const [noteState, noteDispatch] = useReducer(reducer, initState);
  return <NoteContext.Provider value={{ noteState, noteDispatch }}>{children}</NoteContext.Provider>;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const useNoteContext = () => useContext(NoteContext);

export { NoteContext, NoteContextProvider, initialNoteState, noteReducer, uuidv4 }
export default useNoteContext;

