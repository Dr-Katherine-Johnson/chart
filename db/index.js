const mongoose = require('mongoose');
const seed = require('../seeds/seed.js');

mongoose.connect(`mongodb://127.0.0.1:27017/robinhood`, { useNewUrlParser: true, useUnifiedTopology: true });

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

module.exports = { db, Ticker }