import React, { useContext, useReducer } from 'react';

const CurrentNoteContext = React.createContext();

const initialCurrentNoteState = {
  currentNote: null
}

const currentNoteReducer = (state, action = initialCurrentNoteState) => {
  if (action.currentNote) {
    const data = { currentNote: { ...state.currentNote, ...action.currentNote } };

    // console.log(data);
    return data;
  }

  const data = { ...state, ...action };
  // console.log(data);

  return data;
}

const CurrentNoteContextProvider = props => {
  const { reducer, initState, children } = props;
  const [currentNoteState, currentNoteDispatch] = useReducer(reducer, initState);
  return <CurrentNoteContext.Provider value={{ currentNoteState, currentNoteDispatch }}>{children}</CurrentNoteContext.Provider>;
}

const useCurrentNoteContext = () => useContext(CurrentNoteContext);

export { CurrentNoteContext, CurrentNoteContextProvider, initialCurrentNoteState, currentNoteReducer }
export default useCurrentNoteContext;

