/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../reducers/loginReducer';
import Notification from './Notification';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    history.push('/');
  };


  return (
    <>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin} >
        <div>
          username
          <input id='username' type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </>
  );

};



export default LoginForm;