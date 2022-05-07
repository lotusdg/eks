const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const authorize = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    if (!token) return next(ApiError.authenticationRequired('Access denied.'));

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    return next();
  } catch (err) {
    console.log(err);
    return next(ApiError.notImplemented(err.message || err));
  }
};

module.exports = { authorize };
