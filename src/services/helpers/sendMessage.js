async function sendMessage(api, peerId, accessHash, message) {
  try {
    const result = await api.call('messages.sendMessage', {
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
    return result;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

module.exports = {
  sendMessage,
};
