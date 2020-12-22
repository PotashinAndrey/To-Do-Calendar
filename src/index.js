import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { TokenContextProvider, tokenReducer, initialTokenState } from './Contexts/TokenContext.jsx';

ReactDOM.render(
  <TokenContextProvider reducer={tokenReducer} initState={initialTokenState}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TokenContextProvider>,
  document.getElementById('root')
);
