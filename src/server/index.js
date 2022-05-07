const { portEnv, db: dbConfig } = require('../config');
const server = require('./routes');
const db = require('./db');

let listener;

async function start() {
  try {
    await db.init();
    db.setType(dbConfig.defaultType);
    console.log(`Now db type is ${db.getType()}`);
    listener = server.listen(portEnv, () => {
      console.log(`Server successfully started on port ${portEnv}`);
    });
  } catch (err) {
    console.error(err);
  }
}

function stop(callback) {
  if (!server) {
    callback();
    return;
  }
  listener.close((err) => {
    if (err) {
      console.error(err, 'Failed to close server!');
      callback();
      return;
    }
    console.log('Server has been stopped.');
    callback();
  });
}

module.exports = {
  start,
  stop,
};
