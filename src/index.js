import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import ContextsWrapper from './modules/HOC/ContextsWrapper.jsx';


ReactDOM.render(
  <ContextsWrapper >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextsWrapper>,
  document.getElementById('root')
);
