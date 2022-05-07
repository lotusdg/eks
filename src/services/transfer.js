require('../userbotTelegram/authorization')();
const api = require('../userbotTelegram/api');
const { dbWrapper } = require('../server/db');
const { createResponse } = require('../utils');
const { httpCodes } = require('../utils');

async function sendToTgNumber(obj, accountId) {
  try {
    const cloneProvider = await dbWrapper().dbModels.accountProvider.findAll({
      where: { accountId },
      include: [
        {
          model: dbWrapper().dbModels.account,
          include: [{ model: dbWrapper().dbModels.address }],
        },
        { model: dbWrapper().dbModels.provider },
      ],
    });

    const tgUserId = 380580799; // peerID from db
    const accountProviderNumber = cloneProvider[0].dataValues.number;
    const accountFullName = cloneProvider[0].dataValues.account.fullName;
    const accountAddress =
      // eslint-disable-next-line prefer-template
      cloneProvider[0].dataValues.account.address.city +
      ', ' +
      cloneProvider[0].dataValues.account.address.street +
      ', ' +
      cloneProvider[0].dataValues.account.address.house +
      (!cloneProvider[0].dataValues.account.address.flat
        ? ''
        : // eslint-disable-next-line prefer-template
          '/' + cloneProvider[0].dataValues.account.address.flat);
    const accountProviderValue = obj.value;
    const accountProviderCounterTypeType =
      cloneProvider[0].dataValues.counterType || '';

    // eslint-disable-next-line max-len
    const message = `${accountProviderNumber}\n${accountFullName}\n${accountAddress}\n${accountProviderValue}\n${accountProviderCounterTypeType}`;
    await api.call('messages.sendMessage', {
      peer: {
        _: 'inputPeerUser',
        user_id: tgUserId, // peerID from db
        access_hash: '', // accessHash from db
      },
      message,
      random_id:
        Math.ceil(Math.random() * 0xffffff) +
        Math.ceil(Math.random() * 0xffffff),
    });

    return createResponse(httpCodes.ok, { success: true });
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

module.exports = { sendToTgNumber };
