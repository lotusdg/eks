const express = require('express');
const controllers = require('../controllers');

const accountProviders = express.Router();

accountProviders.post('/:id', controllers.createAccountProvider);
accountProviders.get('/:id', controllers.getAccountProvidersByAccountId);

module.exports = accountProviders;
