/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(true);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`);
  };

  const likePost = async (blog) => {
    const updatedPost = await blogService.likePost(blog);
    const unsortedBlogs = blogs.map(blog => blog.id !== updatedPost.id ? blog : updatedPost);
    const sortedBlogs = unsortedBlogs.sort((a,b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
  };

  const deletePost = async(blog) => {
    if(window.confirm(`Remove ${blog.title} by ${blog.author}`)){
      await blogService.deleteBlog(blog);
      setBlogs(blogs.filter(post => post.id !== blog.id));
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} success={success} />
        <Togglable buttonLabel='login'>
          <LoginForm setMessage={setMessage} setSuccess={setSuccess} username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser} />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} success={success} />
      <p>{user.name} logged in <button onClick={() => { setUser(null); window.localStorage.removeItem('loggedBlogAppUser'); }}>logout</button></p>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <h2>posts</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likePost={likePost} deletePost={deletePost} user={user}/>
      )}
    </div>
  );
};


export default App;