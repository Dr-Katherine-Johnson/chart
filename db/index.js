require('dotenv').config();
const mongoose = require('mongoose');
const seed = require('../seeds/mongo-seed.js');
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

const Ticker = mongoose.model('Ticker', tickerSchema);

const dropAll = () => {
  return Ticker.deleteMany({});
}

module.exports = { db, Ticker, dropAll };