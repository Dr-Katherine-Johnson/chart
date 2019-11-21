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


    // open should be less than 20% different from previousPrice.close
    let random = Math.round(Math.random());

    if (random === 0) {
      open = previousPrice.close + Math.random() * (0.10 * previousPrice.close)
    } else {
      open = previousPrice.close - Math.random() * (0.10 * previousPrice.close)
    }

    return {
      dateTime: 'DATE',
      open: open,
      high: 1,
      low: 1,
      close: 1,
      volume: 'INTEGER'
    };
  }
}