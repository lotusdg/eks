const { sendMessage } = require('./sendMessage');

async function addProviderNumber(api, peerId, accessHash, providerNumber) {
  try {
    await sendMessage(api, peerId, accessHash, '/start');
    await sendMessage(api, peerId, accessHash, 'Додати рахунок');
    await sendMessage(api, peerId, accessHash, providerNumber);
    await sendMessage(api, peerId, accessHash, 'Так');

    // eslint-disable-next-line no-unused-vars
    let resCheck = false;

    const timeout = new Promise((resolve) => {
      try {
        setTimeout(async () => {
          try {
            const check = true;

            resolve(check);
          } catch (err) {
            throw new Error(err);
          }
        }, 1500);
      } catch (err) {
        throw new Error(err);
      }
    });

    await timeout.then((check) => {
      resCheck = check;
    });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { addProviderNumber };
