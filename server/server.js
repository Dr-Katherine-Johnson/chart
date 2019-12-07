const express = require('express');
const app = express();
const PORT = 3000;
const controller = require('../controller/index.js');

app.use(express.static('client/dist'));
app.use(express.static('client/public'));

app.get('/price/:ticker', controller.getTicker);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));