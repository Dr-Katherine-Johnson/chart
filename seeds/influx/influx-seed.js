// // Syntax
// <measurement>[,<tag_key>=<tag_value>[,<tag_key>=<tag_value>]] <field_key>=<field_value>[,<field_key>=<field_value>] [<timestamp>]

// This file is responsible for creating line-protocol strings and writing them into the database
// Mongoose schema is
// {
//   ticker: “APPL”,
//   name: “Apple”,
//   prices: [
//     {
//       dateTime: 2019-11-16T22:27:19.319Z,
//       open: 264.03,
//       high: 264.40,
//       low: 264.02,
//       close: 264.35,
//       volume: 96770
//     },
//     // ...
//   ]
// }



/**
 * Generates line protocol string in batches and write to InfluxDB
 * @param {String} measurement indicates what would be measured over time, almost like a table name, ie the stock prices
 * @param {Number} tickers the number of tickers, or unique series, ie the unique stocks (records)
 * //TODO also have a param for the unique data points per series? (the number of prices in a day)
 * @param {Object} connection should include { hostname: 'HOST_NAME', token: 'AUTHENTICATING_TOKEN', bucket: 'BUCKET_NAME', orgId: 'ID', precision: 'ns|ms|s'}
 * @returns {String} line protocol string syntx
 *
 */
/*
 * Measurement,TagSet FieldSet Timestamp
 *
 * | Measurement  | Separatator | TagSet              |Separator| FieldSet       |Separator| Timestamp  |
 * |--------------|-------------|---------------------|---------|----------------|---------|------------|
 * |<measurement> | ","   comma | ticker=<ticker_ID>, | Space   | open=<price>,  | Space   |Unix        |
 * |              |             | name=<ticker_name>  |         | high=<price>,  |         |nanosecond  |
 * |  string      |             |         string      |         | low=<price>,   |         |timestamp   |
 * |              |             |         should use  |         | close=<price>, |         |            |
 * |              |             |         quotes like |         | volume=<price> |         |            |
 * |              |             |  ex: name="A name"  |         |         float  |         |            |
 *
 * Strings are case senstive and float is a IEEE-754 64-bit floating-point numbers
 */
const Influx = require('../../db/influx-client.js');
const prices = require('../prices.js');
const tickers = require('../tickers.js');
const { JSONTickerToLineProtocol } = require('../../controller/Utils');

const seedInfluxDB = async function(measurement, series, connection, precision) {
  // start a timer
  console.time("all");
  // The idea is to create a line protocol string with concatenation:
  // measurement tagSet + space + fieldSet + timeStamp
  let lineProtocolString = '';
  // We'll send batches of 5000 points per write request, so we need to keep track of datapoints
  let batchSize = 5000;
  let dataPoints = 0;
  // get all the unique tickers that will become one of our tags
  const uniqueTickers = tickers.createNTickers(series);
  // QUESTION: Will faker generate enought random names?
  const uniqueNames = prices.generateAllNames(series);
  // For each ticker, there will be n data points or line protocol strings that correspond to the number of prices
  // This means we'll have to double loop, once over the tickers and once over the prices array
  // for handling index creation we first generate one point for each ticker
  // so that the AWS instance doesn't crash while trying to seed the db
  for (let i = 0; i < series; i++) {
    var currentTicker = uniqueTickers[i];
    var tickerName = uniqueNames[i];
    var pricesList = prices.generatePricesList();
    // Write the remaining price points to the database
    for (let j = 1; j < pricesList.length; j++) {
      var priceObject = pricesList[j];
      // use our utils function to convert to line protocol
      var dataPoint = JSONTickerToLineProtocol(measurement, { ticker: currentTicker, name: tickerName, price: priceObject});
      // Everytime we write a datapoint we increment the counter
      dataPoints++;
      // To write multiple lines in one request, each line of line protocol must be delimited by a new line (\n).
      lineProtocolString += `${dataPoint}\n`
      // once we have 5000 points, we write to the database
      if (dataPoints % batchSize === 0 ) {
        // we want to make sure we wait for the database response before writing the next string
        await Influx.writePoints(connection, lineProtocolString, precision)
        // and reset the protocol string
        lineProtocolString = '';
        if (dataPoints % 10000 === 0) {
          console.log(`${dataPoints} datapoints written`);
        }
      }
    }
  }
  console.log('All points written to database');
  console.timeEnd("all");
}

seedInfluxDB('prices', 1);

module.exports = { seedInfluxDB };