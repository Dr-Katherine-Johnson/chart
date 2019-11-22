const mongoose = require('mongoose');
const seed = require('../seeds/seed.js');

// TODO: It's not creating a database in the local mongoDB installation. Why?
mongoose.connect(`mongodb://127.0.0.1:3000/robinhood`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log('db connected!');

  const tickerSchema = new Mongoose.schema({
    ticker: STRING,
    name: STRING,
    prices: [
      {
        dateTime: DATE,
        open: NUMBER,
        high: NUMBER,
        low: NUMBER,
        close: NUMBER,
        volume: NUMBER
      }
    ]
  });

  let Ticker = mongoose.model('Ticker', tickerSchema);



  // TODO: how to set this up to only run 1 time??
  Ticker.create(seed.start(), (result) => {
    console.log('Prices seeded to database!');
    console.log(result);
  });
  // create a document in Mongoose for each ticker
});

module.exports = {
  db,
  // create(collection, cb) {
  //   db.create(collection, (err, result) => {
  //     if (err) { return console.log(err); }
  //     cb(result);
  //   });
  // }
};;