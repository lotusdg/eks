const express = require('express');

const cors = require('cors');

const server = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./users');
const accountProviders = require('./accountProviders');
const accounts = require('./accounts');

const auth = require('../controllers/auth');
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

server.post('/register', auth.registerPost);
server.post('/login', auth.loginPost);
server.get('/refresh', auth.refreshPost);

server.use(authorize);

server.use('/users', users);
server.use('/accountProviders', accountProviders);
server.use('/accounts', accounts);

server.use((req, res) =>
  res.status(httpCodes.notFound).send({ error: `Page not found ${req.path}` }),
);

server.use(errorHandler);

module.exports = server;
