import React, { useState } from 'react';
const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url
    };
    setTitle('');
    setAuthor('');
    setUrl('');
    createBlog(blogObject);
  };

  return (

    <form onSubmit={addBlog} className="formDiv">
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

  );
};


export default BlogForm;