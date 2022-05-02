const express = require('express');

const cors = require('cors');

const server = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./users');

const controllersAuth = require('../controllers/controllersAuth');
const { authorize } = require('../middlewares/authMiddleware');

const { errorHandler } = require('../middlewares');
const { httpCodes } = require('../../utils');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(
  cors({
    origin: '*',
  }),
);
server.use(cookieParser());

server.post('/register', controllersAuth.registerPost);
server.post('/login', controllersAuth.loginPost);
server.get('/refresh', controllersAuth.refreshPost);

server.use(authorize);

server.use('/users', users);

server.use((req, res) =>
  res.status(httpCodes.notFound).send({ error: `Page not found ${req.path}` }),
);

server.use(errorHandler);

module.exports = server;
