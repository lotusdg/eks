const { resFinish } = require('../../utils');

const services = require('../../services');

async function users(req, res) {
  const { code, message } = await services.createUser(req.body);
  resFinish(res, code, message);
}

module.exports = { users };
