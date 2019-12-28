const db = require('../db/index.js');

module.exports = {
  getTicker(req, res, next) {
    db.Ticker.findOne({ ticker: req.params.ticker }, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
       }
       res.send(result);
    });
  },

  // TODO: need to add tests
  // TODO: a bit WET, there's a better way to refactor these functions ...
  getCurrentPrice(req, res, next) {
    db.Ticker.findOne({ ticker: req.params.ticker }, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else if (result === null) {
        res.send('There is no ticker with that value!');
      } else {
        const pricesLength = result.prices.length
        const lastClosePrice = result.prices[pricesLength - 1].close
        res.send({ currentPrice: lastClosePrice });
      }
    });
  },

  getPercentChange(req, res, next) {
    db.Ticker.findOne({ ticker: req.params.ticker }, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else if (result === null) {
        res.send('There is no ticker with that value!');
      } else {
        const pricesLength = result.prices.length
        const lastClosePrice = result.prices[pricesLength - 1].close
        const penultimateClosePrice = result.prices[pricesLength - 2].close
        const percentChange = (lastClosePrice - penultimateClosePrice) / penultimateClosePrice;
        res.send({ percentChange });
      }
    });
  }
}