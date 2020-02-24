const db = require('../db/influx-client.js');
const request = require('request');
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

// ENDPOINT TESTS
describe('GET /price/:ticker', () => {
  const tickerList = seedFactory();
  // get a random ticker from the list
  const tickerObj = tickerList[Math.floor(Math.random() * tickerList.length)]
  const url = `http://localhost:${PORT}/price/${tickerObj.ticker}`;

  // check that the response is equal to the original ticker
  it(`Should return a JSON object of that ticker's price data`, (done) => {
    // call the endpoint with that ticker
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