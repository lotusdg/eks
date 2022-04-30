const { resFinish } = require('../../utils');

// const services = require('../../services');
const db = require('../db');

async function createUser(req, res) {
  // const { code, message } = await services.createUser(req.body);
  const { code, message } = await db.dbWrapper().createUser(req.body);
  return resFinish(res, code, message);
}

async function updateUser(req, res) {
  const { code, message } = await db
    .dbWrapper()
    .updateUser(req.body, req.params.id);
  return resFinish(res, code, message);
}

async function getUser(req, res) {
  const { code, message } = await db.dbWrapper().getUser(req.params.id);
  return resFinish(res, code, message);
}

async function deleteUser(req, res) {
  const { code, message } = await db.dbWrapper().deleteUser(req.params.id);
  return resFinish(res, code, message);
}

module.exports = { createUser, updateUser, getUser, deleteUser };
