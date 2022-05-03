require('dotenv').config();
const path = require('path');
const MTProto = require('@mtproto/core');
const { sleep } = require('@mtproto/core/src/utils/common');

const api_id = Number(process.env.API_ID);
const api_hash = process.env.API_HASH;

class API {
  constructor() {
    this.mtproto = new MTProto({
      api_id,
      api_hash,
      storageOptions: {
        path: path.resolve(__dirname, './data/1.json'),
      },
    });
    this.mtproto.updates.on('updatesTooLong', (updateInfo) => {
      console.log('updatesTooLong:', updateInfo);
    });

    this.mtproto.updates.on('updateShortMessage', (updateInfo) => {
      console.log('updateShortMessage:', updateInfo);
    });

    this.mtproto.updates.on('updateShortChatMessage', (updateInfo) => {
      console.log('updateShortChatMessage:', updateInfo);
    });

    this.mtproto.updates.on('updateShort', (updateInfo) => {
      console.log('updateShort:', updateInfo);
    });

    this.mtproto.updates.on('updatesCombined', (updateInfo) => {
      console.log('updatesCombined:', updateInfo);
    });

    this.mtproto.updates.on('updates', (updateInfo) => {
      console.log('updates:', updateInfo);
    });

    this.mtproto.updates.on('updateShortSentMessage', (updateInfo) => {
      console.log('updateShortSentMessage:', updateInfo);
    });
  }

  async call(method, params, options = {}) {
    try {
      const result = await this.mtproto.call(method, params, options);

      return result;
    } catch (error) {
      console.error(`${method} error:`, error);

      const { error_code, error_message } = error;

      if (error_code === 420) {
        const seconds = Number(error_message.split('FLOOD_WAIT_')[1]);
        const ms = seconds * 1000;

        await sleep(ms);

        return this.call(method, params, options);
      }

      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split('_MIGRATE_');

        const dcId = Number(dcIdAsString);

        if (type === 'PHONE') {
          await this.mtproto.setDefaultDc(dcId);
        } else {
          Object.assign(options, { dcId });
        }

        return this.call(method, params, options);
      }

      return Promise.reject(error);
    }
  }

  async getUser() {
    try {
      const user = await this.call('users.getFullUser', {
        id: {
          _: 'inputUserSelf',
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  sendCode(phone) {
    try {
      return this.call('auth.sendCode', {
        phone_number: phone,
        settings: {
          _: 'codeSettings',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  signIn({ code, phone, phone_code_hash }) {
    return this.call('auth.signIn', {
      phone_code: code,
      phone_number: phone,
      phone_code_hash: phone_code_hash,
    });
  }

  signUp({ phone, phone_code_hash }) {
    return this.call('auth.signUp', {
      phone_number: phone,
      phone_code_hash: phone_code_hash,
      first_name: 'MTProto',
      last_name: 'Core',
    });
  }

  getPassword() {
    return this.call('account.getPassword');
  }

  checkPassword({ srp_id, A, M1 }) {
    return this.call('auth.checkPassword', {
      password: {
        _: 'inputCheckPasswordSRP',
        srp_id,
        A,
        M1,
      },
    });
  }
}

const api = new API();

module.exports = api;
