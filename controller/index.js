const db = require('../db/influx-client');
const { fluxToJSON, isEmpty, percentChange } = require('./Utils');
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
    // console.log('getting ticker', stock.ticker)
    // first get the name
    return db.query(connection, stock.ticker, 'name')
      .then(csv => {
        if (isEmpty(csv)) {
          console.log('empty response from database');
          throw 'Ticker not in database';
        }
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
        // TO DO : how can we get better errors back from the database
        console.log('ERROR', err);
        res.status(500).send(err);
      });
  },
  getCurrentPrice(req, res, next) {
    // console.log('getting current price', req.params.ticker)
    return db.query(connection, req.params.ticker, 'last')
      .then(csv => {
        if (isEmpty(csv)) {
          console.log('empty response from database');
          throw 'Ticker not in database';
        }
        return fluxToJSON(csv);
      })
      .then(lastPrice => {
        console.log(lastPrice)
        const stock = {
          currentPrice: lastPrice[0]._value
        };
        res.status(200).send(stock);
      })
      .catch(err =>{
        // TO DO : how can we get better errors back from the database
        console.log('ERROR', err);
        res.status(500).send(err);
      });
  },
  getPercentChange(req, res, next) {
    // console.log('getting percent change', req.params.ticker)
    return db.query(connection, req.params.ticker, 'change')
      .then(csv => {
        if (isEmpty(csv)) {
          console.log('empty response from database');
          throw 'Ticker not in database';
        }
        return fluxToJSON(csv);
      })
      .then(last2prices => {
        const change = percentChange(last2prices);
        res.status(200).send({ percentChange: change })
      })
      .catch(err =>{
        // TO DO : how can we get better errors back from the database
        console.log('ERROR', err);
        res.status(500).send(err);
      });
  }
}