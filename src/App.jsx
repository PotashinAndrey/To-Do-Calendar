import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import MiniToDo from "./MiniToDo.jsx";
import ContextsWrapper from './modules/HOC/ContextsWrapper.jsx';
import Registration from './auth/register/Registration.jsx';
import Login from './auth/login/Login.jsx';
import { useToken } from './auth/useToken.jsx';
import { TokenContextProvider, tokenReducer } from './modules/Contexts/TokenContext.jsx';

function App() {
  const { token, login, logout, userId } = useToken();

  const routes = !token ? (
    <>
      <Route path="/registration" exact component={Registration} />
      <Route path="/" exact component={Login} />
      <Redirect to="/" />
    </>
  ) : (
      <>
        <Route path="/mini">
          <ContextsWrapper >
            <MiniToDo />
          </ContextsWrapper>
        </Route>
        <Redirect to="/mini" />
      </>
    );

  return (
    <div className="wrapper">
      <TokenContextProvider reducer={tokenReducer} initState={{
        token,
        login,
        logout,
        userId,
        isAuth: !!token
      }} >
        <BrowserRouter>
          {/*
          <Route path="/registration" exact component={Registration} />
          <Route path="/" exact component={Login} />

          <Route path="/mini">
            <ContextsWrapper >
              <MiniToDo />
            </ContextsWrapper>
          </Route> */}

          {routes}

        </BrowserRouter>
      </TokenContextProvider>
    </div>
  );
}

export default App;
