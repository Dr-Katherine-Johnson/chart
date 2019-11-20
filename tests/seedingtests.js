const mocha = require('mocha');
const expect = require('chai').expect;

const tickers = require('../seeds/tickers.js');
describe('Tickers', () => {
  const tickerList1 = tickers.createTickers();
  const tickerList2 = tickers.createTickers();
  describe('Seed', () => {
    it('Should be a string', () => {
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
});