const db = require('../db/influx-client');
const { fluxToJSON } = require('./Utils');
const config = require('../env.config.js');
require('dotenv').config();

// TO DO refactor so the connection is established in a separate index file in the DB?
const connection = {
  hostname: config.SERVICE_CHART_URL,
  token: process.env.INFLUX_TOKEN,
  bucket: config.BUCKET,
  orgID: process.env.ORG_ID
}

module.exports = {
  getTicker(req, res, next) {
    let stock = {
      ticker: req.params.ticker
    }
    return db.query(connection, stock.ticker, 'name')
      .then(csv => {
        return fluxToJSON(csv);
      })
      .then(jsonObject => {
        console.log(jsonObject)
        stock.name = jsonObject[0]._value;
        console.log('STOCK', stock)
      })
  },
  getCurrentPrice(req, res, next) {

  },
  getPercentChange(req, res, next) {

  }
}