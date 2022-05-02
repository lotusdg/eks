const Sequelize = require('sequelize');

async function createRefreshToken(userIdParam, tokenParam, tokenModel) {
  const timeStamp = Date.now();

  try {
    const [tokenItem, created] = await tokenModel.findOrCreate({
      where: { userId: userIdParam, deletedAt: { [Sequelize.Op.is]: null } },
      defaults: {
        createdAt: timeStamp,
        updatedAt: timeStamp,
        deletedAt: null,
        token: tokenParam,
        userId: userIdParam,
      },
    });
    if (created) {
      console.log(`INFO: entity token with id ${tokenItem.id} was created`);
      return tokenItem;
    }

    tokenItem.set('token', tokenParam);
    await tokenItem.save();
    return tokenItem;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

module.exports = {
  createRefreshToken,
};
