const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const { createResponse } = require('../utils');
const { httpCodes } = require('../utils');
const db = require('../server/db');

async function createUser(body) {
  try {
    const timestamp = Date.now();
    const cloneUser = await db.dbWrapper().dbModels.user.findOne({
      where: {
        email: body.email,
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });
    if (cloneUser !== null) {
      throw new Error('this mail is already in use');
    }
    const result = await db.dbWrapper().dbModels.user.create({
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
      throw new Error("can't create user");
    }
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.badReq, { error: err.message || err });
  }
}

async function updateUser(body, id) {
  try {
    const timestamp = Date.now();

    // Hash the password
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(body.password, salt);

    const userFields = {
      fullName: body.fullName,
      email: body.email,
      password: hashPassword,
      updatedAt: timestamp,
    };
    Object.keys(userFields).forEach((key) => {
      if (typeof userFields[key] === 'undefined') {
        delete userFields[key];
      }
    });
    const result = await db.dbWrapper().dbModels.user.update(userFields, {
      where: { id },
      returning: true,
    });
    return createResponse(httpCodes.ok, result[1][0].dataValues);
  } catch (err) {
    return createResponse(httpCodes.badReq, { error: err.message || err });
  }
}

async function getUser(id) {
  try {
    const result = await db.dbWrapper().dbModels.user.findOne({
      where: { id, deletedAt: null },
      include: [{ all: true }],
    });
    if (result === null) {
      return createResponse(httpCodes.ok, {
        message: `There is no user with id: ${id}`,
      });
    }
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    return createResponse(httpCodes.badReq, { error: err.message || err });
  }
}

async function deleteUser(id) {
  try {
    const timestamp = Date.now();
    await db.dbWrapper().dbModels.user.update(
      {
        deletedAt: timestamp,
      },
      {
        where: { id },
      },
    );
    return createResponse(httpCodes.ok);
  } catch (err) {
    return createResponse(httpCodes.badReq, {
      error: err.message || err,
    });
  }
}

async function findUsersEmail(userEmail) {
  try {
    if (!userEmail) {
      throw new Error('ERROR: no email id defined');
    }

    const res = await db.dbWrapper().dbModels.user.findOne({
      where: {
        email: userEmail,
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });

    console.log(`INFO: user by id ${JSON.stringify(res)}`);

    return res;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

module.exports = {
  createUser,
  updateUser,
  getUser,
  deleteUser,
  findUsersEmail,
};
