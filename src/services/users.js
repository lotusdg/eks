const { user } = require('../server/db/sequelize');
const { createResponse } = require('../utils');
const { httpCodes } = require('../utils');

async function createUser(body) {
  try {
    const timestamp = Date.now();
    const cloneUser = await user.findOne({ where: { email: body.email } });
    if (cloneUser !== null) {
      return createResponse(httpCodes.ok, {
        success: false,
        message: 'Email already exists',
      });
    }
    const result = await user.create({
      fullName: body.fullName || null,
      email: body.email,
      password: body.password,
      refreshToken: body.refreshToken || null,
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
      phone: body.phone || null,
    });
    if (!result) {
      // eslint-disable-next-line quotes
      throw new Error('unable to create a user');
    }
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

async function updateUser(body, id) {
  try {
    const timestamp = Date.now();
    const userFields = {
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      password: body.password,
      updatedAt: timestamp,
    };
    Object.keys(userFields).forEach((key) => {
      if (typeof userFields[key] === 'undefined') {
        delete userFields[key];
      }
    });
    const result = await user.update(userFields, {
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      returning: true,
    });
    return createResponse(httpCodes.ok, result[1][0].dataValues);
  } catch (err) {
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

async function getUser(id) {
  try {
    const result = await user.findOne({
      where: { id, deletedAt: null },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
    });
    if (result === null) {
      return createResponse(httpCodes.badReq, {
        message: `bad user id: ${id}`,
      });
    }
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

async function deleteUser(id) {
  try {
    const timestamp = Date.now();
    await user.update(
      {
        deletedAt: timestamp,
      },
      {
        where: { id },
      },
    );
    return createResponse(httpCodes.ok, { success: true });
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

module.exports = { createUser, updateUser, getUser, deleteUser };
