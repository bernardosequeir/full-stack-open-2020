import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const User = () => {
  const id = useParams().id;
  const users = useSelector(state => state.users);
  console.log(
    users
  );
  if (!users) {
    return null;
  }
  const user = users.find(user => user.id === id);
  console.log(user);
  if (!user) {
    return (<h1> user with id {id} not found</h1>);
  }

  return (<>
    <h2>{user.username}</h2>
    <h3>added blogs</h3>
    {user.blogs.length > 0 ? user.blogs.map(blog => <ul key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ul>) : <p>...no blogs by this user yet</p>}
  </>);
};

export default User;