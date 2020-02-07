// create a csv file
const prices = require('../prices.js');
const tickers = require('../tickers.js');
const fastcsv = require('fast-csv');
const fs = require('fs');
const wsTickers = fs.createWriteStream("./seeds/timescale/tickers.csv");
const wsPrices = fs.createWriteStream("./seeds/timescale/prices.csv");

var tickerData = [];
var priceData = [];

const getTickerAndPriceData = (numberOfUniqueTickers) => {
  const uniqueTickers = tickers.createNTickers(numberOfUniqueTickers);
  for (let i = 0; i < numberOfUniqueTickers; i++) {
    var newTicker = {
      ticker: uniqueTickers[i],
      company: prices.generateName()
    };
    var pricesList = prices.generatePricesList();
    for (let j = 0; j < pricesList.length; j++) {
      var priceObject = pricesList[j];
      var newSQLPriceObject = {
        ticker: uniqueTickers[i],
        date_time: priceObject.dateTime,
        open_price: priceObject.open,
        high: priceObject.high,
        low: priceObject.low,
        close_price: priceObject.close,
        volume: priceObject.volume,
      };
      priceData.push(newSQLPriceObject);
    }
    tickerData.push(newTicker);
  };
  console.log('finished pushing data');
  return tickerData;
}

getTickerAndPriceData(100);

// output 2 files, one with tickers + names
// the other with tickers + prices
fastcsv
  .write(tickerData, { headers: true })
  .pipe(wsTickers);

fastcsv
.write(priceData, { headers: true })
.pipe(wsPrices);