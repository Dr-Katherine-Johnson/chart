const mocha = require('mocha');
const expect = require('chai').expect;

const tickers = require('../seeds/tickers.js');
const prices = require('../seeds/prices.js');
const seed = require('../seeds/seed.js');

// TICKER SEEDING SCRIPT
describe('Tickers Seeding Function', () => {
  const tickerList1 = tickers.createTickers();
  const tickerList2 = tickers.createTickers();

  it('Should generate an array of strings', () => {
    tickerList1.forEach(ticker => {
      expect(ticker).to.be.a('string');
    })
  })
  it('Should generate 100 tickers', () => {
    expect(tickerList1).to.have.lengthOf(100);
  });
  it('On repeated calls, should generate the same 100 tickers, in the same order', () => {
    expect(JSON.stringify(tickerList1)).to.equal(JSON.stringify(tickerList2));
  });
  it('Each ticker should be different', () => {
    const tickerSet = new Set(tickerList1);
    expect(tickerSet.size).to.equal(100);
  });
});

// PRICES SEEDING SCRIPT
describe('Prices Seeding Function', () => {
  describe('createAnchorPrice', () => {
    it('should return a number between 0 and less than 1000', () => {
      let startingPrice;
      for (let i = 0; i < 1000; i++) {
        startingPrice = prices.createAnchorPrice(1000);
        expect(startingPrice >= 0 && startingPrice < 1000).to.be.true;
      }
    });
  });

  describe('lessThanTenPercentDifferent', () => {
    it('should return a number that is less than 10% different - either greater or lesser - than its argument', () => {

      let random, num;
      // iterate 1000 times
      for (let i = 0; i < 1000; i++) {
        // make a random number between 0 and 1000
        random = Math.random() * 1000;

        // save num as return from lessThanTenPercentDifferent on that random number
        num = prices.lessThanTenPercentDifferent(random);

        // verify that num is either
        // greater than num * 0.90, OR
        // less than num * 1.10
        expect((num > num * 0.90) || (num < num * 1.10)).to.be.true;
      }
    });
  });

  describe('generateName', () => {
    const name1 = prices.generateName();
    const name2 = prices.generateName();

    it('Should generate a string', () => {
      expect(name1).to.be.a('string');
    });

    it('Should generate a random name', () => {
      expect(name1).to.not.equal(name2);
    });
  });

  describe('generatePrice', () => {
    const priceObject = prices.generatePrice();

    it('should return an object', () => {
      expect(priceObject).to.be.an.instanceOf(Object);
    });

    it('should not return an empty object', () => {
      expect(priceObject).to.not.be.empty;
    });

    it('should have properties open, high, low, & close, of types INTEGER', () => {
      const keys = ['open', 'high', 'low', 'close'];
      keys.forEach(key => {
        expect(priceObject[key]).to.be.a('number');
      })
    });

    it('high should be the highest price', () => {
      expect(priceObject['high']).to.be.at.least(priceObject['low']);
      expect(priceObject['high']).to.be.at.least(priceObject['open']);
      expect(priceObject['high']).to.be.at.least(priceObject['close']);
    });

    it('low should be the lowest price', () => {
      expect(priceObject['low']).to.be.at.most(priceObject['high']);
      expect(priceObject['low']).to.be.at.most(priceObject['open']);
      expect(priceObject['low']).to.be.at.most(priceObject['close']);
    });

    it(`in one price object, high is less than 20% different from low`, () => {
      const nextPrice = prices.generatePrice(priceObject);
      expect((nextPrice.high * 0.8) < nextPrice.low).to.be.true;
    });
  });

  describe('generatePricesList', () => {
    const pricesList = prices.generatePricesList();

    it('Should return an array', () => {
      expect(pricesList).to.be.an.instanceOf(Array);
    });

    it('Array should have 1750 objects', () => {
      expect(pricesList).to.have.lengthOf(1750);
    });

    it(`the previous day's close should be less than 10% different from the next day's open`, () => {
      let current, previous;
      // iterate through pricesList, starting at the second element
      for (let i = 1; i < 1750; i++) {
        // check the current element's open with the previous element's close
        current = pricesList[i].open
        previous = pricesList[i - 1].close

        // expect them to be less than 10% different from each other
        expect((current > previous * 0.90 && current < previous) || (current < previous * 1.10 && current > previous)).to.be.true;
      }
    });
  });

  describe('Date', () => {
    const pricesList = prices.generatePricesList();

    it('Each price object should have a dateTime as an ISO 8601 Extended Format string', () => {
      pricesList.forEach(price => {
        expect(price.dateTime).to.be.a('string');
        expect(new Date(price.dateTime)).to.be.an.instanceOf(Date);
      });
    });

    it('The first dateTime should have a time of 9:30 AM', () => {
      expect(new Date(pricesList[0].dateTime).getUTCHours()).to.equal(9);
      expect(new Date(pricesList[0].dateTime).getUTCMinutes()).to.equal(30);
    });

    it('Each subsequent dateTime in a day should add 1 hour to the time', () => {
      // iterate through the collection, starting from the second element
      for (let i = 1; i < pricesList.length; i++) {
        // if the index does NOT divide evenly by 7
        if (i % 7 !== 0) {
          // check that the current dateTime's hour is one greater than the previous dateTime's hour
          expect(new Date(pricesList[i].dateTime).getUTCHours()).to.equal(new Date(pricesList[i - 1].dateTime).getUTCHours() + 1);
        }
      }
    });

    it('Every 7th dateTime should increment the day by 1', () => {
      for (let i = 1; i < pricesList.length; i++) {
        if (i % 7 === 0) {
          expect(new Date(pricesList[i].dateTime).getTime()).to.equal(new Date(pricesList[i - 1].dateTime).getTime() + 64800000);
        }
      }
    });
  });
});

// SEEDING SCRIPT
xdescribe('Seeding Script', () => {
  seed.start();
  it('Should return an array of 100 objects', () => {

  });

  it('Should save each object to the database', () => {

  });
});