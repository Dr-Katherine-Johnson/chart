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

    xit('should have different prices, if volume is greater than 0', () => {

    })

    it('low price should be no more than 50% lower than high price', () => {

    });

    it('adjacent prices should be no more than 10% different', () => {

    });
  });

  describe('createAnchorPrice', () => {
    it('should return a number between 0 and less than 1000', () => {
      let startingPrice;
      for (let i = 0; i < 1000; i++) {
        startingPrice = prices.createAnchorPrice();
        expect(startingPrice >= 0 && startingPrice < 1000).to.be.true;
      }
    });
  });

  describe('generatePricesList', () => {
    const pricesList = prices.generatePricesList();
    it('Should return an array', () => {
      expect(pricesList).to.be.an.instanceOf(Array);
    });

    it('Array should have 7 objects', () => {
      expect(pricesList).to.have.lengthOf(7);
    });
  });

  xdescribe('Date', () => {
    it('Should generate a random Date')
  })
});