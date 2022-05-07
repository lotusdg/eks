const express = require('express');
const controllers = require('../controllers');

const users = express.Router();

users.post('/', controllers.createUser);
users.put('/', controllers.updateUser);
users.get('/', controllers.getUser);
users.delete('/', controllers.deleteUser);

module.exports = users;
