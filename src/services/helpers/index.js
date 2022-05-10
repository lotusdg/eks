const sendMessage = require('./sendMessage');
const checkProvider = require('./checkProvider');
const addProviderNumber = require('./addProviderNumber');

module.exports = {
  ...sendMessage,
  ...checkProvider,
  ...addProviderNumber,
};
