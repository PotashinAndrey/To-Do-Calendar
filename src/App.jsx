import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRouter from './Auth/AuthRouter/AuthRouter.jsx';
import 'antd/dist/antd.css';
import 'antd-button-color/dist/css/style.css';
import './App.css';


function App() {

  return (
    <div className="wrapper">
      <BrowserRouter>
        <AuthRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
