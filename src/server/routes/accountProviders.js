const express = require('express');
const controllers = require('../controllers');

const accounts = express.Router();

accounts.post('/:id', controllers.createAccountProvider);

module.exports = accounts;
