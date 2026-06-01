const mongoose = require('mongoose');

async function connectMongo(uri) {
  if (!uri || typeof uri !== 'string') {
    throw new Error('Debe definir una URI de MongoDB válida');
  }

  await mongoose.connect(uri);
}

async function disconnectMongo() {
  await mongoose.disconnect();
}

module.exports = {
  connectMongo,
  disconnectMongo,
};
