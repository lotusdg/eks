const express = require('express');
const controllers = require('../controllers');

const accounts = express.Router();

accounts.get('/:id', controllers.getAccountsByUserId);
accounts.put('/:id', controllers.updateAccount);

module.exports = accounts;
