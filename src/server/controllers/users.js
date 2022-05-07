const { resFinish } = require('../../utils');
const services = require('../../services');

async function createUser(req, res) {
  // const { code, message } = await services.createUser(req.body);
  const { code, message } = await services.createUser(req.body);
  return resFinish(res, code, message);
}

async function updateUser(req, res) {
  const { code, message } = await services.updateUser(req.body, req.user.id);
  return resFinish(res, code, message);
}

async function getUser(req, res) {
  const { code, message } = await services.getUser(req.user.id);
  return resFinish(res, code, message);
}

async function deleteUser(req, res) {
  const { code, message } = await services.deleteUser(req.user.id);
  return resFinish(res, code, message);
}

module.exports = { createUser, updateUser, getUser, deleteUser };
