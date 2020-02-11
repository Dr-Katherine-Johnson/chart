// This script creates a csv file using previous functions to generate tickers and prices
const prices = require('../prices.js');
const tickers = require('../tickers.js');

/////////////////////////////  WRITING TO CSV SETUP /////////////////////////////////////////
// UPDATE : csvWriter and fast-csv creates a memory error: failed on 4000 or so tickers with csvWriter
// this is because there are a max number of bytes that can be stored inside a writeable stream's internal buffer
// See "highWaterMark" property: see nodejs.org/api/stream.html#stream_even_drain
// open the file we want to write our tickers and prices to
const fs = require('fs');
const wsPrices = fs.createWriteStream('./seeds/influx/prices.csv');
/////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////// FUNCTION THAT WRITE TO THE TWO CSV FILES ////////////////////////
const writePricesData = async (maxTickers, pricesWriter) => {
  console.time("all");
  console.time("batch");
  // get the unique tickers with our previous function
  const allTickers = tickers.createNTickers(maxTickers);
  let currentTickerIdx = 0;
  // first csv file
  while (currentTickerIdx < maxTickers) {
    let currentTicker = allTickers[currentTickerIdx];
    var company = prices.generateName();
    let priceList = prices.generatePricesList();
    let currentPriceIdx = 0;
    // second csv file
    while (currentPriceIdx < priceList.length) {
      const priceObject = priceList[currentPriceIdx];
      const { dateTime, open, high, low, close, volume }  = priceObject;
      const priceData = `${currentTicker},${company},${open},${high},${low},${close},${volume},${dateTime}\n`;
      await write(pricesWriter, priceData);
      currentPriceIdx++
    }
    currentTickerIdx++;
    if ((currentTickerIdx + 1) % 10000 === 0) {
      console.log('batch ticker ', currentTickerIdx + 1);
      console.timeEnd("batch");
    }
  }
  console.timeEnd("all");
}

// prefents backpressuring when writing to stream
// returns a promise when we get a drain, only in that case does await need to be called
const write = (writer, data) => {
  return new Promise((resolve) => {
    if (!writer.write(data)) {
      writer.once('drain', resolve)
    } else {
      resolve()
    }
  })
}

writeTickerData(100, wsPrices)