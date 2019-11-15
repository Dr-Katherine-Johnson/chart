







// TODO: add test suite


function createTickers() {
  // should return an array of 100 strings (tickers)
    // each ticker is 4 characters in length // TODO: vary the ticker length
    // each ticker is made up of the letters A - Z
      // unicode code's between 0041 and 005A (in hexadecimal notation)
    // the seed argument is the number of sequential unicode codes to skip for the next digit in the ticker (try seed values between 1 - 5)
    // the next ticker in the array uses a seed 1 greater than the previous seed ??

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
        if (decimal < 65 || decimal > 90) {
          incrementor++;
          seed = 1;
          decimal = startValue;
        }

        if (j === 2 && incrementor === 1) {
          ticker.reverse();
        }

        letter = String.fromCodePoint(decimal + j);


        // every time the incrementor changes, build the ticker in a different order
        // console.log('incrementor: ', incrementor);
        // console.log('decimal: ', decimal);

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

      // if (i !== 0 && i % 51 === 0) {
      //   seed++;
      // }
    }
    return result;
}

let tickers = createTickers();
console.log('tickers: ', tickers)

let mySet = new Set(tickers);
console.log(mySet);

function makeTicker() {
  // needs to have several different permutations of filling up a 4 character string, depending on it's input
}
