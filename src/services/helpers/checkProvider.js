const { sendMessage } = require('./sendMessage');
const { checkOver } = require('./checkOver');

async function checkProvider(api, peerId, accessHash, providerNumber) {
  try {
    await sendMessage(api, peerId, accessHash, '/start');

    const tgReq = await sendMessage(
      api,
      peerId,
      accessHash,
      'Налаштування рахунків',
    );

    const messageId = tgReq.updates[0].id;
    console.log('messageId: ', messageId);

    let resCheck = false;

    await checkOver(api, messageId, providerNumber).then((check) => {
      resCheck = check;
    });

    return { resCheck };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

module.exports = {
  checkProvider,
};
