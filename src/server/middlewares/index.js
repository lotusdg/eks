const { errorHandler } = require('./errorHandler');
const { authMiddleware } = require('./authMiddleware');

module.exports = { errorHandler, authMiddleware };
