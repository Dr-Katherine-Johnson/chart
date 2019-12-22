const mongoose = require('mongoose');
const seed = require('../seeds/seed.js');
const config = require('../env.config.js');

// TODO: need to change to creating the database programmatically?? or stay with doing it manually when the ec2 instance is created??

console.log('config.DATABASE_URL: ', config.DATABASE_URL);

mongoose.connect(`${config.DATABASE_URL}:/${config.DATABASE_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log('db connected'));


// TODO: clarify - I thought the Model definitions needed to be inside the callback to db.once('open', ...) ?? What effect does this have when establishing the db connecion takes significant time ??
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

module.exports = { db, Ticker, dropAll }