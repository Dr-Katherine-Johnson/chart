const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('client/dist'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));