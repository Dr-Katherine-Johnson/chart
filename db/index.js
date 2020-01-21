require('dotenv').config();
const mongoose = require('mongoose');
const seed = require('../seeds/seed.js');
const config = require('../env.config.js');

console.log('config.DATABASE_URL: ', config.DATABASE_URL);

mongoose.connect(`${config.DATABASE_URL}:/${config.DATABASE_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log('db connected'));

const tickerSchema = new mongoose.Schema({
  ticker: String,
  name: String,
  prices: [
    {
      dateTime: Date,
      open: Number,
      high: Number,
      low: Number,
      close: Number,
      volume: Number
    }
  ]
});

tickerSchema.statics.addOne = (tickerData, cb) => {
  return Ticker.exists({ ticker: tickerData.ticker })
    .then(exists => {
      if (exists) {
        cb('duplicate')
      } else {
        return Ticker.create(tickerData);
      }
    })
    .then(newTicker => cb(null, newTicker))
    .catch(err => cb(err));
}

const Ticker = mongoose.model('Ticker', tickerSchema);

const dropAll = () => {
  return Ticker.deleteMany({});
}

module.exports = { db, Ticker, dropAll };