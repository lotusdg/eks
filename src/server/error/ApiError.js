const { httpCodes } = require('../../utils');

class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(httpCodes.notFound, message);
  }

  static internal(message) {
    return new ApiError(httpCodes.serverError, message);
  }

  static forbidden(message) {
    return new ApiError(httpCodes.forbidden, message);
  }

  static authenticationRequired(message) {
    return new ApiError(httpCodes.unauthorized, message);
  }

  static notImplemented(message) {
    return new ApiError(httpCodes.notImplemented, message);
  }
}

module.exports = ApiError;
