const users = require('./users');
const auth = require('./auth');
const accountProviders = require('./accountProviders');
const accounts = require('./accounts');
const transfer = require('./transfer');

module.exports = {
  ...users,
  ...auth,
  ...users,
  ...accountProviders,
  ...accounts,
  ...transfer,
};
