const { sendMessage } = require('./sendMessage');

async function addProviderNumber(api, peerId, accessHash, providerNumber) {
  try {
    await sendMessage(api, peerId, accessHash, '/start');
    await sendMessage(api, peerId, accessHash, 'Додати рахунок');
    await sendMessage(api, peerId, accessHash, providerNumber);
    await sendMessage(api, peerId, accessHash, 'Так');
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { addProviderNumber };
