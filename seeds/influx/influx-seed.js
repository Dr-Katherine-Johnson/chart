// // Syntax
// <measurement>[,<tag_key>=<tag_value>[,<tag_key>=<tag_value>]] <field_key>=<field_value>[,<field_key>=<field_value>] [<timestamp>]

// This file is responsible for creating line-protocol strings and writing them into the database
// TODO: move comments to readme section if this database is chosen
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

// In InfluxDB
// ticker and name are tags that identify the series
// while open, high, low, close and volume are fields
// and the timestamp is on its own
// We can create a data point in line protocol with the information:
//  tags:
//   ticker=“APPL”,name=“Apple”,
//  fields: // from prices array
//    open=264.03,high: 264.40,low: 264.02,close: 264.35,volume: 96770,
//  timestamp:
//    2019-11-16T22:27:19.319Z // from prices.dateTime
//

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

const seedInfluxDB = async function(measurement, series, connection) {
  // start a timer
  console.time("all");
  // get the values from the connection
  const { hostname, token, ...options } = connection;
  // The idea is to create a line protocol string with concatenation:
  // measurement tagSet + space + fieldSet + timeStamp
  let lineProtocolString = '';
  // We'll send batches of 5000 points per write request, so we need to keep track of datapoints
  let batchSize = 5000;
  let dataPoints = 0;
  // get all the unique tickers that will become one of our tags
  const uniqueTickers = tickers.createNTickers(series);
  // For each ticker, there will be n data points or line protocol strings that correspond to the number of prices
  // This means we'll have to double loop, once over the tickers and once over the prices array
  for (let i = 0; i < series; i++) {
    var currentTicker = uniqueTickers[i];
    // QUESTION: Will faker generate enought random names?
    // Ticker generates names for companies, some of them contain commas and spaces
    // Line protocol for tag values should escape both commas and spaces

    // TO DO: refactor to line 110:
    // write a function that takes in a ticker and price object and converts to line string protocol
    var escapeCharacters = /[, ]/g;
    var tickerName = prices.generateName().replace(escapeCharacters, (match) => `\\${match}`);
    var tagSet = `ticker=${currentTicker},name=${tickerName} `; // add a space at the end for syntax compliance
    var pricesList = prices.generatePricesList();
    // Second loop over all the prices
    for (let j = 0; j < pricesList.length; j++) {
      var fieldSet = '';
      // we want to generate the field set dynamically with the price object keys => the fields (open, high, low...)
      var priceObject = pricesList[j];
      var fields = Object.keys(priceObject);
      for (let k = 0; k < fields.length; k++) {
        // The priceObject also includes dateTime, make sure it's skipped and added at the end
        var currentField = fields[k];
        if (currentField === "dateTime") {
          continue;
        } else {
          // make sure that if we're done with all the fields our separator is an empty string
          var separator = (currentField === 'volume') ? '' : ',';
          var fieldValue = priceObject[currentField];
          fieldSet += `${currentField}=${fieldValue}${separator}`
        }
      }
      // now we can create the whole line protocol with the right separators
      // we need to make sure time is in the right format - Unix Time
      var timeInISO8601 = new Date(priceObject.dateTime);
      // NOTE: InfluxDB expects default time in ns, gut the JavaScript default for .getTime method is in ms
      // So we'll have to make sure to pass that precision into the options on the requests
      var timeStamp = timeInISO8601.getTime();
      // Everytime we write a datapoint we increment the counter
      var dataPoint = `${measurement},${tagSet} ${fieldSet} ${timeStamp}`;
      dataPoints++;
      // To write multiple lines in one request, each line of line protocol must be delimited by a new line (\n).
      lineProtocolString += `${dataPoint}\n`
      // once we have 5000 points, we write to the database
      if (dataPoints % batchSize === 0 ) {
        // we want to make sure we wait for the database response before writing the next string
        await Influx.writePoints(hostname, options, token, lineProtocolString)
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

module.exports = { seedInfluxDB };