const { seedInfluxDB } = require('./influx-seed.js');
const config = require('../env.config.js');
const dotenv = require('dotenv');
dotenv.config();
// What changes is time are the prices:
const measurement = 'prices';
// How many unique records or tickers
const records = 1350000; // 18329343.695ms = 5 hours
// should the orgID go into .env?
const connection = {
  hostname: config.SERVICE_CHART_URL,
  token: process.env.INFLUX_TOKEN,
  bucket: config.BUCKET,
  orgID: process.env.ORG_ID
  precision: 'ms'
}

// seed database
seedInfluxDB(measurement, records, connection);