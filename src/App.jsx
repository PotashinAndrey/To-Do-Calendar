import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import MiniToDo from "./MiniToDo.jsx";
import ContextsWrapper from './modules/HOC/ContextsWrapper.jsx';
import Registration from './auth/register/Registration.jsx';
import Login from './auth/login/Login.jsx';

function App() {

  return (
    <div className="wrapper">
      <BrowserRouter>

        <Route path="/registration" exact component={Registration} />
        <Route path="/" exact component={Login} />

        <Route path="/mini" component={() => {
          return (
            <ContextsWrapper >
              <MiniToDo />
            </ContextsWrapper>
          )
        }} />
      </BrowserRouter>
    </div>
  );
}

export default App;
