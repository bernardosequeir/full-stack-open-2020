const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
    const {password, username, name} = request.body;
    if(!password || password.length <= 3){
        return response.status(400).json({error: 'password length must be greater than 3 '});
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
});

usersRouter.get('/', async (request, response)=> {
    const users = await User.find({}).populate('blogs', {url :1, title: 1, author: 1, id: 1});

    response.json(users);
});
module.exports = usersRouter;

