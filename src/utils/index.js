function createResponse(code, message) {
  return { code, message };
}

function fatal(message) {
  console.error(message);
  process.exit(1);
}

const httpCodes = {
  ok: 200,
  badReq: 400,
  notFound: 404,
  unauthorized: 401,
  serverError: 500,
};

function resFinish(res, code, message) {
  res.status(code).json(message);
}

module.exports = {
  fatal,
  createResponse,
  httpCodes,
  resFinish,
};
