const prices = require('./prices.js');
const tickers = require('./tickers.js');

const request = require('request');
const db = require('../db/index.js');

// needs to create the array of all the tickers, and add the additional price data
module.exports = {
  start() {
    let tickerList = tickers.createTickers().map(ticker => {
      return {
        ticker,
        name: prices.generateName(),
        prices: prices.generatePricesList()
      };
        // {
        //   ticker: STRING,
        //   name: STRING,
        //   prices: [
        //     {
        //       dateTime: DATE,
        //       open: NUMBER,
        //       high: NUMBER,
        //       low: NUMBER,
        //       close: NUMBER,
        //       volume: NUMBER
        //     },
        //     // ...
        //   ]
        // }
    });
    return tickerList;
  }
};