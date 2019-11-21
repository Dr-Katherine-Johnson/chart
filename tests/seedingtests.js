const mocha = require('mocha');
const expect = require('chai').expect;

const tickers = require('../seeds/tickers.js');
const prices = require('../seeds/prices.js');

// TICKER SEEDING SCRIPT
describe('Tickers Seeding Script', () => {
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
describe('Prices Seeding Script', () => {
  describe('createAnchorPrice', () => {
    it('should return a number between 0 and less than 1000', () => {
      let startingPrice;
      for (let i = 0; i < 1000; i++) {
        startingPrice = prices.createAnchorPrice();
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
    // TODO: is this a good way of entering initial sample data?
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

    xit('should have different prices, if volume is greater than 0', () => {

    })

    xit('low price should be no more than 50% lower than anchorPrice', () => {

    });

    xit('high price should be no more than 50% higher than anchorPrice', () => {

    });

    it('adjacent prices should be less than 10% different', () => {

    });

    it(`in one price object, high is less than 10% different from low`, () => {
      const nextPrice = prices.generatePrice(priceObject);
      expect((nextPrice.high * 0.9) < nextPrice.low).to.be.true;
    });

    it(`the previous day's close should be less than 10% different from the next days open`, () => {
      const price = prices.generatePrice({ close: 100 })
      expect(price.open > 90).to.be.true;
    })
  });

  describe('generatePricesList', () => {
    const pricesList = prices.generatePricesList();
    it('Should return an array', () => {
      expect(pricesList).to.be.an.instanceOf(Array);
    });

    it('Array should have 1750 objects', () => {
      expect(pricesList).to.have.lengthOf(1750);
    });
  });

  xdescribe('Date', () => {
    it('Should generate a random Date')
  })
});