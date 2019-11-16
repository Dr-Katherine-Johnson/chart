const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:3000`);

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log('db connected!');
});

module.exports = db;