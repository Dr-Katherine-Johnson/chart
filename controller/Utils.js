const csv = require('csvtojson');

// converts a flux query output - annotated csv - to JSON
module.exports.fluxToJSON = (fluxCSV) => {
  return csv({checkType: true, ignoreEmpty: true, ignoreColumns: /(result|table)/})
    .fromString(fluxCSV)
    .then(jsonObj => jsonObj)
    .catch(err => console.log(err));
}

// checks the contents of a csv file to see if it's empty
module.exports.isEmpty = (csv) => {
  return /^\r\n$/.test(csv);
}

/**
 * Given a two element array calculates the percent change
 * @param {Array} — Given an array with two numbers, calculates the percent change between the first number, array[0] and the second number
 * @returns {String} — Returns the percent change as a string
 */
module.exports.percentChange = (array) => {
  const lastPrice = array[1]._value;
  const prevPrice = array[0]._value;
  let percentChange = (lastPrice - prevPrice) / prevPrice;
  if (isNaN(percentChange)) {
    percentChange = 0;
  }
  return percentChange.toFixed(4);
}

/**
 * Takes in a JSON ticker with the following data
 *
 * @param {String} — Measurement or the mongoDB equivalent of a collection
 * @param {Object} — Shape of the object
 *
 * {
 *   ticker: “APPL”,
 *   name: “Apple”,
 *   price: {
 *       dateTime: 2019-11-16T22:27:19.319Z,
 *       open: 264.03,
 *       high: 264.40,
 *       low: 264.02,
 *       close: 264.35,
 *       volume: 96770
 *     }
 * }
 *
 * @returns {String} — in Line protocol format
 *
 * In InfluxDB
 * ticker and name are tags that identify the series
 * while open, high, low, close and volume are fields
 * and the timestamp is on its own
 * We can create a data point in line protocol with the information:
 *  measurement: "prices"
 *  tags:
 *   ticker=“APPL”,name=“Apple”,
 *  fields:  * from prices array
 *    open=264.03,high: 264.40,low: 264.02,close: 264.35,volume: 96770,
 *  timestamp:
 *    1573943239319 converted to Unix Time from prices.dateTime=2019-11-16T22:27:19.319Z
 *
 *  the line protocl string would look like:
 *  prices,ticker=“APPL”,name=“Apple” open=264.03,high: 264.40,low: 264.02,close: 264.35,volume: 96770,
 *
 */
module.exports.JSONTickerToLineProtocol = (measurement, { ticker, name, price }) => {
  var tagSet = `${ticker}`;
  if (name) {
    // Line protocol for tag values should escape both commas and spaces
    var escapeCharacters = /[, ]/g;
    // Some names can contain commas and spaces
    var tickerName = name.replace(escapeCharacters, (match) => `\\${match}`);
    var tagSet += `,name=${tickerName} `;
  } else {
    tagSet += ' ';
  }
  var fields = Object.keys(price);
  var fieldSet = '';
  // we want to generate the field set dynamically with the price object keys => the fields (open, high, low...)
  for (let k = 0; k < fields.length; k++) {
    // The price object also includes dateTime, make sure it's skipped and added at the end
    var currentField = fields[k];
    if (currentField === "dateTime") {
      continue;
    } else {
      // make sure that if we're done with all the fields our separator is an empty string
      var separator = (currentField === 'volume') ? '' : ',';
      var fieldValue = price[currentField];
      fieldSet += `${currentField}=${fieldValue}${separator}`
    }
  }
  // now we can create the whole line protocol with the right separators
  // we need to make sure time is in the right format - Unix Time
  var timeInISO8601 = new Date(price.dateTime);
  // NOTE: InfluxDB expects default time in ns, gut the JavaScript default for .getTime method is in ms
  // So we'll have to make sure to pass that precision into the options on the requests
  var timeStamp = timeInISO8601.getTime();
  // Everytime we write a datapoint we increment the counter
  var dataPoint = `${measurement},${tagSet} ${fieldSet} ${timeStamp}`;
  return dataPoint;
}