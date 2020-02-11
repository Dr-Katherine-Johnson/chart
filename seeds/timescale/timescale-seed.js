// This script creates a csv file using previous functions to generate tickers and prices
// It will load the each csv file to timescale in batches
const prices = require('../prices.js');
const tickers = require('../tickers.js');

/////////////////////////////  WRITING TO CSV SETUP /////////////////////////////////////////
const fs = require('fs');
// open the file we want to write our tickers and prices to
const wsTickers = fs.createWriteStream('./seeds/timescale/tickers.csv');
const wsPrices = fs.createWriteStream('./seeds/timescale/prices.csv');
/////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// LOADING TO DATABASE ////////////////////////////////////////////
import path from 'path';
// the child_process allows us to execute commands
const { spawn } = require('child_process');
/////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////// FUNCTION THAT WRITES TO THE TWO CSV FILES ////////////////////////
const writeTickerData = async (maxTickers, tickerWriter, pricesWriter) => {
  console.time("all");
  // get the unique tickers
  const allTickers = tickers.createNTickers(maxTickers);
  // since we're using a while loop initialize our index
  let currentTickerIdx = 0;
  // first csv file is the outer loop and write the csv for our tickers table
  while (currentTickerIdx < maxTickers) {
    let currentTicker = allTickers[currentTickerIdx];
    // generate the price list for each ticker
    let priceList = prices.generatePricesList();
    // initialize the index to iterate over the prices
    let currentPriceIdx = 0;
    // second csv file writes the csv for our prices table
    while (currentPriceIdx < priceList.length) {
      // each price for a stock or ticker is an object with a series of properties
      const priceObject = priceList[currentPriceIdx];
      const { dateTime, open, high, low, close, volume }  = priceObject;
      // get the line for each priceObject to write to the csv
      const priceData = `${currentTicker},${dateTime},${open},${high},${low},${close},${volume}\n`;
      await write(pricesWriter, priceData);
      currentPriceIdx++
    }
    var company = prices.generateName();
    var tickerData = `${currentTicker},"${company}"\n`;
    await write(tickerWriter, tickerData);
    currentTickerIdx++;
    // NOTE check how long it takes to load up that 20MB file - a couple of seconds
    if ((currentTickerIdx + 1) % 200 === 0) {
      // end the writestreams
      wsTickers.end();
      wsPrices.end();
      // run a bash commands with child process
        // copies the csv file into the container
        // executes the COPY command using postgres
        // deletes the file
      // recreate the stream
    }
  }
  console.timeEnd("all");
}

// prefents backpressuring when writing to stream
// returns a promise when we get a drain, only in that case does await need to be called
// this is because there are a max number of bytes that can be stored inside a writeable stream's internal buffer
// see nodejs.org/api/stream.html#stream_even_drain
const write = (writer, data) => {
  return new Promise((resolve) => {
    if (!writer.write(data)) {
      writer.once('drain', resolve)
    } else {
      resolve()
    }
  })
}

// copies the csv file into the container
const copyToDocker = (data, table) => {
  const dockerCP = spawn('docker', ['cp', path.join(__dirname, `${table}.csv`), `timescaledb:/${table}.csv`]);
  return new Promise((resolve) => {
    dockerCP.stdout.on('done', resolve});
  })
}

writeTickerData(200, wsTickers, wsPrices)