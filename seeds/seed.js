const prices = require('./prices.js');
const tickers = require('./tickers.js');
const db = require('../db/index.js');

module.exports = {
  // Adds the name and price data to each ticker, and returns an array
  start() {
    let tickerList = tickers.createTickers().map(ticker => {
      return {
        ticker,
        name: prices.generateName(),
        prices: prices.generatePricesList()
      };
    });
    return tickerList;
  },

  seedDatabase(cb) {
    // Creates a document in MongoDB for each ticker
    db.Ticker.create(this.start(), (result) => {
      console.log('Prices seeded to database!');
      cb();
    });
  }
};