const db = require('../db/index.js');

// generate data from req and body of req, see docs for right shape
var Ticker = function(req) {
  console.log('Req Body', req.body);
  let tickerData = {};
  tickerData.ticker = req.params.ticker;
  tickerData.name = req.body.name ? req.body.name : null;
  tickerData.prices = req.body.prices ? req.body.prices : [];
  return tickerData;
}

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
    // TODO add tests
    return db.Ticker.exists({ ticker: newTicker.ticker })
      .then(duplicate => {
        if(duplicate) {
          res.status(409).send('Ticker already exists');
        } else {
          return db.Ticker.create(tickerData)
            .then(result => {
              res.status(201).send(result);
            })
        }
      })
      .catch(err => {
        res.status(400).send(err);
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
  addCurrentPrice(req, res, next) {
    // since GET returns the last available price for the stock
    // the POST would add new price for the stock
    // we'll have to first get the document
    // TODO how to handle error with await?
    var tickerDoc = await Ticker.findOne({ ticker: req.params.ticker }).exec();
    // then add the new price to the prices array
	  return tickerDoc.prices.push({key: "lucky", value: 7});
      .then(result => {
        // what is the result of pushing to an array?
      })
      .catch(err => res.status(400).send(err))
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