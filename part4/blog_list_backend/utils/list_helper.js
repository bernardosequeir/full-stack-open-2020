const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogPosts) => {
    return blogPosts.length === 0 ? 0 : blogPosts.reduce((sum, item) => sum + item.likes,0);
};

const favoriteBlog = (blogPosts) => {
    if(blogPosts.length === 0) return {};
    let favoritePost = blogPosts[0];
    for(let i = 1; i < blogPosts.length; i++){
        if (blogPosts[i].likes > favoritePost.likes)favoritePost=blogPosts[i];
    }
    return favoritePost;
};

const mostBlogs = (blogPosts) => {
    if (blogPosts.length === 0) return {};
    const authors = Object.entries(_.countBy(blogPosts, 'author')).map( ([key, value]) => {return {author : key, blogs: value};});
    return _.maxBy(authors,'blogs');
};

const mostLiked = (blogPosts) => {
    if (blogPosts.length === 0) return {};

    var output =
  _(blogPosts)
      .groupBy('author')
      .map((objs, key) => ({
          'author': key,
          'likes': _.sumBy(objs, 'likes') }))
      .value();
    return _.maxBy(output,'likes');
};



module.exports = { 
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLiked
};