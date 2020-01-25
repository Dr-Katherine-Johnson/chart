const utils = require('./tickerUtils.js');

module.exports = {
  create100Tickers() {
    // returns the same array of 100 unique strings (tickers)
      // each ticker is 3 - 4 characters in length
      // TODO: vary the ticker length
      // each ticker is made up of the letters A - Z

      let seed = 1;
      let result = [];
      let ticker = [];

      // start at decimal 65
      let startValue = 65;
      let decimal = 65;
      let incrementor = 0;
      let letter = 0;

      for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 4; j++) {
          if (decimal + j < 65 || decimal + j > 90) {
            incrementor++;
            seed = 1;
            decimal = startValue;
          }

          if (j === 2 && incrementor === 1) {
            ticker.reverse();
          }

          letter = String.fromCodePoint(decimal + j);


          // every time the incrementor changes, build the ticker in a different order
          if (incrementor === 0) {
            ticker.push(letter);
          } else if (incrementor === 1) {
            ticker.unshift(letter);
          } else if (incrementor === 2) {
            ticker.splice(Math.floor(ticker.length / 2), 0, letter);
          } else {
            if (incrementor === 3) {
              ticker.splice(0, 0, letter);
            } else if (j === 1) {
              ticker.splice(1, 0, letter);
            } else if (j === 2) {
              ticker.splice(1, 0, letter);
            } else if (j === 3) {
              ticker.splice(2, 0, letter);
            }
          }
        }
        decimal += seed;

        result.push(ticker.join(''));
        ticker = [];
      }
      return result;
  },
  // can create up to 6,471,002 unique tickers
  createNTickers(n) {
    // using alphanumeric lower/uppercase for each character there are 26(lower)+26(upper)+10(numbers) = 62 possibilities
    // that means if we want at least 2*10^6 combinations we'd need to do the following operation
    // (N choose k) > 2 million =>
    // (26 choose 3) = 2,600
    // (26 choose 4) = 14,950
    // (52 choose 4) = 270,725
    // (62 choose 4) = 557,845
    // (52 choose 5) = 2,598,960
    // (62 choose 5) = 6,471,002
    // Depending on how many you needed to generate you could set your alphaNumString length and k -> save options in an object?
    // we can hard-code 52 choose 5
    var stringLength = 52;
    var k = 5;
    // we can represent letters+numbers in a string 'A...Za...z0...9'
    var alphaNumString = tickerUtils.getAlphaNumeric().slice(0,stringLength).join('');
    // get all unique combinations from alphanum string
    const tickers = tickerUtils.chooseKCombos(alphaNumString, k);
    return tickers;
  }
};


