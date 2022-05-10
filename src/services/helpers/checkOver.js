async function checkOver(api, messageId, providerNumber) {
  try {
    let check = false;
    // eslint-disable-next-line prefer-arrow-callback
    const promise = new Promise(function (resolve) {
      setTimeout(async () => {
        try {
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
            tgRes2.messages[0].message === undefined ||
            tgRes1.messages[0].reply_markup.rows[0].buttons[
              tgRes2.messages[0].reply_markup.flags
            ].text !== 'Налаштування рахунків'
          ) {
            throw new Error('Bad tg response, please try again.');
          }

          console.log(
            tgRes2.messages[0].message,
            `\n.includes(${providerNumber},)`,
          );
          check =
            tgRes2.messages[0].message.includes(`\n${providerNumber},`) ||
            tgRes2.messages[0].message.includes(`\n${providerNumber}(`);

          resolve(check);
        } catch (err) {
          throw new Error(err);
        }
      }, 1500);
    });
    return promise;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  checkOver,
};
