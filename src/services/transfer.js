require('../userbotTelegram/authorization')();
const api = require('../userbotTelegram/api');
const { dbWrapper } = require('../server/db');
const { createTransferResponse } = require('../utils');
const { sendMessage, checkProvider } = require('./helpers');

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
          include: [{ model: address }],
        },
        { model: provider },
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
          : '/'.concat(cloneProvider[0].dataValues.account.address.flat),
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
          include: [{ model: address }],
        },
        { model: provider },
      ],
    });

    const { peerId, accessHash } = cloneProvider.dataValues.provider;

    const providerNumber = cloneProvider.dataValues.number;

    const { resCheck } = await checkProvider(
      api,
      peerId,
      accessHash,
      providerNumber,
    );

    const message = 'in develop';

    return createTransferResponse(obj.provider, true, message);
  } catch (err) {
    console.error(err);
    return createTransferResponse(obj.provider, false, {
      error: err.message || err,
    });
  }
}

module.exports = { sendToTgNumber, sendToTgBot };
