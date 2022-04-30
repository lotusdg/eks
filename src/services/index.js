const users = require('./users');
const accountProviders = require('./accountProviders');
const accounts = require('./accounts');
const addresses = require('./addresses');

module.exports = {
  ...users,
  ...accountProviders,
  ...accounts,
  ...addresses,
};
