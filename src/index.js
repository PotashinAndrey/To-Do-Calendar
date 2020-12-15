import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import ContextsWrapper from './modules/HOC/ContextsWrapper.jsx';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
