const express = require('express');
const app = express();
const config = require('../env.config.js');
const PORT = config.SERVICE_CHART_PORT;
const controller = require('../controller/index.js');
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/dist'));
app.use(express.static('client/public'));

app.get('/price/:ticker', controller.getTicker);
app.get('/current-price/:ticker', controller.getCurrentPrice);
app.get('/percent-change/:ticker', controller.getPercentChange);

// Create a new item
app.post('/price/:ticker', controller.addTicker);
// Add a new price, update ticker
app.put('/price/:ticker', controller.updateTicker);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));