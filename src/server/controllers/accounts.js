const { resFinish } = require('../../utils');

const services = require('../../services');

async function getAccountsByUserId(req, res) {
  const { code, message } = await services.getAccountsByUserId(req.params.id);
  return resFinish(res, code, message);
}

async function updateAccount(req, res) {
  const { code, message } = await services.updateAccount(
    req.body,
    req.params.id,
  );
  return resFinish(res, code, message);
}

module.exports = {
  getAccountsByUserId,
  updateAccount,
};
