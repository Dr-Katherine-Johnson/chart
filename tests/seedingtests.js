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
  describe('Name', () => {
    const name1 = prices.generateName();
    const name2 = prices.generateName();

    it('Should generate string', () => {
      expect(name1).to.be.a('string');
    });

    it('Should generate a random name', () => {
      expect(name1).to.not.equal(name2);
    });
  });

  xdescribe('Date', () => {
    it('Should generate a random Date')
  })
});