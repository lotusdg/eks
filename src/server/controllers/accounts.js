const { resFinish } = require('../../utils');

const services = require('../../services');

async function createAccount(req, res) {
  const { code, message } = await services.createAccount(req.body, req.user.id);
  return resFinish(res, code, message);
}

async function getAccountsByUserId(req, res) {
  const { code, message } = await services.getAccountsByUserId(req.user.id);
  return resFinish(res, code, message);
}

async function updateAccount(req, res) {
  const { code, message } = await services.updateAccount(
    req.body,
    req.params.id,
  );
  return resFinish(res, code, message);
}

async function deleteAccount(req, res) {
  const { code, message } = await services.deleteAccount(req.params.id);
  return resFinish(res, code, message);
}

module.exports = {
  getAccountsByUserId,
  updateAccount,
  createAccount,
  deleteAccount,
};
