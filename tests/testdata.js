// use the seeding script to generate the right type of ticker objects
const createTickers = require('../seeds/seed.js');

// There is a function that generates a list of tickers
const tickers = createTickers.start();

module.exports = {
  validTicker () {
    // we generate a valid random ticker
    var randomTickerIdx = Math.floor(Math.random()*tickers.length);
    return tickers[randomTickerIdx];
  },
}