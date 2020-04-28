const tickers = require('../seeds/tickers.js');

describe('Ticker seeding functions', () => {

  describe('Function to create 100 tickers', () => {
    const tickerList1 = tickers.create100Tickers();
    const tickerList2 = tickers.create100Tickers();

    it('Should generate an array of strings', () => {
      tickerList1.forEach(ticker => {
        expect(typeof ticker).toBe('string');
      })
    })
    it('Should generate 100 tickers', () => {
      expect(tickerList1).toHaveLength(100);
    });
    it('On repeated calls, should generate the same tickers, in the same order', () => {
      expect(JSON.stringify(tickerList1)).toBe(JSON.stringify(tickerList2));
    });
    it('Each ticker should be different', () => {
      const tickerSet = new Set(tickerList1);
      expect(tickerSet.size).toBe(100);
    });
  });
  describe('Function to create N tickers', () => {

    it('Should generate an array of strings', () => {
      var tickerList100 = tickers.createNTickers(100);
      tickerList100.forEach(ticker => {
        expect(typeof ticker).toBe('string');
      })
    })
    it('Should generate at least 2 million tickers', () => {
      const tickerCount = 2000000;
      const tickerList = tickers.createNTickers(tickerCount)
      expect(tickerList).toHaveLength(tickerCount);
    });
    it('On repeated calls, should generate the same tickers, in the same order', () => {
      const tickerCount = 2000000;
      const tickerList1 = tickers.createNTickers(tickerCount);
      const tickerList2 = tickers.createNTickers(tickerCount);
      expect(JSON.stringify(tickerList1)).toBe(JSON.stringify(tickerList2));
    });
    it('Each ticker should be different', () => {
      const tickerCount = 2000000;
      const tickerList1 = tickers.createNTickers(tickerCount);
      const tickerSet = new Set(tickerList1);
      expect(tickerSet.size).toBe(tickerCount);
    });
  });
})