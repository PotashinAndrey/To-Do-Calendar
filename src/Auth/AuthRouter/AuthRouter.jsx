import React, { useEffect } from 'react';
import { useToken } from '../Token/useToken.jsx';
import { Route, Redirect } from 'react-router-dom';
import useTokenContext from '../../Contexts/TokenContext.jsx';
import ContextsWrapper from '../../Contexts/ContextsWrapper.jsx';
import Login from "../../Components/Auth/Login.jsx";
import Registration from "../../Components/Auth/Registration.jsx";

const AuthRouter = () => {
  const { token, login, logout, userId } = useToken();
  const { tokenDispatch } = useTokenContext();

  useEffect(() => {
    tokenDispatch({
      token: token,
      login,
      logout,
      userId,
      isAuth: !!token
    });
  }, [token]);

  const routes = !token ? (
    <>
      <Route path="/registration" exact component={Registration} />
      <Route path="/login" exact component={Login} />
      <Redirect to="/login" />
    </>
  ) : (
      <>
        <Route path="/" exact>
          <ContextsWrapper>

          </ContextsWrapper>
        </Route>
        <Redirect to="/" />
      </>
    );

  return (
    <>
      { routes}
    </>
  )
}

export default AuthRouter;