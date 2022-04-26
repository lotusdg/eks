const { httpCodes } = require('../../utils');

const errorHandler = (err, req, res) => {
  res.status(httpCodes.serverError);
  res.render('error', { error: err });
};

module.exports = { errorHandler };
