import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';
import Notification from './Notification';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.login);
  console.log(user);

  if (blogs === null || user === null) {
    return null;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>

      {
        blogs.map(blog =>
          <p key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
        )
      }
    </div>);
};

export default BlogList;