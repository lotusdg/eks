require('../userbotTelegram/authorization')();
const api = require('../userbotTelegram/api');
const { dbWrapper } = require('../server/db');
const { createTransferResponse } = require('../utils');
const { sendMessage, checkProvider, addProviderNumber } = require('./helpers');

async function sendToTgNumber(obj, accountId) {
  try {
    const { accountProvider, account, address, provider } = await dbWrapper()
      .dbModels;

    const cloneProvider = await accountProvider.findOne({
      where: {
        accountId,
        providerId: obj.provider,
        status: true,
        deletedAt: null,
      },
      include: [
        {
          model: account,
          where: { deletedAt: null },
          include: [{ model: address }],
        },
        { model: provider, where: { deletedAt: null } },
      ],
    });

    const { peerId, accessHash } = cloneProvider.dataValues.provider;
    const accountProviderNumber = cloneProvider.dataValues.number;
    const accountFullName = cloneProvider.dataValues.account.fullName;
    const accountProviderValue = obj.value;
    const accountProviderCounter =
      cloneProvider.dataValues.counterInstalled || '';

    const accountFullAddress = cloneProvider.dataValues.account.address.city
      .concat(', ')
      .concat(cloneProvider.dataValues.account.address.street)
      .concat(', ')
      .concat(cloneProvider.dataValues.account.address.house)
      .concat(
        !cloneProvider.dataValues.account.address.flat
          ? ''
          : '/'.concat(cloneProvider.dataValues.account.address.flat),
      );

    const message = accountProviderNumber
      .concat('\n')
      .concat(accountFullName)
      .concat('\n')
      .concat(accountFullAddress)
      .concat('\n')
      .concat(accountProviderValue)
      .concat('\n')
      .concat(accountProviderCounter);

    await sendMessage(api, peerId, accessHash, message);

    return createTransferResponse(obj.provider, true, message);
  } catch (err) {
    console.error(err);
    return createTransferResponse(obj.provider, false, {
      error: err.message || err,
    });
  }
}

async function sendToTgBot(obj, accountId) {
  try {
    const { accountProvider, account, address, provider } = await dbWrapper()
      .dbModels;

    const cloneProvider = await accountProvider.findOne({
      where: {
        accountId,
        providerId: obj.provider,
        status: true,
        deletedAt: null,
      },
      include: [
        {
          model: account,
          where: { deletedAt: null },
          include: [{ model: address }],
        },
        { model: provider, where: { deletedAt: null } },
      ],
    });

    const { peerId, accessHash, code } = cloneProvider.dataValues.provider;

    const providerNumber = cloneProvider.dataValues.number;

    const { resCheck } = await checkProvider(
      api,
      peerId,
      accessHash,
      providerNumber,
    );

    if (resCheck === false) {
      await addProviderNumber(api, peerId, accessHash, providerNumber);
    }

    let message;

    switch (code) {
      case '03357168':
        message = obj.value.split(':');
        if (!message[0] || !message[1]) {
          throw new Error('Water indicators value had not pass the validation');
        }
        await sendMessage(api, 380580799, accessHash, message[0]); // peerId!
        await sendMessage(api, 380580799, accessHash, message[1]); // peerId!
        break;
      case '22800735':
        message = obj.value;
        if (!message) {
          throw new Error(
            'Energy indicators value had not pass the validation',
          );
        }
        await sendMessage(api, 380580799, accessHash, message); // peerId!
        break;
      default:
        throw new Error('Incorrect indicators');
    }

    return createTransferResponse(obj.provider, true, message);
  } catch (err) {
    console.error(err);
    return createTransferResponse(obj.provider, false, {
      error: err.message || err,
    });
  }
}

module.exports = { sendToTgNumber, sendToTgBot };
