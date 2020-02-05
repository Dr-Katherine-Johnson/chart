const db = require('../db/index.js');
const exampleTicker = require('../sampledata/price.js');

// generate data from req and body of req, see docs for right shape
var Ticker = function(req) {
  let tickerData = {};
  tickerData.ticker = req.params.ticker;
  tickerData.name = req.body.name ? req.body.name : null;
  // QUESTION: for the prices do we need to convert the dates to a Date type to insert into collection?
  tickerData.prices = req.body.prices ? req.body.prices : [];
  return tickerData;
}

// QUESTION: why is there a next on these functions, but it's never called?
module.exports = {
  getTicker(req, res, next) {
    db.Ticker.findOne({ ticker: req.params.ticker }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
       }
      console.log(result);
      res.status(200).send(result);
    });
  },
  addTicker(req, res, next) {
    const newTicker = new Ticker(req);
    // Check if not already in database then add ticker
    // QUESTION: is there a better way to check for trying to add a duplicate?
    console.log('checking for duplicate', newTicker.ticker);
    return db.Ticker.exists({ ticker: newTicker.ticker }, (err, duplicate) => {
      if (err) {
        res.status(500).end();
      } else if (duplicate) {
        res.status(409).send('Ticker already exists');
      } else {
        return db.Ticker.create(newTicker, (err, result) => {
          res.status(201).send(result);
        })
      }
    });
    next();
  },
  // TODO: add tests
  // TODO: a bit WET, refactor
  // QUESTION: why are the functions just being called and not returned?
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
  // TODO: update PUT to /ticker endpoint req syntax
  updateTicker(req, res, next) {
    return db.Ticker.findOne({ ticker: req.params.ticker }, function (err, ticker) {
      console.log(ticker);
      if (err) {
        return res.status(500).end();
      } else if (!ticker) {
        return res.status(404).send('There is no ticker with that value');
      } else {
        // QUESTION: would it also be possible to assign it a time when it's saved to the database?
        const pricesLength = ticker.prices.length;
        const previousTime = (pricesLength > 0) ? new Date(ticker.prices[pricesLength - 1].dateTime) : null;
        const newTime = new Date(req.body.dateTime);
        if (previousTime !== null && previousTime > newTime) {
          return res.status(403).send('Invalid current price');
        } else {
            console.log('updating ticker with new price',ticker._id);
            return db.Ticker.updateOne({ ticker: req.params.ticker }, { $push: { prices: req.body }}, function (err, price) {
              if (err) {
                return res.status(500).end();
              }
              else {
                return res.status(201).json(price);
              }
            });
        }
      }
    });
  },
  // you would want to be able to delete the whole ticker
  // QUESTION: would you also want to be able to delete a specific price?
  deleteTicker(req, res, next) {
    return db.Ticker.deleteOne({ ticker: req.params.ticker }, function (err, ticker) {
      if (err) {
        return res.status(500).end();
      } else {
        return res.status(201).json(ticker);
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