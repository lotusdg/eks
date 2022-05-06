const express = require('express');
const controllers = require('../controllers');

const transfer = express.Router();

transfer.post('/:accountId', controllers.sendMessage);

module.exports = transfer;
