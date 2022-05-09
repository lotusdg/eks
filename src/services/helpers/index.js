const sendMessage = require('./sendMessage');
const checkProvider = require('./checkProvider');

module.exports = {
  ...sendMessage,
  ...checkProvider,
};
