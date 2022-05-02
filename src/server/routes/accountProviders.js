const express = require('express');
const controllers = require('../controllers');

const accountProviders = express.Router();

accountProviders.get('/:id', controllers.getAccountProvidersByAccountId);

module.exports = accountProviders;
