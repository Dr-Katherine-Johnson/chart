require('newrelic');
const express = require('express');
const app = express();
const config = require('../env.config.js');
const PORT = config.SERVICE_CHART_PORT;
const middleware = require('./middleware.js');
const controller = require('../controller/index.js');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/dist'));
app.use(express.static('client/public'));
// in order to test more easily we use some middleware to check
// if the ticker is given as a number or ticker
// We want to spin up a pseudo-chache of the array of tickers
// though, ideally, only do so only if we're testing, not in prod or dev
middleware.generateTickers();
app.get('/price/:ticker', middleware.convertIDtoTicker, controller.getTicker);
// you can put the middleware in the functions you will be using for testing
app.put('/price/:ticker', middleware.convertIDtoTicker,controller.updateTicker);
app.get('/current-price/:ticker', middleware.convertIDtoTicker, controller.getCurrentPrice);
app.get('/percent-change/:ticker', middleware.convertIDtoTicker, controller.getPercentChange);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));