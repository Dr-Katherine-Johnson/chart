module.exports = {
  createTickers() {
    // returns the same array of 100 unique strings (tickers)
      // each ticker is 3 - 4 characters in length // TODO: vary the ticker length
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
  }
}