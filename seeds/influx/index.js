const { seedInfluxDB } = require('./influx-seed.js');
// these need to go into the .env if choosing this database
const influxURL = 'http://localhost';
const token = process.env.INFLUXDB;

// What changes is time are the prices:
const measurement = 'prices';
// How many unique records or tickers
const records = 1350000; // 18329343.695ms = 5 hours
const bucket = 'robinhood-chart';
// should the orgID go into .env?
const orgID = '66c5cd13f69410bd';
const connection = {
  hostname: influxURL,
  token: token,
  bucket: bucket,
  orgID: orgID,
  precision: 'ms'
}

// seed database
seedInfluxDB(measurement, records, connection);