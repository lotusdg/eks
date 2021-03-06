function createResponse(code, message) {
  return { code, message };
}

function createTransferResponse(provider, success, message) {
  return { provider, success, message };
}

function fatal(message) {
  console.error(message);
  process.exit(1);
}

const httpCodes = {
  ok: 200,
  badReq: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
  notImplemented: 501,
};

function resFinish(res, code, message) {
  res.status(code).json(message);
}

module.exports = {
  fatal,
  createResponse,
  httpCodes,
  resFinish,
  createTransferResponse,
};
