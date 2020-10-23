const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
    await Blog.deleteMany({});
    
    const blogObjects = helper.initialPosts.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    
    await Promise.all(promiseArray);
});

test('blog posts are returned as json', async () =>{
    await api.get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});


test('blog posts include a parameter called id', async () =>{
    const request = await api.get('/api/blog');
    const blogPosts = request.body;
    expect(blogPosts[0].id).toBeDefined();
});

test('can create a new blog post', async () =>{
    const newPost = {
        'title':'ccc',
        'author':'aaaaa',
        'url':'http://fu.ck',
        'likes': 0
    };

    await api.post('/api/blog')
        .send(newPost)
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJlcm5hcmRvIiwiaWQiOiI1ZjkxZTdhY2M1ODA4NzAyNzhkM2I5MDUiLCJpYXQiOjE2MDM0NDgxMTR9.CBKh4s0EwNojRsZrm3Aukkll6dlRecKf8dWusJEDJnY');
       

    const postsAtEnd = await helper.postsInDb();
    expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1);

    const titles = postsAtEnd.map( post => post.title);

    expect(titles).toContain('ccc');
    
});

test('if a created post does not have the likes property, it defaults to 0', async() => {
    const newPost = {
        'title':'ccc',
        'author':'aaaaa',
        'url':'http://fu.ck',
    };

    await api.post('/api/blog').send(newPost);
    const postsAtEnd = await helper.postsInDb();
    expect(postsAtEnd[postsAtEnd.length - 1].likes).toEqual(0);
});

test('blogs without title or url are invalid', async() => {
    const newPost = {
        'author':'aaaaa',
        'likes': 0
    };

    await api.post('/api/blog')
        .send(newPost)
        .expect(400);
});

describe('deletion of a post', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const postsAtStart = await helper.postsInDb();
        const postToDelete = postsAtStart[0];
  
        await api
            .delete(`/api/blog/${postToDelete.id}`)
            .expect(204);
  
        const postsAtEnd = await helper.postsInDb();
  
        expect(postsAtEnd).toHaveLength(
            helper.initialPosts.length - 1
        );
  
        const titles = postsAtEnd.map(r => r.title);
  
        expect(titles).not.toContain(postToDelete.title);
    });
});

describe('updating a post', () => {
    test('returns the post updated', async () => {
        const posts = await api.get('/api/blog');
        
        const postToUpdateId =  posts.body[0].id;
        console.log(postToUpdateId);
        const postUpdate = {likes : 3000};

        const updatedPost = await api.put(`/api/blog/${postToUpdateId}`).send(postUpdate)
            .expect(200);
        expect(updatedPost.body).toHaveProperty('likes', postUpdate.likes);
    });
});

describe('when there is initially one user in Db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
  
        const passwordHash = await bcrypt.hash('sekret', 10);
        const user = new User({ username: 'root', passwordHash });
  
        await user.save();
    });
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();
  
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        };
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);
  
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  
        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });
});

afterAll(()=>{
    mongoose.connection.close();
});