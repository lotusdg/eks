const express = require('express');
const controllers = require('../controllers');

const users = express.Router();

users.post('/', controllers.createUser);
users.put('/:id', controllers.updateUser);
users.get('/:id', controllers.getUser);
users.delete('/:id', controllers.deleteUser);

module.exports = users;
