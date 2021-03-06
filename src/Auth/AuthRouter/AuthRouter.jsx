import React, { useEffect } from 'react';
import { useToken } from '../Token/useToken.jsx';
import { useHttp } from '../../Requests/useHttp.jsx';
import { Route, Redirect } from 'react-router-dom';
import useTokenContext from '../../Contexts/TokenContext.jsx';
import ContextsWrapper from '../../Contexts/ContextsWrapper.jsx';
import Login from "../../Components/Auth/Login.jsx";
import Registration from "../../Components/Auth/Registration.jsx";
import Mini from '../../Components/Mini/Mini.jsx';
import Menu from '../../Components/LeftMenu/Menu.jsx';
import Purchases from '../../Components/Purchases/Purchases.jsx';
import DailySpending from '../../Components/DailySpending/DailySpending.jsx';

const AuthRouter = () => {
  const { token, login, logout, userId } = useToken();
  const { request } = useHttp();
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
      <ContextsWrapper>
        <Menu />

        <Route path="/" exact>
          <Mini />
        </Route>

        <Route path='/purchases'>
          <Purchases />
        </Route>

        <Route path='/dailyspending'>
          <DailySpending />
        </Route>

        <Redirect to="/dailyspending" />
      </ContextsWrapper>
    );

  return (
    <>
      { routes}
    </>
  )
}

export default AuthRouter;