const { httpCodes } = require('../../utils');
const ApiError = require('../error/ApiError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res
    .status(httpCodes.serverError)
    .json({ message: 'Unexpected error!' });
};

module.exports = { errorHandler };
