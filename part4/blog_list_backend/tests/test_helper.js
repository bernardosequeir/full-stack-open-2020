const Blog = require('../models/blog');
const User = require('../models/user');

const initialPosts = [
    {   
        'title':'aaaa',
        'author':'meaaaaa',
        'url':'http://fu.ck',
        'likes': 1
    },
    {   
        'title':'bbaaab',
        'author':'someone else',
        'url':'http://lets.go',
        'likes': 99
    }
];

const postsInDb = async() => {
    const posts = await Blog.find({});
    return posts.map(blog => blog.toJSON());
};

const usersInDb = async() => {
    const users = await User.find({});
    return users.map(blog => blog.toJSON());
};

module.exports = {
    initialPosts, postsInDb, usersInDb
};