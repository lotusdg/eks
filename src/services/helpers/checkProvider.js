const { sendMessage } = require('./sendMessage');

async function checkProvider(api, peerId, accessHash, providerNumber, message) {
  try {
    await sendMessage(api, peerId, accessHash, '/start');

    const tgReq = await sendMessage(api, peerId, accessHash, message);

    const messageId = tgReq.updates[0].id;

    let resCheck = false;

    const promise = new Promise((resolve) => {
      try {
        setTimeout(async () => {
          try {
            let check = false;
            const tgRes1 = await api.call('messages.getMessages', {
              id: [
                {
                  _: 'inputMessageID',
                  id: messageId + 1,
                },
              ],
            });

            const tgRes2 = await api.call('messages.getMessages', {
              id: [
                {
                  _: 'inputMessageID',
                  id: messageId + 2,
                },
              ],
            });

            if (
              tgRes1.messages[0].message === undefined ||
              tgRes2.messages[0].message === undefined
            ) {
              throw new Error('Bad tg response, please try again.');
            }

            check =
              tgRes2.messages[0].message.includes(`\n${providerNumber},`) ||
              tgRes2.messages[0].message.includes(`\n${providerNumber}(`);

            resolve({ check, lastMessage: tgRes2.messages[0].message });
          } catch (err) {
            throw new Error(err);
          }
        }, 1500);
      } catch (err) {
        throw new Error(err);
      }
    });

    await promise.then((check) => {
      resCheck = check;
    });

    return resCheck;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

module.exports = {
  checkProvider,
};
