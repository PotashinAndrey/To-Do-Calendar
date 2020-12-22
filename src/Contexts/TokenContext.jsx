import React, { useReducer, useContext } from 'react';

const TokenContext = React.createContext();

const initialTokenState = {
  token: null,
  login: null,
  logout: null,
  userId: null,
  isAuth: false
}

const tokenReducer = (state, action) => {
  const data = {...state, ...action};

  return data;
}

const TokenContextProvider = props => {
  const {reducer, initState, children} = props;
  const [tokenState, tokenDispatch] = useReducer(reducer, initState);
  return <TokenContext.Provider value={{tokenState, tokenDispatch}} >{children}</TokenContext.Provider>;
}

const useTokenContext = () => useContext(TokenContext);

export {TokenContext, TokenContextProvider, tokenReducer, initialTokenState};
export default useTokenContext;