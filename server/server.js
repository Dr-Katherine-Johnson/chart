const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('client/dist'));

app.get('/price/:ticker', (req, res, next) => {
  // TODO: find that ticker in the db, and send back a JSON object of its data
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));