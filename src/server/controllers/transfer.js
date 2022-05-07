const { resFinish } = require('../../utils');

const services = require('../../services');

async function transfer(req, res) {
  const { code, message } = await services.sendToTgNumber(
    req.body,
    req.params.accountId,
  );
  return resFinish(res, code, message);
}

module.exports = {
  transfer,
};
