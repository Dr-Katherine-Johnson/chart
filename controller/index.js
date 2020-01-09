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

  // TODO: address situation where last two prices were the same, and divide by 0 condition
  // TODO: add tests
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
        let percentChange = (lastClosePrice - penultimateClosePrice) / penultimateClosePrice;

        if (isNaN(percentChange)) {
          percentChange = 0;
        }

        percentChange = percentChange.toFixed(4);
        res.send({ percentChange });
      }
    });
  }
}

  // // TODO: start of tests for percentChange ...
  // xit('Displays percentChange as a string containing a positive or negative number', () => {
  //   const percents = [
  //     0,
  //     0.0001,
  //     0.0010,
  //     0.0100,
  //     0.1000,

  //     0.0361,
  //     -0.1602,
  //     -0.0752,
  //     0.0253,
  //     0,
  //     -0.0362,
  //     0.0054,
  //     -0.0405
  //   ];
  //   percents.forEach(percent => {
  //     const wrapper = shallow(<Card percentChange={percent}></Card>);
  //     const string = wrapper.find('.pab-percent-change').textContent;
  //     expect(string).stringMatching(/[+|-]\d*[.\d|.\d\d]?%$/);
  //     // dot is optional
  //     // but if there is a dot, need to have 1 or 2 digits after it
  //   });
  // });