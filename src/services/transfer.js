require('../userbotTelegram/authorization')();
const api = require('../userbotTelegram/api');
const { dbWrapper } = require('../server/db');

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

    await api.call('messages.sendMessage', {
      peer: {
        _: 'inputPeerUser',
        user_id: peerId,
        access_hash: accessHash || '',
      },
      message,
      random_id:
        Math.ceil(Math.random() * 0xffffff) +
        Math.ceil(Math.random() * 0xffffff),
    });

    return { accountId, success: true, message };
  } catch (err) {
    console.error(err);
    return { accountId, success: false, error: err.message || err };
  }
}

module.exports = { sendToTgNumber };
