/* eslint-disable no-restricted-globals */
import React from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
const LoginForm = ({ username, setUsername, password, setPassword, setUser, setMessage, setSuccess }) => {

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

    } catch (exception) {
      setSuccess(false);
      setMessage('wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    setUsername('');
    setPassword('');
  };


  return (
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
  );

};



export default LoginForm;