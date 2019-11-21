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
    //       volume: INTEGER
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
      result.push(this.generatePrice({}));
    }
    return result;
  },

  createAnchorPrice() {
    // get starting price
    return Math.random() * 1000;
  },

  generatePrice(previousPrice) {
    // console.log('previousPrice: ', previousPrice);

    // set open price first
    let open;
    if (previousPrice === undefined) {
      open = this.lessThanTenPercentDifferent(this.createAnchorPrice());
    } else {
      open = this.lessThanTenPercentDifferent(previousPrice.close);
    }

    // calculate three prices of lessThanTenPercentDifferent
    let otherPrices = []
    for (let i = 0; i < 3; i++) {
      otherPrices.push(this.lessThanTenPercentDifferent(open));
    }

    // sort them ascending
    otherPrices.sort((a, b) => a - b);

    const high = otherPrices.pop();
    const close = otherPrices.pop();
    const low = otherPrices.pop();

    return {
      dateTime: 'DATE',
      open,
      high,
      low,
      close,
      volume: 'INTEGER'
    };
  },

  // returns a number that is less than 10% different from its argument
  lessThanTenPercentDifferent(num) {
    const flag = Math.round(Math.random());
    let result, random;
    random = Math.random() * (0.10 * num);

    if (flag === 0) {
      result = num + random
    } else {
      result = num - random
    }
    return result;
  }
}