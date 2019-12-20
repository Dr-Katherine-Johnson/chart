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

  // Takes a boolean that determines if:
    // all 1750 price objects for all 100 tickers are created first, THEN saved to the database
    // OR each 1750 price objects for 1 ticker are created then saved to the database, then the process repeats for the next ticker, etc ...
  seedDatabase(useHeavy) {
    if (useHeavy) {
      this.heavyLoad();
    } else {
      this.lightLoad();
    }
  },

  // Only run this on machines that have sufficient memory.
  // Causes hardware to max out on AWS Linux 2 t2.micro (ie, the free tier EC2 instances)
  heavyLoad(cb = () => {}) {
    // Creates a document in MongoDB for each ticker
    db.Ticker.create(this.start(), (result) => {
      console.log('Prices seeded to database');
      cb();
    });
  },

  // TODO: is this possible to refactor with async / await? does it have the same memory implications?
  lightLoad() {
    const tickerList = tickers.createTickers();

    const recursiveFn = (tickerList) => {
      // base case, ticker list is empty
      if (tickerList.length === 0) {
        console.log(`Prices seeded to database`);
        return;
      }
      // recursive case
        // pop off the last ticker string, and save it
        const ticker = tickerList.pop();
        // make an object with all the key:value pairs
        const obj = {
          ticker,
          name: prices.generateName(),
          prices: prices.generatePricesList()
        };
        // call create on that object
        db.Ticker.create(obj, (result) => {
          // inside create's callback
            console.log(`${ticker} seeded to database`);
            // invoke recursiveFn with the now 1 shorter tickerList
            recursiveFn(tickerList);
        });
    }
    recursiveFn(tickerList);
  }
};