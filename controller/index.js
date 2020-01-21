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
  // Post ticker
  addTicker(req, res, next) {
    // get data from body, see docs for right shape
    console.log(req.body);
    const tickerData = {
      ticker: req.params.ticker,
      name: req.body.name,
      prices: req.body.prices
    }
    // we use a custom function that checks if already in database then adds
    db.Ticker.addOne(tickerData, (err, result) => {
      if (err) {
        console.error(err)
        if (err === 'duplicate') {
          res.status(409).send('Ticker already exists')
        } else {
          res.status(400).send(err);
        }
      } else {
        res.status(201).send(result);
      }
    })
  },
  // TODO: add tests
  // TODO: a bit WET, refactor
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
  },
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