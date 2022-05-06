require('../userbotTelegram/authorization')();
const api = require('../userbotTelegram/api');
// const { provider, connectionType } = require('../server/db/sequelize');
const { createResponse } = require('../utils');
const { httpCodes } = require('../utils');

async function sendMessageToUser(body, accountId) {
  try {
    // const providers = await provider.findAll({
    //   include: [{ model: connectionType }],
    // });

    const toSend = [];
    body.forEach((element) => {
      if (element.provider === '2f0906c2-9ffe-4327-9015-de9a483dcbeb') {
        toSend.push(element);
      }
    });
    toSend[0].telegramId = 380580799; // 380580799 // 5275313320

    const result = await api.call('messages.sendMessage', {
      peer: {
        _: 'inputPeerUser',
        user_id: toSend[0].telegramId,
        access_hash: '',
      },
      message: toSend[0].value, // message
      random_id:
        Math.ceil(Math.random() * 0xffffff) +
        Math.ceil(Math.random() * 0xffffff),
    });
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

module.exports = { sendMessageToUser };
