import React, { useCallback, useEffect, useState } from 'react';

export const useToken = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] =useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    // console.log('login! ');

    localStorage.setItem('userData', JSON.stringify({userId: id, token: jwtToken}));
  } , []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    // console.log('logout! ');

    localStorage.removeItem('userData');
  } , []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return {login, logout, token, userId};
}