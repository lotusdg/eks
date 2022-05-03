const users = require('./users');
const accounts = require('./accounts');
const accountProviders = require('./accountProviders');
const transfer = require('./transfer');

module.exports = {
  ...users,
  ...accounts,
  ...accountProviders,
  ...transfer,
};
