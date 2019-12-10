const db = require('../db/index.js');
const request = require('request');
const seed = require('../seeds/seed.js');
const PORT = process.env.PORT || 4444;

// ENDPOINT TESTS
xdescribe('GET /price/:ticker', () => {
  const tickerList = seed.start();
  // get a random ticker from the list
  const tickerObj = tickerList[Math.floor(Math.random() * tickerList.length)]
  const url = `http://localhost:${PORT}/price/${tickerObj.ticker}`;

  // check that the response is equal to the original ticker
  it(`Should return a JSON object of that ticker's price data`, (done) => {
    // call the endpoint with that ticker
    request({ url, json: true }, (err, response, body) => {
      if (err) { return console.log(err); }

      // TODO: expects database to be seeded already??
      expect(body.ticker).toEqual(tickerObj.ticker);
      expect(body.name).toEqual(expect.any(String));
      expect(body.prices[Math.floor(Math.random() * 1750)].volume).toEqual(expect.any(Number));
      expect(body.prices).toEqual(expect.any(Array));
      done();
    });
  });

  afterAll(() => {
    db.db.close();
  });
});