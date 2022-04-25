const { portEnv } = require('../config');
const server = require('./routes');
const db = require('./db');

let listener;

// function start() {
//   listener = server.listen(portEnv, () => {
//     console.log(`Server successfully started on port ${portEnv}`);
//   });
// }

async function start() {
  try {
    await db.init();
    db.setType('sequelize');
    console.log(`Now db is ${db.getType()}`);

    listener = server.listen(portEnv, () => {
      console.log(`Server successfully started on port ${portEnv}`);
    });

  } catch (e) {
    console.log(e);
  }
};

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
