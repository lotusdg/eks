require('../userbotTelegram/authorization')();
const api = require('../userbotTelegram/api');
const { dbWrapper } = require('../server/db');
const { createTransferResponse } = require('../utils');
const { sendMessage, checkProvider, addProviderNumber } = require('./helpers');

async function sendToTgNumber(job) {
  try {
    const { obj, accountId } = job.data;
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
          include: [{ model: address, where: { deletedAt: null } }],
        },
        { model: provider, where: { deletedAt: null } },
      ],
    });

    const { peerId, accessHash, code } = cloneProvider.dataValues.provider;

    const providerNumber = cloneProvider.dataValues.number;

    if (code === '22800735' && providerNumber.length !== 11) {
      throw new Error('Incorrect format providerNumber. Mask: 71xxxxxxxxx');
    }

    const check1 = await checkProvider(
      api,
      peerId,
      accessHash,
      providerNumber,
      'Налаштування рахунків',
    );

    console.log(check1);

    if (check1.check === false) {
      await addProviderNumber(api, peerId, accessHash, providerNumber);
    }

    let message = obj.value;

    const check2 = await checkProvider(
      api,
      peerId,
      accessHash,
      providerNumber,
      'Показники лічильників',
    );

    if (check2.check === false) {
      throw new Error(`Check provider number: ${providerNumber}`);
    }

    switch (code) {
      case '03357168':
        message = message.split(':');
        if (!message[0] || !message[1]) {
          throw new Error('Water indicators value had not pass the validation');
        }
        if (check2.lastMessage.includes('Введіть показники')) {
          await sendMessage(api, 380580799, accessHash, message[0]);
          // peerId!
          await sendMessage(api, 380580799, accessHash, message[1]);
          // peerId!
        } else {
          await sendMessage(api, 380580799, accessHash, providerNumber);
          // peerId!
          await sendMessage(api, 380580799, accessHash, message[0]);
          // peerId!
          await sendMessage(api, 380580799, accessHash, message[1]);
          // peerId!
        }
        break;
      case '22800735':
        if (check2.lastMessage.includes('Введіть показники')) {
          await sendMessage(api, 380580799, accessHash, message);
          // peerId!
        } else {
          await sendMessage(api, 380580799, accessHash, providerNumber);
          // peerId!
          await sendMessage(api, 380580799, accessHash, message);
          // peerId!
        }
        break;
      default:
        throw new Error('Incorrect provider data');
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
