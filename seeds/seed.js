const prices = require('./prices.js');
const tickers = require('./tickers.js');

// needs to create the array of all the tickers, and add the additional price data
module.exports = {
  start() {
    let tickerList = tickers.createTickers().map(ticker => {
      return {
        ticker,
        name: prices.generateName(),
        prices: prices.generatePricesList()
      };
    });
    return tickerList;
  }
};