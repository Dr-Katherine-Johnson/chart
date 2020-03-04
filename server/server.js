require('newrelic');
const express = require('express');
const app = express();
const config = require('../env.config.js');
const PORT = config.SERVICE_CHART_PORT;
const controller = require('../controller/index.js');
const cors = require('cors');

app.use(cors());
app.use(express.static('client/dist'));
app.use(express.static('client/public'));

app.get('/price/:ticker', controller.getTicker);
app.get('/current-price/:ticker', controller.getCurrentPrice);
app.get('/percent-change/:ticker', controller.getPercentChange);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));