const users = require('./users');
const accountProviders = require('./accountProviders');

module.exports = {
  ...users,
  ...accountProviders,
};
