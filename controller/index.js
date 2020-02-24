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
    // first get the name
    return db.query(connection, stock.ticker, 'name')
      .then(csv => {
        return fluxToJSON(csv);
      })
      .then(jsonObject => {
        // assign name
        stock.name = jsonObject[0]._value;
        // get price list
        return db.query(connection, stock.ticker, 'prices')
      })
      .then(pricescsv => {
        return fluxToJSON(pricescsv);
      })
      .then(prices => {
        stock.prices = prices;
        res.status(200).send(stock);
      })
      .catch(err =>{
        console.log(err);
        res.status(500).send(err);
      })
  },
  getCurrentPrice(req, res, next) {

  },
  getPercentChange(req, res, next) {

  }
}