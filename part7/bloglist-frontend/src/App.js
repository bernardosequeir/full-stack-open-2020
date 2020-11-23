import React, { useEffect } from 'react';
import { initializeLogin } from './reducers/loginReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';

import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import Users from './components/Users';
import User from './components/User';
import BlogPage from './components/BlogPage';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeLogin());
  }, [dispatch]);


  const user = useSelector(state => state.login);


  if (user === null) {
    return (
      <Router>
        <LoginForm />
      </Router>
    );
  }

  return (
    <Router>

      <NavBar />
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <BlogPage />
        </Route>
        <Route path="/create">
          <BlogForm />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>


    </Router>
  );
};


export default App;