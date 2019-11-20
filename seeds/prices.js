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

    for (let i = 0; i < 7; i++) {
      result.push(this.generatePrice());
    }
    return result;
  },

  generatePrice() {
    return {
      dateTime: 'DATE',
      open: 1,
      high: 1,
      low: 1,
      close: 1,
      volume: 'INTEGER'
    };
  }
}