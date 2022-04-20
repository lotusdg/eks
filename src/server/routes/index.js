const express = require('express');

const server = express();
const bodyParser = require('body-parser');

const { errorHandler } = require('../middlewares');
const { httpCodes } = require('../../utils');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use((req, res) =>
  res.status(httpCodes.notFound).send({ error: `Page not found ${req.path}` }),
);

server.use(errorHandler);

module.exports = server;
