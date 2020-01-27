// // Syntax
// <measurement>[,<tag_key>=<tag_value>[,<tag_key>=<tag_value>]] <field_key>=<field_value>[,<field_key>=<field_value>] [<timestamp>]

// This file is responsible for creating a line-protocol string
// TODO: move comments to readme section
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
// while open, high, low, close and volume are fields?
// and the timestamp is on its own
// We can create a data point with the information:
//  tags:
//   ticker=“APPL”,name=“Apple”,
//  fields: // from prices array
//    open=264.03,high: 264.40,low: 264.02,close: 264.35,volume: 96770,
//  timestamp:
//    2019-11-16T22:27:19.319Z // from prices.dateTime
//

/**
 * Generates a line protocol string to write to InfluxDB
 * @param {measurement} string indicates what would be measured over time, almost like a table name, ie the stock prices
 * @param {Number} tickers the number of tickers, or unique series, ie the unique stocks
 * //TODO also have a param for the unique data points per series? (the number of prices in a day)
 * @returns {string} line protocol string with the following syntax
 *
 * Measurement,TagSet FieldSet Timestamp
 *
 * | Measurement  | Separatator | TagSet              |Separator| FieldSet       |Separator| Timestamp  |
 * |--------------|-------------|---------------------|---------|----------------|---------|------------|
 * |<measurement> | ","   comma | ticker=<ticker_ID>, | Space   | open=<price>,  | Space   |Unix        |
 * |              |             | name=<ticker_name>  |         | high=<price>,  |         |nanosecond  |
 * |  string      |             |         string      |         | low=<price>,   |         |timestamp   |
 * |              |             |                     |         | close=<price>, |         |            |
 * |              |             |                     |         | volume=<price> |         |            |
 * |              |             |                     |         |         float  |         |            |
 *
 * Strings are case senstive and float is a IEEE-754 64-bit floating-point numbers
 */

module.exports = {
  getLineProtocolString(measurement,100) {
    // initialize measurement to be 'prices' for all
    // create the first part of the string string that looks like
    // // {
    //   name: prices.generateName(),
    //   prices: prices.generatePricesList()
    // };
    // So we'd loop over the tickers array from tickers.createNTickers(n)
    // measurement,ticker='CURRENT_TICKER',name=prices.generateName()
    // then generate a list of prices with generatePriceList
    // loop over the prices
      // create a line protocol string with concat:
      // first part + open=price.open,high=price.low + space + price.timeDate
      // at a new line at the end
      // and then add that to our big string
  }
}

