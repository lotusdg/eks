const users = require('./users');
const controllersAuth = require('./controllersAuth');

module.exports = {
  ...users,
  ...controllersAuth,
};
