import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addBlog } from '../reducers/blogReducer';

const BlogForm = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const createBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url
    };
    dispatch(addBlog(blogObject));
    history.push('/');
  };

  //TODO: ADD NOTIFICATIONS BACK
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlog} className="formDiv">
        <div>
          title
          <input id="title" type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input id="author" type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input id="url" type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </>
  );
};


export default BlogForm;