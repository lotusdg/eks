const express = require('express');
const controllers = require('../controllers');

const accounts = express.Router();

accounts.get('/', controllers.getAccountsByUserId);
accounts.put('/:id', controllers.updateAccount);
accounts.post('/', controllers.createAccount);
accounts.delete('/:id', controllers.deleteAccount);

module.exports = accounts;
