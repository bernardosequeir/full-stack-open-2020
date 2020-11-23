import blogService from '../services/blogs';

const reducer = (state = null, action) => {
  switch (action.type) {
    case ('INIT_BLOG'):
      return action.data;
    case ('ADD_BLOG'):
      return state.concat(action.data);
    case ('UPDATE_BLOG'):
      return state.map((blog) => blog.id === action.data.id ? action.data : blog);
    case ('DELETE_BLOG'):
      return state.filter(blog => blog.id !== action.data.id);
    default:
      return state;
  }
};


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOG',
      data: blogs
    });
  };
};

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog);
    console.log(newBlog);
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    });
  };
};

export const likePost = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.likePost(blog);
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    });
  };
};

export const commentPost = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.commentPost(blog, comment);
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    });
  };
};

export const deletePost = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog);
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    });
    window.localStorage.removeItem('loggedBlogAppUser');
  };
};


export default reducer;