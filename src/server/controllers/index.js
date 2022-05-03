const users = require('./users');
const accountProviders = require('./accountProviders');
const accounts = require('./accounts');
const transfer = require('./transfer');

module.exports = {
  ...users,
  ...accountProviders,
  ...accounts,
  ...transfer,
};
