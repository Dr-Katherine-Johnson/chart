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
// but in order to have a pseudo-chache of the array of tickers
// ideally, we'd want to only do so if we're testing, not in production or dev
middleware.generateTickers();
app.get('/price/:ticker', middleware.convertIDtoTicker, controller.getTicker);
// you can put the middleware in the functions you will be using for testing
app.put('/price/:ticker', controller.updateTicker);
app.get('/current-price/:ticker', controller.getCurrentPrice);
app.get('/percent-change/:ticker', controller.getPercentChange);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));