const express = require('express');
const controllers = require('../controllers');

const users = express.Router();

users.post('/', controllers.users);

module.exports = users;
