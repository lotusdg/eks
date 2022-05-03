const { resFinish } = require('../../utils');

const services = require('../../services');

async function sendMessage(req, res) {
  const { code, message } = await services.sendMessageToUser(
    req.body,
    req.params.accountId,
  );
  return resFinish(res, code, message);
}

module.exports = {
  sendMessage,
};
