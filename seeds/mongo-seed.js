const prices = require('./prices.js');
const tickers = require('./tickers.js');
const db = require('../db/index.js');
const mongoose = require('mongoose');

module.exports = {
  start() {
    let tickerList = tickers.create100Tickers().map(ticker => {
      return {
        ticker,
        name: prices.generateName(),
        prices: prices.generatePricesList()
      };
    });
    return tickerList;
  },

  // Takes a boolean that determines if:
    // all 1750 price objects for all 100 tickers are created first, THEN saved to the database
    // OR each 1750 price objects for 1 ticker are created then saved to the database, then the process repeats for the next ticker, etc ...
  seedDatabase(useHeavy) {
    if (useHeavy) {
      this.heavyLoad(mongoose.disconnect);
    } else {
      this.lightLoad(mongoose.disconnect);
    }
  },

  // Only run this on machines that have sufficient memory.
  // Causes hardware to max out on AWS Linux 2 t2.micro (ie, the free tier EC2 instances)
  heavyLoad(cb = () => {}) {
    db.Ticker.create(this.start(), (result) => {
      console.log('Prices seeded to database');
      cb();
    });
  },

  // TODO: refactor with async / await? (consider memory implications)
  lightLoad(cb) {
    const tickerList = tickers.create100Tickers();
    const recursiveFn = (tickerList, counter = 0) => {
      if (tickerList.length === 0) {
        console.log(`Prices seeded to database`);
        cb();
        return;
      }
        const ticker = tickerList.pop();
        ++counter;
        const obj = {
          ticker,
          name: prices.generateName(),
          prices: prices.generatePricesList()
        };
        db.Ticker.create(obj, (result) => {
            console.log(`${counter}: ${ticker} seeded to database`);
            recursiveFn(tickerList, counter);
        });
    }
    recursiveFn(tickerList);
  }
};