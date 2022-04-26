const { user } = require('../server/db/sequelize');
const { createResponse } = require('../utils');
const { httpCodes } = require('../utils');

async function createUser(body) {
  try {
    const timestamp = Date.now();
    const result = await user.create({
      fullName: body.fullName || null,
      email: body.email,
      password: body.password,
      refreshToken: body.refreshToken || null,
      createdAt: timestamp,
      updateAt: timestamp,
      deletedAt: null,
    });

    if (!result) {
      // eslint-disable-next-line quotes
      throw new Error("Can't create order");
    }
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { createUser };
