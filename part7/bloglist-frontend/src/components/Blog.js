import React from 'react';
import Togglable from './Togglable';

const Blog = ({ blog, deletePost, likePost, user }) => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };


  return (
    <div style={blogStyle} className='blog'>
      <p>{blog.title} - {blog.author}</p>
      <Togglable buttonLabel='show'>
        <p data-testid="url">{blog.url}</p>
        <div><span data-testid="likes" id="likes">{blog.likes}</span><button id="like-button" data-testid="likeButton" onClick={() => { likePost(blog); }}>like</button></div>
        <p data-testid="username">{blog.user.name}</p>
        {user ? user.username === blog.user.username ? <button onClick={() => { deletePost(blog); }}>remove</button> : <></> : <></>}
      </Togglable>
    </div >
  );
};

export default Blog;
