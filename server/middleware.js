// import the function that you use to generate an array of only tickers
// You can find it as tickers.createNTickers(n) in the seed folder
const tickers = require('../seeds/tickers.js')
let tickerArray = [];
// create a function that given an ID -> index
// gives you back a ticker from the tickers array with that index
module.exports = {
  convertIDtoTicker (req, res, next) {
    // first check if the ticker came as a string or number
    const isNumber = !isNaN(Number(req.params.ticker));
    // if the ticker came as a number we want to convert it
    if (isNumber) {
      // get the ticker form our array
      let ticker = tickerArray[Number(req.params.ticker)];
      // re-write the params
      req.params.ticker = ticker;
    }
    next();
  },
  generateTickers() {
    console.log('generating tickers for testing');
    // use our seeding function ticker generator
    tickerArray = tickers.createNTickers(1350000); // use your custom function
  }
}