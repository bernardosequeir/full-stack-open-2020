import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likePost, commentPost } from '../reducers/blogReducer';

const BlogPage = () => {
  const id = useParams().id;
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  if (!blogs) {
    return null;
  }
  const blog = blogs.find(user => user.id === id);
  if (!blog) {
    return (<h1> user with id {id} not found</h1>);
  }
  const like = async () => {
    dispatch(likePost(blog));
  };

  const comment = async (event) => {
    const comment = event.target.comment.value;
    console.log(comment);
    event.preventDefault();
    dispatch(commentPost(blog, comment));
  };
  return (<>
    <h2>{blog.title}</h2>
    <p><a href={blog.url}>{blog.url}</a></p>
    <div><span>{blog.likes}</span><button onClick={() => like()}>like</button></div>
    <h3>comments</h3>
    <form onSubmit={comment}>
      <input name="comment"></input><button >add comment</button>
    </form>
    {!blog.comments || blog.comments.length === 0
      ? 'nothing to see here'
      : blog.comments.map(comment => <p key={comment}>{comment}</p>)

    }

  </>);
};

export default BlogPage;