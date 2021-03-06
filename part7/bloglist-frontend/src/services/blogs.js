import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async newObject => {

  const config = {
    headers: { authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  console.log(response.data);
  return response.data;
};

const likePost = async blogPost => {
  const changedBlog = {
    user: blogPost.user.id,
    likes: blogPost.likes + 1,
    author: blogPost.author,
    title: blogPost.title,
    url: blogPost.url,
    comments: blogPost.comments || []
  };
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${blogPost.id}`, changedBlog, config);
  return response.data;
};

const commentPost = async (blogPost, comment) => {
  const changedBlog = {
    user: blogPost.user.id,
    likes: blogPost.likes,
    author: blogPost.author,
    title: blogPost.title,
    url: blogPost.url,
    comments: blogPost.comments ? blogPost.comments.concat(comment) : [comment]
  };
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${blogPost.id}`, changedBlog, config);
  return response.data;
};


const deleteBlog = async blogPost => {
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blogPost.id}`, config);
  return response.data;
};

export default { setToken, getAll, create, likePost, commentPost, deleteBlog };