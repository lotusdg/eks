require('../userbotTelegram/authorization')();
const api = require('../userbotTelegram/api');
// const { dbWrapper } = require('../server/db');
const { createResponse } = require('../utils');
const { httpCodes } = require('../utils');

async function sendToTgNumber(body, accountId) {
  try {
    // const providers = await dbWrapper().dbModels.accountProvider.findAll({
    //   where: { accountId },
    //   include: [
    //     {
    //       model: dbWrapper().dbModels.provider,
    //       include: [{ model: dbWrapper().dbModels.connectionType }],
    //     },
    //   ],
    // });

    // const toSend = [];

    // body.forEach((element1) => {
    //   providers.forEach((element2) => {
    //     if (
    //       element1.provider === element2.provider.id &&
    //       element2.provider.connectionType.code === 3
    //     ) {
    //       toSend.push(element1);
    //       toSend[0].tgId = 380580799; // 380580799 // 5275313320
    //     }
    //   });
    // });

    // const result = await api.call('messages.sendMessage', {
    //   peer: {
    //     _: 'inputPeerUser',
    //     user_id: toSend[0].tgId,
    //     access_hash: '',
    //   },
    //   message: toSend[0].value, // message
    //   random_id:
    //     Math.ceil(Math.random() * 0xffffff) +
    //     Math.ceil(Math.random() * 0xffffff),
    // });

    const tgUserId = 380580799;
    const accountProviderNumber = '12345';
    const accountFullName = 'Іванов І.І.';
    const accountAddress = 'м. Черкаси, вул. Чорновола, 1';
    const accountProviderValue = '123';
    const accountProviderValueType = 'кухня';

    // eslint-disable-next-line max-len
    const message = `${accountProviderNumber}\n${accountFullName}\n${accountAddress}\n${accountProviderValue}\n${accountProviderValueType}`;
    const result = await api.call('messages.sendMessage', {
      peer: {
        _: 'inputPeerUser',
        user_id: tgUserId,
        access_hash: '',
      },
      message,
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

module.exports = { sendToTgNumber };
