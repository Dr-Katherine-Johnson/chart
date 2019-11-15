







// TODO: add test suite


function createTickers(seed) {
  // should return an array of 100 strings (tickers)
    // each ticker is 4 characters in length // TODO: vary the ticker length
    // each ticker is made up of the letters A - Z
      // unicode code's between 0041 and 005A (in hexadecimal notation)
    // the seed argument is the number of sequential unicode codes to skip for the next digit in the ticker
    // the next ticker in the array uses a seed 1 greater than the previous seed ??

    let result = [];
    let code;
    // start at decimal 65
    let decimal = 65;


    for (let i = 0; i < 100; i++) {
      String(`\u${}`)
    }
}

// TODO: make this function handle other unicode code's besides A - Z
function toHex(decimal) {
  // set onesDigit as decimal modulo 16
  let onesDigit = decimal % 16;

  // set sixteensDigit as decimal / 16, floored
  sixteensDigit = Math.floor(decimal / 16);

  // convert onesDigit to hex
    if (onesDigit === 10) {
      onesDigit = 'A';
    } else if (onesDigit === 11) {
      onesDigit = 'B';
    } else if (onesDigit === 12) {
      onesDigit = 'C';
    } else if (onesDigit === 13) {
      onesDigit = 'D';
    } else if (onesDigit === 14) {
      onesDigit = 'E';
    } else if (onesDigit === 15) {
      onesDigit = 'F';
    }

    return `${sixteensDigit}${onesDigit}`;
}

function makeTicker() {
  // invoke chooseLetter() 4 times
  // return the ticker
}

function chooseLetter() {
  // randomly chooses a letter in the valid unicode range
  // returns that letter
}