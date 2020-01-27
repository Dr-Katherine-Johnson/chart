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
// We can create a data point like:
// {
//  tags: [
//   ticker: “APPL”,
//   name: “Apple”,
//  ]
//  fields: [
//    open: 264.03,
//    high: 264.40,
//    low: 264.02,
//    close: 264.35,
//    volume: 96770,
//  ]
//  timestamp: 2019-11-16T22:27:19.319Z,
// }
//
// Put them in an array
// Loop over the array and create a line protocol string
// the prices functions contain
// {
//   name: prices.generateName(),
//   prices: prices.generatePricesList()
// };
// So we'd loop over the tickers array from tickers.createNTickers(n)
  // initialize measurement to be 'prices' for all
  // create the first part of the string string that looks like
  // measurement,ticker='CURRENT_TICKER',name=prices.generateName()
  // then generate a list of prices with generatePriceList
  // loop over the prices
    // create a line protocol string with concat:
    // first part + open=price.open,high=price.low + space + price.timeDate
    // at a new line at the end
    // and then add that to our big string

