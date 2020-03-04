const db = require('../db/influx-client.js');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const tickers = require('../seeds/tickers');
const prices = require('../seeds/prices');
const PORT = process.env.PORT || 4444;

// we create a small batch of the data we seeded
const seedFactory = () => {
  let tickerList = tickers.createNTickers(2700).map(ticker => {
    return {
      ticker,
      name: prices.generateName(),
      prices: prices.generatePricesList()
    };
  });
  return tickerList;
};

describe('Endpoint tests', () => {
  const tickerList = seedFactory();
  // get a random ticker from the list
  const tickerObj = tickerList[Math.floor(Math.random() * tickerList.length)]
  describe('GET /price/:ticker', () => {
    const url = `http://localhost:${PORT}/price/${tickerObj.ticker}`;
    // check that the response is equal to the original ticker
    it(`Should return a JSON object of that ticker's price data`, (done) => {
      // call the endpoint with that ticker
      // TODO Refactor to chai syntax
      request({ url, json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        expect(body.ticker).toEqual(tickerObj.ticker);
        expect(body.name).toEqual(expect.any(String));
        expect(body.prices[Math.floor(Math.random() * 390)].volume).toEqual(expect.any(Number));
        expect(body.prices).toEqual(expect.any(Array));
        done();
      });
    });
    //
    it(`Should return a 500 error for a ticker that is not in the database`, (done) => {
      // call the endpoint with that ticker
      const badTickerURL = `http://localhost:${PORT}/price/NOTINDBS`;
      request({ url: badTickerURL, json: true }, (err, response, body) => {
        if (err) {
          return console.log(err)
        }
        expect(response.statusCode).toEqual(500);
        done();
      });
    });
  });
  describe('GET /current-price/:ticker', () => {
    // get a random ticker from the list
    const currentPriceURL = `http://localhost:${PORT}/current-price/${tickerObj.ticker}`;
    // check that the response is equal to the original ticker
    it(`Should return a JSON object of that ticker's last closing price`, (done) => {
      // call the endpoint with that ticker
      request({ url: currentPriceURL, json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        expect(body.currentPrice).toEqual(expect.any(Number));
        done();
      });
    });
    //
    it(`Should return a 500 error for a ticker that is not in the database`, (done) => {
      // call the endpoint with that ticker
      const badTickerURL = `http://localhost:${PORT}/current-price/NOTINDBS`;
      request({ url: badTickerURL, json: true }, (err, response, body) => {
        if (err) {
          return console.log(err)
        }
        expect(response.statusCode).toEqual(500);
        done();
      });
    });
  });
  describe('GET /percent-change/:ticker', () => {
    // get a random ticker from the list
    const changeURL = `http://localhost:${PORT}/percent-change/${tickerObj.ticker}`;
    // check that the response is equal to the original ticker
    it(`Should return a JSON object of that ticker's percent change between the last available price and the previous price`, (done) => {
      // call the endpoint with that ticker
      request({ url: changeURL, json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        expect(body.percentChange).toEqual(expect.any(String));
        done();
      });
    });
    //
    it(`Should return a 500 error for a ticker that is not in the database`, (done) => {
      // call the endpoint with that ticker
      const badTickerURL = `http://localhost:${PORT}/percent-change/NOTINDBS`;
      request({ url: badTickerURL, json: true }, (err, response, body) => {
        if (err) {
          return console.log(err)
        }
        expect(response.statusCode).toEqual(500);
        done();
      });
    });
  });
  describe('POST /price/:ticker', () => {
    // get a random ticker from the list
    const priceURL = `http://localhost:${PORT}/price/`;
    const lastPriceIdx = tickerObj.prices.length - 1;
    const lastPriceObject = tickerObj.prices[lastPriceIdx];
    const lastTime = new Date(lastPriceObject.dateTime);
    const newTime = new Date(lastTime.getTime() + 1);
    const newPrice = prices.generatePrice(lastPriceObject);
    const newPriceObject = {
      'dateTime': newTime,
      'open': newPrice.open,
      'high': newPrice.high,
      'low': newPrice.low,
      'volume': newPrice.volume
    };
    it(`Should save a JSON object of that ticker's new price`, (done) => {
      // call the endpoint with that ticker
      chai.request(priceURL)
        .post(tickerObj.ticker)
        .type('form')
        .send(newPriceObject)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done()
         }
        )
    });

    it(`Should return a 500 error for a ticker that is not in the database`, (done) => {
      // call the endpoint with that ticker
      const badTicker = `NOTINDBS`;
      chai.request(priceURL)
        .post(badTicker)
        .type('form')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done()
        })
    });
  });
});