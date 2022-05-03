const users = require('./users');
const auth = require('./auth');
const accountProviders = require('./accountProviders');
const accounts = require('./accounts');

module.exports = {
  ...users,
  ...auth,
  ...users,
  ...accountProviders,
  ...accounts,
};