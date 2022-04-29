const { resFinish } = require('../../utils');

const services = require('../../services');

async function createAccountProvider(req, res) {
  const { code, message } = await services.createAccountProvider(
    req.body,
    req.params.id,
  );
  return resFinish(res, code, message);
}

module.exports = {
  createAccountProvider,
};
