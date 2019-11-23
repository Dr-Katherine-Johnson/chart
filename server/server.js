const express = require('express');
const app = express();
const PORT = 3000;
const db = require('../db/index.js');
const controller = require('../controller/index.js');

app.use(express.static('client/dist'));

app.get('/price/:ticker', controller.getTicker);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));