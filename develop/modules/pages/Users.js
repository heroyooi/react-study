import React, { useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import shortId from 'shortid';
import moment from 'moment';

import { ADD_USER } from '../actions/user';
import useInput from '../components/hooks/useInput';
import './Users.scss';

const Users = () => {
  const { users } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [name, onChangeName, setName] = useInput('');
  const inputEl = useRef(null);

  const onAddUser = useCallback(() => {
    const id = shortId.generate();
    dispatch({
      type: ADD_USER,
      data: {
        id,
        name,
        createdAt: moment(new Date()).format('YYYY-MM-DD'),
      },
    });
    setName('');
    inputEl.current.focus();
  }, [name]);

  return (
    <div className="users">
      <ul>{users.map(v => (<li key={v.id}>{v.name} <span>({v.createdAt})</span></li>))}</ul>
      <input type="text" value={name} onChange={onChangeName} ref={inputEl} />
      <button onClick={onAddUser}>추가</button>
    </div>
  )
}

export default Users;