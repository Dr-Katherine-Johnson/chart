// This script creates a csv file using previous functions to generate tickers and prices
// It will load the each csv file to timescale in batches
const prices = require('../prices.js');
const tickers = require('../tickers.js');

/////////////////////////  WRITING TO CSV/DATABSE SETUP //////////////////////////////////
const fs = require('fs');
const path = require('path');
const { write, deleteFile, dockerCopy } = require('./seedUtils.js');
const { timescale, loadDataToTable } = require('./timescale-client.js')
//////////////////////////////////////////////////////////////////////////////////////////


////////////////////////// FUNCTION THAT WRITES TO THE TWO CSV FILES /////////////////////
module.exports = {
  seedTSDB: async function (maxTickers) {
    // open the files we want to write our tickers and prices to
    let tickerFile = path.join(__dirname, `tickers.csv`);
    let pricesFile = path.join(__dirname, `prices.csv`);
    let tickerWriter = fs.createWriteStream(tickerFile);
    let pricesWriter = fs.createWriteStream(pricesFile);
    // start a timer
    console.time("all");
    // get the unique tickers
    const allTickers = tickers.createNTickers(maxTickers);
    // since we're using a while loop initialize our index
    let currentTickerIdx = 0;
    // first csv file is the outer loop - tickers
    while (currentTickerIdx < maxTickers) {
      let currentTicker = allTickers[currentTickerIdx];
      // generate the price list for each ticker
      let priceList = prices.generatePricesList();
      // initialize the index to iterate over the prices
      let currentPriceIdx = 0;
      // second csv file writes the csv for our prices table
      while (currentPriceIdx < priceList.length) {
        // each price element for a stock or ticker is an object with a series of properties
        const priceObject = priceList[currentPriceIdx];
        const { dateTime, open, high, low, close, volume }  = priceObject;
        // get the line for each priceObject to write to the csv
        const priceData = `${currentTicker},${dateTime},${open},${high},${low},${close},${volume}\n`;
        // write to csv and wait for result before moving onto next priceObject
        await write(pricesWriter, priceData);
        currentPriceIdx++
      }
      // Once we finished writing all the prices for the ticker write the ticker's data
      var company = prices.generateName();
      // the name might have spaces and commas so use "Name, of Company" to load into postgres
      var tickerData = `${currentTicker},"${company}"\n`;
      await write(tickerWriter, tickerData);
      currentTickerIdx++;
      // Every 200 tickers + corresponding prices ~ 20MB csv load to database
      if ((currentTickerIdx + 1) % 200 === 0) {
        // executes the COPY command using postgres client
        await loadDataToTable(tickerFile, 'tickers');
        await loadDataToTable(pricesFile, 'prices');
        // deletes the files so we make better use of space
        await deleteFile(tickerFile);
        await deleteFile(pricesFile);
        // recreate the streams
        tickerWriter = fs.createWriteStream(tickerFile);
        pricesWriter = fs.createWriteStream(pricesFile);
      }
    }
    console.timeEnd("all");
  },
}