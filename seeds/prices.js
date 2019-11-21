const request = require('request');
const faker = require('faker');


// needs to import the array of all the tickers
  // iterate through the array
    // generate random, unique values for each relevant property
    // {
    //   ticker: STRING,
    //   name: STRING,
    //   prices: [
    //     {
    //       dateTime: DATE,
    //       open: NUMBER,
    //       high: NUMBER,
    //       low: NUMBER,
    //       close: NUMBER,
    //       volume: NUMBER
    //     },
    //     // ...
    //   ]
    // }
    // creating a document in Mongoose with that ticker
module.exports = {
  generateName() {
    return faker.company.companyName();
  },

  generatePricesList() {
    const result = [];

    for (let i = 0; i < 1750; i++) {
      result.push(this.generatePrice());
    }
    return result;
  },

  createAnchorPrice(num) {
    // get starting price
    return Math.random() * num;
  },

  generatePrice(previousPrice) {
    // console.log('previousPrice: ', previousPrice);

    // set open price first
    let open;
    if (previousPrice === undefined) { // TODO: might need to change if you update the arguments to generatePrice in generatePricesList()
      open = this.lessThanTenPercentDifferent(this.createAnchorPrice(1000));
    } else {
      open = this.lessThanTenPercentDifferent(previousPrice.close);
    }

    // calculate three prices of lessThanTenPercentDifferent
    let maybeHigh = this.lessThanTenPercentDifferent(open, 1);
    let maybeLow = this.lessThanTenPercentDifferent(open, 0)
    let close = this.lessThanTenPercentDifferent(open)
    let low, high;

      // open has to be open
      // close has to be close
      // if maybeLow is below close, set as low
      if (maybeLow < close) {
        low = maybeLow;
      } else {
        // else, set the lower of open OR close as low
        low = open <= close ? open : close;
      }

      // if maybeHigh is above close, set as high
      if (maybeHigh > close) {
        high = maybeHigh;
      } else {
        // else, set the higher of open OR close as high
        high = open >= close ? open : close;
      }

    return {
      dateTime: 'DATE',
      open,
      high,
      low,
      close,
      // TODO: more realistic volume patterns??
      volume: Math.round(Math.random() * 1000000)
    };
  },

  // returns a number that is less than 10% different from its argument
  // @param num - INT - input number
  // @param useLessThan - INT - should the function return a number less than or greater than the input argument, 0 for yes, 1 for no, omit for random
  lessThanTenPercentDifferent(num, useLessThan) {
    if (useLessThan === undefined) {
      useLessThan = Math.round(Math.random());
    }

    let result, random;
    random = Math.random() * (0.10 * num);

    if (useLessThan === 0) {
      result = num - random
    } else if (useLessThan === 1) {
      result = num + random
    }
    return result;
  }
}