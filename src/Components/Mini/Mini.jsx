import React, { useEffect } from 'react';
import Menu from "../LeftMenu/Menu.jsx";
import Calendar from "./Calendar/Calendar.jsx";
import Info from "./Info/Info.jsx";
import MiniList from "./MiniList/MiniList.jsx";
import { useHttp } from '../../Requests/useHttp.jsx';
import useTokenContext from '../../Contexts/TokenContext.jsx';
import useNotesContext from '../../Contexts/NotesContext.jsx';
import './Mini.css';

const Mini = () => {
  const { tokenState } = useTokenContext();
  const { request } = useHttp();

  const { notesDispatch } = useNotesContext();

  useEffect(() => {
    resposnceHandler();
  }, []);

  async function resposnceHandler() {
    try {
      const data = await request('/api/note/all', 'GET', null, { Authorization: tokenState.token });

      console.log(data);
      notesDispatch({notes: data});
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="wrapper">
      <Menu />
      <div className="container">
        <Calendar className="C1-R1" />
        <MiniList className="C2-R1" />
        <Info className="C1-R2" />
      </div>
    </div>
  )
}

export default Mini;