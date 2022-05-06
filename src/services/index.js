const users = require('./users');
const accounts = require('./accounts');
const accountProviders = require('./accountProviders');
const token = require('./token');
const transfer = require('./transfer');

module.exports = {
  ...users,
  ...accounts,
  ...accountProviders,
  ...token,
  ...transfer,
};
